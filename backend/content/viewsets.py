from rest_framework import generics, viewsets

from . import models, serializers


class NavigationLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.NavigationLink.objects.all()
    serializer_class = serializers.NavigationLinkSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Project.objects.prefetch_related("tech", "gallery_images").all()
    serializer_class = serializers.ProjectSerializer


class SkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.SkillCategory.objects.prefetch_related("skills").all()
    serializer_class = serializers.SkillCategorySerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Testimonial.objects.all()
    serializer_class = serializers.TestimonialSerializer


class SocialLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.SocialLink.objects.all()
    serializer_class = serializers.SocialLinkSerializer


class ResumeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Resume.objects.all()
    serializer_class = serializers.ResumeSerializer


class SiteSettingsView(generics.RetrieveAPIView):
    serializer_class = serializers.SiteSettingsSerializer

    def get_object(self):
        return models.SiteSettings.objects.first()


class AboutSectionView(generics.RetrieveAPIView):
    serializer_class = serializers.AboutSectionSerializer

    def get_object(self):
        return models.AboutSection.objects.first()


class FooterView(generics.RetrieveAPIView):
    serializer_class = serializers.FooterSerializer

    def get_object(self):
        return models.Footer.objects.first()

