"""JSON endpoints for the prototype front end.

Plain Django views rather than a framework: the surface is small and keeping the
dependency list short keeps the Vercel function well inside its size limit.
"""
import json

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError, transaction
from django.db.models import Q
from django.http import JsonResponse
from django.utils.dateparse import parse_date
from django.views.decorators.http import require_http_methods

from .models import Learner, Progress, University


def _body(request):
    try:
        payload = json.loads(request.body or b"{}")
    except ValueError:
        return None
    return payload if isinstance(payload, dict) else None


def _learner_json(learner):
    return {
        "email": learner.email,
        "firstName": learner.first_name,
        "lastName": learner.last_name,
        "grade": learner.grade,
        "dateOfBirth": learner.date_of_birth.isoformat() if learner.date_of_birth else None,
        "plan": learner.plan,
        "hasAccess": learner.has_access,
        "applicationsHub": learner.can_use_applications_hub,
    }


def _error(message, status=400):
    return JsonResponse({"error": message}, status=status)


# ------------------------------------------------------------------ auth --
@require_http_methods(["POST"])
def register(request):
    data = _body(request)
    if data is None:
        return _error("Send a JSON object.")

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    if not email or not password:
        return _error("An email address and password are required.")
    if len(password) < 8:
        return _error("Choose a password of at least 8 characters.")

    grade = str(data.get("grade") or "")
    if grade and grade not in dict(Learner.GRADES):
        return _error("Grade must be 9, 10, 11 or 12.")

    born = None
    if data.get("dateOfBirth"):
        born = parse_date(str(data["dateOfBirth"]))
        if born is None:
            return _error("Date of birth must be an ISO date, for example 2009-04-12.")

    try:
        with transaction.atomic():
            learner = Learner.objects.create_user(
                email=email,
                password=password,
                first_name=(data.get("firstName") or "").strip(),
                last_name=(data.get("lastName") or "").strip(),
                grade=grade,
                date_of_birth=born,
            )
            Progress.objects.create(learner=learner)
    except IntegrityError:
        return _error("An account already exists for that email address.", status=409)

    login(request, learner)
    return JsonResponse({"learner": _learner_json(learner)}, status=201)


@require_http_methods(["POST"])
def sign_in(request):
    data = _body(request)
    if data is None:
        return _error("Send a JSON object.")

    learner = authenticate(
        request,
        username=(data.get("email") or "").strip().lower(),
        password=data.get("password") or "",
    )
    if learner is None:
        return _error("That email address and password do not match.", status=401)

    login(request, learner)
    return JsonResponse({"learner": _learner_json(learner)})


@require_http_methods(["POST"])
def sign_out(request):
    logout(request)
    return JsonResponse({"signedOut": True})


@require_http_methods(["GET"])
def me(request):
    if not request.user.is_authenticated:
        return JsonResponse({"learner": None})
    return JsonResponse({"learner": _learner_json(request.user)})


# -------------------------------------------------------------- progress --
@require_http_methods(["GET", "PUT"])
def progress(request):
    if not request.user.is_authenticated:
        return _error("Sign in first.", status=401)

    record, _ = Progress.objects.get_or_create(learner=request.user)

    if request.method == "GET":
        return JsonResponse({"data": record.data, "updatedAt": record.updated_at.isoformat()})

    data = _body(request)
    if data is None or not isinstance(data.get("data"), dict):
        return _error("Send {\"data\": {...}}.")

    record.data = data["data"]
    record.save(update_fields=["data", "updated_at"])
    return JsonResponse({"saved": True, "updatedAt": record.updated_at.isoformat()})


# ---------------------------------------------------------- universities --
def _university_json(uni, full=False):
    summary = {
        "id": uni.slug,
        "name": uni.name,
        "abbr": uni.abbr,
        "site": uni.site,
        "location": uni.location,
        "dataYear": uni.data_year,
        "verification": uni.verification,
        "lastChecked": uni.last_checked.isoformat() if uni.last_checked else None,
    }
    if full:
        summary["payload"] = uni.payload
    return summary


@require_http_methods(["GET"])
def universities(request):
    found = University.objects.all()

    query = (request.GET.get("q") or "").strip()
    if query:
        found = found.filter(Q(name__icontains=query) | Q(abbr__icontains=query))

    verification = (request.GET.get("verification") or "").strip()
    if verification:
        found = found.filter(verification=verification)

    return JsonResponse({"results": [_university_json(u) for u in found], "count": found.count()})


@require_http_methods(["GET"])
def university_detail(request, slug):
    try:
        uni = University.objects.get(slug=slug)
    except University.DoesNotExist:
        return _error("No university with that code.", status=404)
    return JsonResponse(_university_json(uni, full=True))
