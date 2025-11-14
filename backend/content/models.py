from django.core.validators import FileExtensionValidator
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class NavigationLink(TimeStampedModel):
    label = models.CharField(max_length=80)
    target = models.CharField(
        max_length=150, help_text="Section id (without #) or full URL."
    )
    is_external = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Navigation link"
        verbose_name_plural = "Navigation links"

    def __str__(self) -> str:
        return self.label


class SiteSettings(TimeStampedModel):
    CTA_ACTION_SCROLL = "scroll"
    CTA_ACTION_URL = "url"
    CTA_ACTION_MODAL = "modal"
    CTA_ACTION_CHOICES = [
        (CTA_ACTION_SCROLL, "Scroll to section"),
        (CTA_ACTION_URL, "Open URL"),
        (CTA_ACTION_MODAL, "Open modal"),
    ]

    brand_name = models.CharField(max_length=150, default="ananthu.online")
    brand_subtitle = models.CharField(max_length=150, blank=True)

    hero_heading = models.CharField(max_length=200, default="ANANTHU S KUMAR")
    hero_highlight = models.CharField(max_length=200, blank=True)
    hero_subheading = models.CharField(max_length=200, blank=True)
    hero_description = models.TextField(blank=True)

    primary_cta_label = models.CharField(max_length=80, default="Hire Me")
    primary_cta_action = models.CharField(
        max_length=10, choices=CTA_ACTION_CHOICES, default=CTA_ACTION_MODAL
    )
    primary_cta_target = models.CharField(
        max_length=120,
        blank=True,
        help_text="Section id (without #), URL or modal key depending on action.",
    )

    secondary_cta_label = models.CharField(max_length=80, default="View Work")
    secondary_cta_action = models.CharField(
        max_length=10, choices=CTA_ACTION_CHOICES, default=CTA_ACTION_SCROLL
    )
    secondary_cta_target = models.CharField(
        max_length=120,
        blank=True,
        help_text="Section id (without #) or URL depending on action.",
    )

    whatsapp_link = models.URLField(blank=True)
    calendly_link = models.URLField(blank=True)
    contact_email = models.EmailField(blank=True)
    contact_phone = models.CharField(max_length=50, blank=True)

    class Meta:
        verbose_name = "Site settings"
        verbose_name_plural = "Site settings"

    def __str__(self) -> str:
        return "Site settings"


class AboutSection(TimeStampedModel):
    heading = models.CharField(max_length=200, default="About Me")
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    highlight_quote = models.TextField(blank=True)
    highlight_caption = models.CharField(max_length=200, blank=True)
    profile_image = models.ImageField(upload_to="about/", blank=True, null=True)

    class Meta:
        verbose_name = "About section"
        verbose_name_plural = "About section"

    def __str__(self) -> str:
        return self.heading


class AboutHighlight(TimeStampedModel):
    section = models.ForeignKey(
        AboutSection, related_name="highlights", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=150)
    description = models.CharField(max_length=255)
    icon_name = models.CharField(
        max_length=80,
        help_text="Name of the Lucide icon to render (e.g. 'code-2', 'zap').",
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "About highlight"
        verbose_name_plural = "About highlights"

    def __str__(self) -> str:
        return self.title


class SkillCategory(TimeStampedModel):
    title = models.CharField(max_length=120)
    subtitle = models.CharField(max_length=200, blank=True)
    highlight = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Skill category"
        verbose_name_plural = "Skill categories"

    def __str__(self) -> str:
        return self.title


class SkillItem(TimeStampedModel):
    category = models.ForeignKey(
        SkillCategory, related_name="skills", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, blank=True)
    logo = models.ImageField(upload_to="skills/", blank=True, null=True)
    logo_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self) -> str:
        return self.name


class Project(TimeStampedModel):
    title = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=200, blank=True)
    description = models.TextField()
    cover_image = models.ImageField(upload_to="projects/", blank=True, null=True)
    gradient_start = models.CharField(
        max_length=20, default="#ff8f2c", help_text="Starting color (hex or hsl)."
    )
    gradient_end = models.CharField(
        max_length=20, default="#ffd166", help_text="Ending color (hex or hsl)."
    )
    live_url = models.URLField(blank=True)
    code_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self) -> str:
        return self.title


class ProjectImage(TimeStampedModel):
    project = models.ForeignKey(
        Project, related_name="gallery_images", on_delete=models.CASCADE
    )
    image = models.ImageField(upload_to="projects/gallery/")
    caption = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = "Project image"
        verbose_name_plural = "Project images"

    def __str__(self) -> str:
        return self.caption or self.image.name


class ProjectTech(TimeStampedModel):
    project = models.ForeignKey(
        Project, related_name="tech", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=80)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Project technology"
        verbose_name_plural = "Project technologies"

    def __str__(self) -> str:
        return f"{self.project.title}: {self.name}"


class Testimonial(TimeStampedModel):
    author_name = models.CharField(max_length=120)
    author_role = models.CharField(max_length=120, blank=True)
    quote = models.TextField()
    avatar = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"

    def __str__(self) -> str:
        return self.author_name


class SocialLink(TimeStampedModel):
    label = models.CharField(max_length=80)
    url = models.URLField()
    icon_name = models.CharField(
        max_length=80, help_text="Name of the Lucide icon (e.g. 'github', 'linkedin')."
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]
        verbose_name = "Social link"
        verbose_name_plural = "Social links"

    def __str__(self) -> str:
        return self.label


class Footer(TimeStampedModel):
    text = models.CharField(
        max_length=255, default="© Portfolio. Crafted with passion."
    )
    tagline = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = "Footer"
        verbose_name_plural = "Footer"

    def __str__(self) -> str:
        return self.text


class Resume(TimeStampedModel):
    TYPE_PROFESSIONAL = "professional"
    TYPE_ATS = "ats"
    TYPE_CHOICES = [
        (TYPE_PROFESSIONAL, "Professional resume"),
        (TYPE_ATS, "ATS friendly resume"),
    ]

    resume_type = models.CharField(
        max_length=20, choices=TYPE_CHOICES, unique=True
    )
    file = models.FileField(
        upload_to="resumes/",
        validators=[FileExtensionValidator(allowed_extensions=["pdf"])],
    )

    class Meta:
        verbose_name = "Resume"
        verbose_name_plural = "Resumes"

    def __str__(self) -> str:
        return self.get_resume_type_display()


class ContactMessage(TimeStampedModel):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    project = models.CharField(max_length=200)
    message = models.TextField()
    ip_address = models.GenericIPAddressField()

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact message"
        verbose_name_plural = "Contact messages"

    def __str__(self) -> str:
        return f"{self.name} - {self.email}"
