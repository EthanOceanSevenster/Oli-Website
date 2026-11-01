"""Load the 24 institutions the prototype ships with into the database.

Two files feed one row each: the directory record the front end renders, and
the Applications Hub record that carries the verification status and the date
each institution was last checked against its official website.

Idempotent: matches on the institution code, so re-running updates rather than
duplicates.
"""
import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.utils.dateparse import parse_date

from core.models import University

SEED_DIR = Path(__file__).resolve().parents[2] / "seed"


class Command(BaseCommand):
    help = "Import the bundled university records into the Applications Hub directory."

    def add_arguments(self, parser):
        parser.add_argument("--dir", default=str(SEED_DIR), help="Directory holding the seed JSON.")
        parser.add_argument(
            "--keep-verification",
            action="store_true",
            help="Leave verification status untouched on rows that already exist.",
        )

    def handle(self, *args, **options):
        seed_dir = Path(options["dir"])
        directory = self._load(seed_dir / "universities.json")
        if directory is None:
            return

        hub = {r["id"]: r for r in (self._load(seed_dir / "applications_hub.json") or [])}
        created = updated = 0

        for record in directory:
            code = record["id"]
            extra = hub.get(code, {})

            defaults = {
                "name": record.get("name", ""),
                "abbr": record.get("abbr", ""),
                "site": record.get("site") or "",
                "location": record.get("location") or self._location(extra),
                "data_year": record.get("dataYear") or extra.get("intakeYear"),
                "payload": record,
            }

            exists = University.objects.filter(slug=code).exists()
            if not (exists and options["keep_verification"]):
                defaults["verification"] = self._status(extra)
                defaults["last_checked"] = parse_date(extra.get("lastVerified") or "") or None

            University.objects.update_or_create(slug=code, defaults=defaults)
            created += not exists
            updated += exists

        self.stdout.write(self.style.SUCCESS(f"{created} created, {updated} updated."))
        self.stdout.write(
            "Deadlines, fees and links in this data are not fully verified. "
            "See section 4 of the README before publishing any of it."
        )

    def _load(self, path):
        if not path.exists():
            self.stderr.write(self.style.ERROR(f"No seed file at {path}"))
            return None
        return json.loads(path.read_text(encoding="utf-8"))

    @staticmethod
    def _status(extra):
        """Hub statuses map straight onto the model's choices."""
        return {"verified": "verified", "partial": "partial"}.get(extra.get("status"), "review")

    @staticmethod
    def _location(extra):
        campuses = extra.get("campuses") or []
        return ", ".join(campuses[:3]) if campuses else ""
