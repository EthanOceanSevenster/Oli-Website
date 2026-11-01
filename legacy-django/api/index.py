"""Vercel entry point.

Vercel runs each file under api/ as a serverless function and looks for a
module-level `app`. Everything — pages, API, admin and static files — is routed
here by vercel.json, so this is the only function in the deployment.
"""
import os
import sys
from pathlib import Path

# The function runs with api/ as its directory; the project lives one level up.
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

from django.core.wsgi import get_wsgi_application  # noqa: E402

application = get_wsgi_application()


def _prepare_ephemeral_database():
    """Without DATABASE_URL we fall back to SQLite in /tmp, which starts empty.

    Build the schema once per cold start so a zero-configuration deploy still
    serves the API. This data does not survive the function going cold — set
    DATABASE_URL to a real Postgres database for anything beyond a demo.
    """
    if os.environ.get("DATABASE_URL") or not os.environ.get("VERCEL"):
        return
    try:
        from django.core.management import call_command

        call_command("migrate", run_syncdb=True, verbosity=0)
        call_command("seed_universities", verbosity=0)
    except Exception as exc:  # a broken DB must not take the whole site down
        print(f"[pathway] ephemeral database setup skipped: {exc}", file=sys.stderr)


_prepare_ephemeral_database()

app = application
