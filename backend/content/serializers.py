from rest_framework import serializers

from . import models


class NavigationLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NavigationLink
        fields = ("label", "target", "is_external", "order")


class ProjectTechSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ProjectTech
        fields = ("name", "order")


class ProjectImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = models.ProjectImage
        fields = ("image", "caption")

    def get_image(self, obj: models.ProjectImage):
        request = self.context.get("request")
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url


class ProjectSerializer(serializers.ModelSerializer):
    tech = ProjectTechSerializer(many=True, read_only=True)
    cover_image = serializers.SerializerMethodField()
    gallery = ProjectImageSerializer(
        source="gallery_images", many=True, read_only=True
    )

    class Meta:
        model = models.Project
        fields = (
            "title",
            "subtitle",
            "description",
            "cover_image",
            "gradient_start",
            "gradient_end",
            "live_url",
            "code_url",
            "order",
            "tech",
            "gallery",
        )

    def get_cover_image(self, obj: models.Project):
        if obj.cover_image:
            request = self.context.get("request")
            url = obj.cover_image.url
            return request.build_absolute_uri(url) if request else url
        return None


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Testimonial
        fields = ("author_name", "author_role", "quote", "order")


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SocialLink
        fields = ("label", "url", "icon_name", "order")


class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Footer
        fields = ("text", "tagline")


class ResumeSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    class Meta:
        model = models.Resume
        fields = ("resume_type", "file")

    def get_file(self, obj: models.Resume):
        request = self.context.get("request")
        url = obj.file.url
        return request.build_absolute_uri(url) if request else url


class SkillItemSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()

    class Meta:
        model = models.SkillItem
        fields = ("name", "description", "logo", "logo_url", "order")

    def get_logo(self, obj: models.SkillItem):
        if obj.logo:
            request = self.context.get("request")
            url = obj.logo.url
            return request.build_absolute_uri(url) if request else url
        return None


class SkillCategorySerializer(serializers.ModelSerializer):
    skills = SkillItemSerializer(many=True, read_only=True)

    class Meta:
        model = models.SkillCategory
        fields = ("title", "subtitle", "highlight", "order", "skills")


class AboutHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AboutHighlight
        fields = ("title", "description", "icon_name", "order")


class AboutSectionSerializer(serializers.ModelSerializer):
    highlights = AboutHighlightSerializer(many=True, read_only=True)
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = models.AboutSection
        fields = (
            "heading",
            "subtitle",
            "description",
            "highlight_quote",
            "highlight_caption",
            "profile_image",
            "highlights",
        )

    def get_profile_image(self, obj: models.AboutSection):
        if obj.profile_image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.profile_image.url) if request else obj.profile_image.url
        return None


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SiteSettings
        fields = (
            "brand_name",
            "brand_subtitle",
            "hero_heading",
            "hero_highlight",
            "hero_subheading",
            "hero_description",
            "primary_cta_label",
            "primary_cta_action",
            "primary_cta_target",
            "secondary_cta_label",
            "secondary_cta_action",
            "secondary_cta_target",
            "whatsapp_link",
            "calendly_link",
            "contact_email",
            "contact_phone",
        )


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ContactMessage
        fields = ("name", "email", "project", "message")

