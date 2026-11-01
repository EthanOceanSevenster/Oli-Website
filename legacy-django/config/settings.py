"""Django settings for the PATHWAY prototype."""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Vercel's filesystem is read-only apart from /tmp, and it sets VERCEL=1 at runtime.
ON_VERCEL = bool(os.environ.get("VERCEL"))


def env_bool(name, default=False):
    return os.environ.get(name, str(default)).strip().lower() in {"1", "true", "yes", "on"}


# ---------------------------------------------------------------- core ----
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY") or "dev-only-insecure-key-change-me"
DEBUG = env_bool("DJANGO_DEBUG", not ON_VERCEL)

ALLOWED_HOSTS = [h for h in os.environ.get("DJANGO_ALLOWED_HOSTS", "").split(",") if h]
ALLOWED_HOSTS += [".vercel.app", "localhost", "127.0.0.1", "[::1]"]

CSRF_TRUSTED_ORIGINS = [o for o in os.environ.get("DJANGO_CSRF_ORIGINS", "").split(",") if o]
CSRF_TRUSTED_ORIGINS += ["https://*.vercel.app"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "core",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"
WSGI_APPLICATION = "config.wsgi.application"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# ------------------------------------------------------------ database ----
# Set DATABASE_URL for anything real. Without it we fall back to SQLite, which
# on Vercel lives in /tmp and is wiped whenever the function goes cold.
DATABASE_URL = os.environ.get("DATABASE_URL")
if DATABASE_URL:
    import dj_database_url

    DATABASES = {"default": dj_database_url.parse(DATABASE_URL, conn_max_age=600, ssl_require=True)}
else:
    sqlite_path = Path("/tmp/pathway.sqlite3") if ON_VERCEL else BASE_DIR / "db.sqlite3"
    DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": str(sqlite_path)}}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
AUTH_USER_MODEL = "core.Learner"

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# ------------------------------------------------------- i18n / static ----
LANGUAGE_CODE = "en-za"
TIME_ZONE = "Africa/Johannesburg"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

# Serve straight from STATICFILES_DIRS so a Vercel deploy needs no collectstatic
# build step. Run collectstatic and drop this if you move static to a CDN.
WHITENOISE_USE_FINDERS = True
WHITENOISE_AUTOREFRESH = DEBUG

STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage"},
}

# -------------------------------------------------------------- https ----
SESSION_COOKIE_SAMESITE = "Lax"
if not DEBUG:
    # Vercel terminates TLS ahead of the function and forwards the scheme here.
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 60 * 60 * 24 * 365
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
