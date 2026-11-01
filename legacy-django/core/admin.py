from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Learner, Progress, University


@admin.register(Learner)
class LearnerAdmin(UserAdmin):
    list_display = ("email", "first_name", "grade", "plan", "is_staff")
    list_filter = ("grade", "plan", "is_staff", "is_active")
    search_fields = ("email", "first_name", "last_name")
    ordering = ("email",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Learner", {"fields": ("first_name", "last_name", "grade", "date_of_birth")}),
        ("Subscription", {"fields": ("plan", "plan_expires")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Dates", {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (None, {"classes": ("wide",), "fields": ("email", "grade", "password1", "password2")}),
    )


@admin.register(Progress)
class ProgressAdmin(admin.ModelAdmin):
    list_display = ("learner", "updated_at")
    search_fields = ("learner__email",)
    readonly_fields = ("updated_at",)


@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ("name", "abbr", "verification", "data_year", "last_checked")
    list_filter = ("verification", "data_year")
    search_fields = ("name", "abbr", "slug")
    # Verification is the open pre-launch work: edit it straight from the list.
    list_editable = ("verification",)
