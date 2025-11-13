from django.urls import path
from rest_framework.routers import DefaultRouter

from . import viewsets

router = DefaultRouter()
router.register("navigation", viewsets.NavigationLinkViewSet, basename="navigation")
router.register("projects", viewsets.ProjectViewSet, basename="projects")
router.register("skills", viewsets.SkillCategoryViewSet, basename="skills")
router.register("testimonials", viewsets.TestimonialViewSet, basename="testimonials")
router.register("social", viewsets.SocialLinkViewSet, basename="social")
router.register("resumes", viewsets.ResumeViewSet, basename="resumes")

urlpatterns = [
    path("site-settings/", viewsets.SiteSettingsView.as_view(), name="site-settings"),
    path("about/", viewsets.AboutSectionView.as_view(), name="about"),
    path("footer/", viewsets.FooterView.as_view(), name="footer"),
] + router.urls

