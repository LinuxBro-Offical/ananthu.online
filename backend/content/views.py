from rest_framework.response import Response
from rest_framework.views import APIView

from . import models, serializers


class PortfolioContentAPIView(APIView):
    """
    Aggregate endpoint returning all portfolio content needed by the frontend.
    """

    def get(self, request):
        site_settings = models.SiteSettings.objects.first()
        about_section = models.AboutSection.objects.first()
        footer = models.Footer.objects.first()

        data = {
            "site": serializers.SiteSettingsSerializer(
                site_settings, context={"request": request}
            ).data
            if site_settings
            else None,
            "navigation": serializers.NavigationLinkSerializer(
                models.NavigationLink.objects.all(), many=True
            ).data,
            "about": serializers.AboutSectionSerializer(
                about_section, context={"request": request}
            ).data
            if about_section
            else None,
            "skills": serializers.SkillCategorySerializer(
                models.SkillCategory.objects.prefetch_related("skills").all(),
                many=True,
                context={"request": request},
            ).data,
            "projects": serializers.ProjectSerializer(
                models.Project.objects.prefetch_related("tech", "gallery_images").all(),
                many=True,
                context={"request": request},
            ).data,
            "testimonials": serializers.TestimonialSerializer(
                models.Testimonial.objects.all(), many=True
            ).data,
            "social_links": serializers.SocialLinkSerializer(
                models.SocialLink.objects.all(), many=True
            ).data,
            "footer": serializers.FooterSerializer(footer).data if footer else None,
            "resumes": serializers.ResumeSerializer(
                models.Resume.objects.all(), many=True, context={"request": request}
            ).data,
        }
        return Response(data)
