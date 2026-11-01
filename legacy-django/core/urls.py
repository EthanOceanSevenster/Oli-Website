from django.urls import path

from . import api, views

urlpatterns = [
    path("", views.app, name="app"),
    path("healthz", views.health, name="health"),
    path("api/auth/register", api.register, name="api-register"),
    path("api/auth/login", api.sign_in, name="api-login"),
    path("api/auth/logout", api.sign_out, name="api-logout"),
    path("api/auth/me", api.me, name="api-me"),
    path("api/progress", api.progress, name="api-progress"),
    path("api/universities", api.universities, name="api-universities"),
    path("api/universities/<slug:slug>", api.university_detail, name="api-university"),
]
