"""Tests for the pieces the prototype depends on."""
from django.test import TestCase
from django.urls import reverse

from .models import Learner, Progress, University


class PageTests(TestCase):
    def test_landing_page_renders_with_asset_urls(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        body = response.content.decode()
        self.assertIn('id="pathway-assets"', body)
        self.assertIn("/static/core/img/scene.webp", body)
        self.assertIn("/static/core/js/app.js", body)

    def test_signed_out_page_carries_no_bootstrap_state(self):
        body = self.client.get("/").content.decode()
        self.assertIn('<script id="pathway-bootstrap" type="application/json">null</script>', body)

    def test_health_check(self):
        self.assertEqual(self.client.get("/healthz").json(), {"status": "ok"})


class RegistrationTests(TestCase):
    url = "/api/auth/register"

    def post(self, **payload):
        return self.client.post(self.url, payload, content_type="application/json")

    def test_registration_creates_learner_and_progress(self):
        response = self.post(
            email="Thandi@Example.com", password="PathwayTest2026", firstName="Thandi", grade="11"
        )
        self.assertEqual(response.status_code, 201)
        self.assertTrue(response.json()["learner"]["applicationsHub"])

        learner = Learner.objects.get()
        self.assertEqual(learner.email, "thandi@example.com")  # normalised
        self.assertTrue(Progress.objects.filter(learner=learner).exists())

    def test_duplicate_email_is_rejected(self):
        self.post(email="a@example.com", password="PathwayTest2026")
        self.assertEqual(self.post(email="a@example.com", password="PathwayTest2026").status_code, 409)

    def test_short_password_is_rejected(self):
        self.assertEqual(self.post(email="a@example.com", password="short").status_code, 400)

    def test_unknown_grade_is_rejected(self):
        self.assertEqual(
            self.post(email="a@example.com", password="PathwayTest2026", grade="8").status_code, 400
        )

    def test_unparseable_date_of_birth_is_rejected(self):
        response = self.post(
            email="a@example.com", password="PathwayTest2026", dateOfBirth="12 April"
        )
        self.assertEqual(response.status_code, 400)
        self.assertFalse(Learner.objects.exists())

    def test_date_of_birth_is_returned_as_an_iso_date(self):
        response = self.post(
            email="a@example.com", password="PathwayTest2026", dateOfBirth="2009-04-12"
        )
        self.assertEqual(response.json()["learner"]["dateOfBirth"], "2009-04-12")


class ProgressTests(TestCase):
    def setUp(self):
        self.learner = Learner.objects.create_user(
            email="sipho@example.com", password="PathwayTest2026", grade="12"
        )

    def test_progress_requires_a_signed_in_learner(self):
        self.assertEqual(self.client.get("/api/progress").status_code, 401)

    def test_blob_survives_a_round_trip(self):
        self.client.force_login(self.learner)
        blob = {"users": {"sipho@example.com": {"progress": {"a1": {"done": True}}}}}

        saved = self.client.put(
            "/api/progress", {"data": blob}, content_type="application/json"
        )
        self.assertEqual(saved.status_code, 200)
        self.assertEqual(self.client.get("/api/progress").json()["data"], blob)

    def test_malformed_payload_is_rejected(self):
        self.client.force_login(self.learner)
        response = self.client.put("/api/progress", {"data": "nope"}, content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_signed_in_page_carries_the_saved_blob(self):
        Progress.objects.create(learner=self.learner, data={"theme": "dark"})
        self.client.force_login(self.learner)
        body = self.client.get("/").content.decode()
        self.assertIn('id="pathway-bootstrap"', body)
        self.assertIn("sipho@example.com", body)


class UniversityTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        University.objects.create(
            slug="uj", name="University of Johannesburg", abbr="UJ", verification="partial"
        )
        University.objects.create(
            slug="su", name="Stellenbosch University", abbr="SU", verification="review"
        )

    def test_directory_lists_everything(self):
        self.assertEqual(self.client.get("/api/universities").json()["count"], 2)

    def test_search_matches_name_or_acronym(self):
        by_name = self.client.get("/api/universities?q=stellen").json()
        self.assertEqual([u["abbr"] for u in by_name["results"]], ["SU"])

        by_acronym = self.client.get("/api/universities?q=UJ").json()
        self.assertEqual([u["abbr"] for u in by_acronym["results"]], ["UJ"])

    def test_filter_by_verification(self):
        found = self.client.get("/api/universities?verification=partial").json()
        self.assertEqual([u["abbr"] for u in found["results"]], ["UJ"])

    def test_detail_includes_the_full_record(self):
        detail = self.client.get("/api/universities/uj").json()
        self.assertEqual(detail["name"], "University of Johannesburg")
        self.assertIn("payload", detail)

    def test_unknown_code_is_a_404(self):
        self.assertEqual(self.client.get("/api/universities/nope").status_code, 404)


class LearnerModelTests(TestCase):
    def test_applications_hub_is_grades_11_and_12_only(self):
        for grade, allowed in (("9", False), ("10", False), ("11", True), ("12", True)):
            learner = Learner(email=f"g{grade}@example.com", grade=grade)
            self.assertEqual(learner.can_use_applications_hub, allowed, f"grade {grade}")

    def test_access_follows_the_plan(self):
        self.assertFalse(Learner(email="a@example.com", plan="none").has_access)
        self.assertTrue(Learner(email="b@example.com", plan="annual").has_access)

    def test_superuser_needs_an_email(self):
        with self.assertRaises(ValueError):
            Learner.objects.create_superuser(email="", password="x")
