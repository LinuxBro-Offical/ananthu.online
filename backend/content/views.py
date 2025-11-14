from datetime import timedelta

from django.utils import timezone
from rest_framework import status
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


class ContactMessageAPIView(APIView):
    rate_limit_per_ip = 3
    rate_limit_window = timedelta(hours=24)

    def post(self, request):
        client_ip = self._get_client_ip(request)
        if not client_ip:
            return Response(
                {"detail": "Unable to determine client IP."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        window_start = timezone.now() - self.rate_limit_window
        recent_count = models.ContactMessage.objects.filter(
            ip_address=client_ip, created_at__gte=window_start
        ).count()

        if recent_count >= self.rate_limit_per_ip:
            return Response(
                {
                    "detail": "Too many submissions from this IP. Please try again later."
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS,
            )

        serializer = serializers.ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        models.ContactMessage.objects.create(
            ip_address=client_ip, **serializer.validated_data
        )

        return Response(
            {"detail": "Message received. I’ll be in touch soon."},
            status=status.HTTP_201_CREATED,
        )

    @staticmethod
    def _get_client_ip(request):
        header = request.META.get("HTTP_X_FORWARDED_FOR")
        if header:
            return header.split(",")[0].strip()
        return request.META.get("REMOTE_ADDR")
