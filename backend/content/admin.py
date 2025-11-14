from django.contrib import admin

from . import models


class TimestampedAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "updated_at")
    ordering = ("id",)


@admin.register(models.NavigationLink)
class NavigationLinkAdmin(TimestampedAdmin):
    list_display = ("label", "target", "is_external", "order")
    list_editable = ("order",)
    list_filter = ("is_external",)
    search_fields = ("label", "target")


class AboutHighlightInline(admin.TabularInline):
    model = models.AboutHighlight
    extra = 0
    fields = ("title", "description", "icon_name", "order")
    ordering = ("order",)


@admin.register(models.AboutSection)
class AboutSectionAdmin(TimestampedAdmin):
    list_display = ("heading", "subtitle")
    inlines = [AboutHighlightInline]


class SkillItemInline(admin.TabularInline):
    model = models.SkillItem
    extra = 0
    fields = ("name", "description", "logo", "logo_url", "order")
    ordering = ("order",)


@admin.register(models.SkillCategory)
class SkillCategoryAdmin(TimestampedAdmin):
    list_display = ("title", "subtitle", "order")
    list_editable = ("order",)
    inlines = [SkillItemInline]


class ProjectTechInline(admin.TabularInline):
    model = models.ProjectTech
    extra = 0
    fields = ("name", "order")
    ordering = ("order",)


class ProjectImageInline(admin.StackedInline):
    model = models.ProjectImage
    extra = 0
    fields = ("image", "caption")
    ordering = ("id",)


@admin.register(models.Project)
class ProjectAdmin(TimestampedAdmin):
    list_display = ("title", "subtitle", "order")
    list_editable = ("order",)
    inlines = [ProjectTechInline, ProjectImageInline]
    search_fields = ("title", "subtitle", "description")


@admin.register(models.Testimonial)
class TestimonialAdmin(TimestampedAdmin):
    list_display = ("author_name", "author_role", "order")
    list_editable = ("order",)
    search_fields = ("author_name", "quote")


@admin.register(models.SocialLink)
class SocialLinkAdmin(TimestampedAdmin):
    list_display = ("label", "url", "icon_name", "order")
    list_editable = ("order",)
    search_fields = ("label", "url")


@admin.register(models.Footer)
class FooterAdmin(TimestampedAdmin):
    list_display = ("text", "tagline")


@admin.register(models.Resume)
class ResumeAdmin(TimestampedAdmin):
    list_display = ("resume_type", "file")


@admin.register(models.ContactMessage)
class ContactMessageAdmin(TimestampedAdmin):
    list_display = ("name", "email", "ip_address", "created_at")
    search_fields = ("name", "email", "project", "message", "ip_address")
    readonly_fields = ("name", "email", "project", "message", "ip_address", "created_at", "updated_at")
    list_filter = ("created_at",)


@admin.register(models.SiteSettings)
class SiteSettingsAdmin(TimestampedAdmin):
    fieldsets = (
        (
            "Brand",
            {
                "fields": (
                    "brand_name",
                    "brand_subtitle",
                )
            },
        ),
        (
            "Hero",
            {
                "fields": (
                    "hero_heading",
                    "hero_highlight",
                    "hero_subheading",
                    "hero_description",
                )
            },
        ),
        (
            "Primary CTA",
            {
                "fields": (
                    "primary_cta_label",
                    "primary_cta_action",
                    "primary_cta_target",
                )
            },
        ),
        (
            "Secondary CTA",
            {
                "fields": (
                    "secondary_cta_label",
                    "secondary_cta_action",
                    "secondary_cta_target",
                )
            },
        ),
        (
            "Contact Channels",
            {
                "fields": (
                    "whatsapp_link",
                    "calendly_link",
                    "contact_email",
                    "contact_phone",
                )
            },
        ),
    )

    def has_add_permission(self, request):
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)
