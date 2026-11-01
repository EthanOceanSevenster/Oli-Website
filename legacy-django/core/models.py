"""Data model behind the PATHWAY prototype.

The prototype keeps everything in one localStorage blob. These models give that
blob a home on the server: a learner account, the progress blob itself, and the
university records the Applications Hub reads.
"""
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone


class LearnerManager(BaseUserManager):
    """Learners sign in with an email address, so there is no username."""

    use_in_migrations = True

    def _create(self, email, password, **extra):
        if not email:
            raise ValueError("Learners must have an email address.")
        learner = self.model(email=self.normalize_email(email), **extra)
        learner.set_password(password)
        learner.save(using=self._db)
        return learner

    def create_user(self, email, password=None, **extra):
        extra.setdefault("is_staff", False)
        extra.setdefault("is_superuser", False)
        return self._create(email, password, **extra)

    def create_superuser(self, email, password=None, **extra):
        extra.setdefault("is_staff", True)
        extra.setdefault("is_superuser", True)
        if not extra["is_staff"] or not extra["is_superuser"]:
            raise ValueError("A superuser needs is_staff and is_superuser set.")
        return self._create(email, password, **extra)


class Learner(AbstractUser):
    GRADES = [(str(g), f"Grade {g}") for g in (9, 10, 11, 12)]
    PLANS = [("none", "No plan"), ("monthly", "Monthly"), ("annual", "Annual")]

    username = None
    email = models.EmailField("email address", unique=True)
    grade = models.CharField(max_length=2, choices=GRADES, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    plan = models.CharField(max_length=16, choices=PLANS, default="none")
    plan_expires = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = LearnerManager()

    class Meta:
        verbose_name = "learner"
        verbose_name_plural = "learners"

    def __str__(self):
        return self.email

    @property
    def has_access(self):
        """Paid access. Checkout is simulated in the prototype — see the README."""
        if self.plan == "none":
            return False
        return self.plan_expires is None or self.plan_expires > timezone.now()

    @property
    def is_fet(self):
        """Grades 10-12 see the FET phase content."""
        return self.grade in {"10", "11", "12"}

    @property
    def can_use_applications_hub(self):
        """The Applications Hub is Grades 11-12 only."""
        return self.grade in {"11", "12"}


class Progress(models.Model):
    """The learner's prototype state blob, kept verbatim.

    The front end still owns the shape of this data. Storing it opaquely means
    the server survives prototype changes; pull fields out into real columns as
    each part of the journey settles.
    """

    learner = models.OneToOneField(Learner, on_delete=models.CASCADE, related_name="progress")
    data = models.JSONField(default=dict, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "progress"

    def __str__(self):
        return f"Progress for {self.learner.email}"


class University(models.Model):
    """One institution in the Applications Hub directory.

    Scalars are columns so they can be filtered and searched; the rest of the
    imported record stays in `payload`, which is what the front end reads.
    """

    VERIFICATION = [
        ("verified", "Verified"),
        ("partial", "Partially verified"),
        ("review", "Needs review"),
    ]

    slug = models.SlugField(max_length=32, unique=True)
    name = models.CharField(max_length=200)
    abbr = models.CharField(max_length=16, db_index=True)
    site = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=200, blank=True)
    data_year = models.PositiveIntegerField(null=True, blank=True)
    verification = models.CharField(max_length=16, choices=VERIFICATION, default="review")
    last_checked = models.DateField(null=True, blank=True)
    payload = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "universities"

    def __str__(self):
        return f"{self.name} ({self.abbr})"
