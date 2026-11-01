"""The page itself.

PATHWAY routes on the hash (``#/home``, ``#/apply`` ...), so one Django view
serves every screen. Its job is to hand the front end its asset URLs and, when
someone is signed in, the state the server already holds for them.
"""
from django.http import JsonResponse
from django.shortcuts import render
from django.templatetags.static import static
from django.views.decorators.http import require_GET

from .models import Progress

ASSETS = {
    "MARK": "core/img/mark.webp",
    "WORD": "core/img/word.webp",
    "SCENE": "core/img/scene.webp",
    "SCENE_LIGHT": "core/img/scene_light.webp",
}


@require_GET
def app(request):
    bootstrap = None
    if request.user.is_authenticated:
        record = Progress.objects.filter(learner=request.user).first()
        if record is not None:
            bootstrap = {
                "email": request.user.email,
                "data": record.data,
                "updatedAt": record.updated_at.isoformat(),
            }

    return render(
        request,
        "core/app.html",
        {
            "assets": {name: static(path) for name, path in ASSETS.items()},
            "bootstrap": bootstrap,
        },
    )


@require_GET
def health(request):
    """Cheap liveness check that does not touch the database."""
    return JsonResponse({"status": "ok"})
