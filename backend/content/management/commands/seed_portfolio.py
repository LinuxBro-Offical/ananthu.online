from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.db import transaction
from urllib.request import urlopen
from django.utils.text import slugify

from content import models


SITE_SETTINGS_DATA = {
    "brand_name": "ananthu.online",
    "brand_subtitle": "Ananthu S Kumar",
    "hero_heading": "ANANTHU S KUMAR",
    "hero_highlight": "SOFTWARE ENGINEER · FULL STACK INNOVATOR",
    "hero_subheading": "Software Engineer & Full Stack Developer",
    "hero_description": "Crafting intelligent, scalable, and beautiful web solutions",
    "primary_cta_label": "Hire Me",
    "primary_cta_action": models.SiteSettings.CTA_ACTION_MODAL,
    "primary_cta_target": "contact",
    "secondary_cta_label": "View Work",
    "secondary_cta_action": models.SiteSettings.CTA_ACTION_SCROLL,
    "secondary_cta_target": "projects",
    "whatsapp_link": "https://wa.me/919876543210",
    "calendly_link": "https://calendly.com/ananthusuresh/30min",
    "contact_email": "hello@ananthu.online",
    "contact_phone": "+91 98765 43210",
}

NAVIGATION_LINKS = [
    {"label": "About", "target": "about", "is_external": False, "order": 0},
    {"label": "Skills", "target": "skills", "is_external": False, "order": 1},
    {"label": "Projects", "target": "projects", "is_external": False, "order": 2},
    {"label": "Testimonials", "target": "testimonials", "is_external": False, "order": 3},
    {"label": "Contact", "target": "contact", "is_external": False, "order": 4},
]

ABOUT_SECTION = {
    "heading": "A technologist blending artful expression with scalable engineering craft.",
    "subtitle": "From cinematic launch weekends to enterprisewide rollouts, I build systems that feel alive.",
    "description": (
        "I’m a passionate software engineer crafting scalable and visually stunning web solutions using "
        "Django, Python, and modern front-end frameworks. Great products are born where bold ideas meet precise systems — "
        "I reside in that intersection."
    ),
    "highlight_quote": "“Code is my language. Storytelling is my medium. I build digital worlds that feel alive.”",
    "highlight_caption": "Humanized product strategy grounded in data.\nPerformance-obsessed code with automated resilience.\nCross-disciplinary collaboration across design and engineering.",
    "profile_image_url": "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=1600&q=80",
}

ABOUT_HIGHLIGHTS = [
    {
        "title": "Full-stack Architecture",
        "description": "Elegant domain models, robust APIs, and resilient cloud-native systems.",
        "icon_name": "Code2",
        "order": 0,
    },
    {
        "title": "Immersive Interfaces",
        "description": "Cinematic UI, 3D worlds, motion-led storytelling, and user empathy.",
        "icon_name": "Zap",
        "order": 1,
    },
    {
        "title": "Data + Strategy",
        "description": "Translating analytics into product moves that delight and convert.",
        "icon_name": "BarChart3",
        "order": 2,
    },
    {
        "title": "Team Leadership",
        "description": "Aligning cross-functional teams around bold ideas and predictable delivery.",
        "icon_name": "Users",
        "order": 3,
    },
]

SKILL_CATEGORIES = [
    {
        "title": "Frontend & Interfaces",
        "subtitle": "Designing human moments with high-polish UI engineering.",
        "highlight": "Immersive UI • Motion Systems • Design Systems",
        "order": 0,
        "skills": [
            {
                "name": "React",
                "description": "SPA & SSR with hooks, suspense, and concurrent infra.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            },
            {
                "name": "Next.js",
                "description": "Edge rendering, streaming UI, and content orchestration.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
            },
            {
                "name": "Angular",
                "description": "Enterprise dashboards with RxJS and state isolation.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
            },
            {
                "name": "Tailwind CSS",
                "description": "Rapid prototyping with design tokens & dark modes.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
            },
            {
                "name": "Framer Motion",
                "description": "Micro-interactions & cinematic motion choreography.",
                "logo_url": "https://raw.githubusercontent.com/AnanthuSuresh/asset-cdn/main/logos/framer.svg",
            },
            {
                "name": "Three.js",
                "description": "3D scenes, shaders, post-processing & WebGL blending.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
            },
        ],
    },
    {
        "title": "Backends & Intelligence",
        "subtitle": "Architecting resilient, data-driven services with automation.",
        "highlight": "API Design • Data Pipelines • AI Integrations",
        "order": 1,
        "skills": [
            {
                "name": "Node.js",
                "description": "Event-driven microservices & real-time transport.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            },
            {
                "name": "Django",
                "description": "REST/GraphQL APIs with clean architecture & DRF.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
            },
            {
                "name": "FastAPI",
                "description": "High-performance async pipelines with type safety.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
            },
            {
                "name": "PostgreSQL",
                "description": "Complex queries, CTEs, and performance tuning.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
            },
            {
                "name": "Redis",
                "description": "Caching, streams, and pub/sub acceleration.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
            },
            {
                "name": "GraphQL",
                "description": "Schema design, federation, and persisted queries.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
            },
        ],
    },
    {
        "title": "Cloud & Delivery",
        "subtitle": "Ensuring reliability, security, and speed from commit to prod.",
        "highlight": "DevOps • Observability • Continuous Delivery",
        "order": 2,
        "skills": [
            {
                "name": "AWS",
                "description": "Serverless, container orchestration, and IAM policy craft.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain.svg",
            },
            {
                "name": "Docker",
                "description": "Container packaging, multi-stage builds, shared kernels.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
            },
            {
                "name": "Kubernetes",
                "description": "Scaling workloads with operators & GitOps pipelines.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
            },
            {
                "name": "Terraform",
                "description": "IaC blueprints with modules, workspaces & drift detection.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
            },
            {
                "name": "GitHub Actions",
                "description": "Zero-downtime CI/CD with quality gates & matrices.",
                "logo_url": "https://raw.githubusercontent.com/AnanthuSuresh/asset-cdn/main/logos/github-actions.svg",
            },
            {
                "name": "Linux",
                "description": "System tuning, shell automation, and hardened infra.",
                "logo_url": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
            },
        ],
    },
]

PROJECTS = [
    {
        "title": "Aurora Commerce",
        "subtitle": "Generative visuals + personalized journeys",
        "description": (
            "A cinematic e-commerce universe orchestrating AI-driven merchandising, adaptive 3D product visualization, "
            "and streaming microfrontends."
        ),
        "gradient_start": "#ff823c",
        "gradient_end": "#ffd977",
        "order": 0,
        "tech": ["React", "Vite", "NestJS", "Stripe", "Three.js"],
    },
    {
        "title": "Neural Ops Studio",
        "subtitle": "Realtime orchestration for DevOps squads",
        "description": (
            "Observability cockpit translating distributed infrastructure telemetry into live holographic surfaces, "
            "with collaborative spatial annotations."
        ),
        "gradient_start": "#ffbe62",
        "gradient_end": "#ff8a3d",
        "order": 1,
        "tech": ["Django", "GraphQL", "PostgreSQL", "WebGL", "GSAP"],
    },
    {
        "title": "Pulsewave Analytics",
        "subtitle": "Precision insights, compassionate delivery",
        "description": (
            "Health-tech platform leveraging predictive AI to transform patient journeys into immersive data tapestries "
            "and actionable care roadmaps."
        ),
        "gradient_start": "#ffd977",
        "gradient_end": "#ff8a3d",
        "order": 2,
        "tech": ["Next.js", "Python", "TensorFlow", "Supabase", "Framer Motion"],
    },
    {
        "title": "Synthwave Play",
        "subtitle": "Creative coding for human expression",
        "description": (
            "A 3D generative art playground merging music, motion, and social remixing — powered by WebAudio, "
            "node-based shaders, and edge rendering."
        ),
        "gradient_start": "#ff9f45",
        "gradient_end": "#ffd977",
        "order": 3,
        "tech": ["React", "Rust", "WebAssembly", "Three.js", "PlanetScale"],
    },
]

PROJECT_GALLERIES = {
    "Aurora Commerce": [
        {
            "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
            "caption": "Immersive product discovery surface",
        },
        {
            "url": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
            "caption": "Realtime merchandising analytics",
        },
    ],
    "Neural Ops Studio": [
        {
            "url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
            "caption": "DevOps control center dashboard",
        },
        {
            "url": "https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=1600&q=80",
            "caption": "Spatial observability overlays",
        },
    ],
    "Pulsewave Analytics": [
        {
            "url": "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
            "caption": "Predictive health insights UI",
        },
        {
            "url": "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
            "caption": "Patient journey timeline",
        },
    ],
    "Synthwave Play": [
        {
            "url": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
            "caption": "Generative audio playground",
        },
        {
            "url": "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1600&q=80",
            "caption": "Shader-based visual remixer",
        },
    ],
}

TESTIMONIALS = [
    {
        "author_name": "Techversant Manager",
        "author_role": "Product Leadership",
        "quote": "A visionary engineer who delivers beyond expectations.",
        "order": 0,
    },
    {
        "author_name": "Aurex Product Lead",
        "author_role": "Platform Strategy",
        "quote": "Turns complex ideas into smooth, scalable systems.",
        "order": 1,
    },
    {
        "author_name": "Freelance Client",
        "author_role": "Creative Partner",
        "quote": "Creative, reliable, and detail-oriented. Highly recommend!",
        "order": 2,
    },
]

SOCIAL_LINKS = [
    {"label": "Email", "url": "mailto:hello@ananthu.online", "icon_name": "Mail", "order": 0},
    {"label": "LinkedIn", "url": "https://www.linkedin.com", "icon_name": "Linkedin", "order": 1},
    {"label": "GitHub", "url": "https://github.com", "icon_name": "Github", "order": 2},
    {"label": "Upwork", "url": "https://www.upwork.com", "icon_name": "Briefcase", "order": 3},
]

FOOTER = {
    "text": "© 2025 Portfolio. Crafted with passion and curiosity.",
    "tagline": "Craft. Flow. Impact.",
}

RESUME_PLACEHOLDERS = [
    {
        "resume_type": models.Resume.TYPE_PROFESSIONAL,
        "filename": "professional-resume.pdf",
        "content": b"Professional resume placeholder",
    },
    {
        "resume_type": models.Resume.TYPE_ATS,
        "filename": "ats-resume.pdf",
        "content": b"ATS resume placeholder",
    },
]


class Command(BaseCommand):
    help = "Seed the portfolio backend with initial content."

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete existing portfolio content before seeding",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        if options.get("reset"):
            self.stdout.write("Resetting portfolio content…")
            models.NavigationLink.objects.all().delete()
            models.AboutHighlight.objects.all().delete()
            models.AboutSection.objects.all().delete()
            models.SkillItem.objects.all().delete()
            models.SkillCategory.objects.all().delete()
            models.ProjectTech.objects.all().delete()
            models.ProjectImage.objects.all().delete()
            models.Project.objects.all().delete()
            models.Testimonial.objects.all().delete()
            models.SocialLink.objects.all().delete()
            models.Resume.objects.all().delete()
            models.Footer.objects.all().delete()
            models.SiteSettings.objects.all().delete()

        site_settings, _ = models.SiteSettings.objects.get_or_create(defaults=SITE_SETTINGS_DATA)
        for field, value in SITE_SETTINGS_DATA.items():
            setattr(site_settings, field, value)
        site_settings.save()

        for link in NAVIGATION_LINKS:
            models.NavigationLink.objects.update_or_create(
                label=link["label"], defaults=link
            )

        about_section, _ = models.AboutSection.objects.get_or_create()
        for field, value in ABOUT_SECTION.items():
            if field == "profile_image_url":
                continue
            setattr(about_section, field, value)
        about_section.save()
        profile_image_url = ABOUT_SECTION.get("profile_image_url")
        if profile_image_url and (options.get("reset") or not about_section.profile_image):
            try:
                with urlopen(profile_image_url) as response:
                    about_section.profile_image.save(
                        "profile.jpg",
                        ContentFile(response.read()),
                        save=True,
                    )
            except Exception as exc:  # pragma: no cover - best effort
                self.stdout.write(
                    self.style.WARNING(
                        f"Unable to download profile image ({profile_image_url}): {exc}"
                    )
                )

        models.AboutHighlight.objects.filter(section=about_section).delete()
        for highlight in ABOUT_HIGHLIGHTS:
            models.AboutHighlight.objects.create(section=about_section, **highlight)

        models.SkillCategory.objects.all().delete()
        for category_data in SKILL_CATEGORIES:
            skills = category_data.pop("skills")
            category = models.SkillCategory.objects.create(**category_data)
            for order, skill in enumerate(skills):
                models.SkillItem.objects.create(category=category, order=order, **skill)

        models.Project.objects.all().delete()
        for project_data in PROJECTS:
            tech = project_data.pop("tech")
            project = models.Project.objects.create(**project_data)
            for order, name in enumerate(tech):
                models.ProjectTech.objects.create(project=project, name=name, order=order)
            for idx, asset in enumerate(PROJECT_GALLERIES.get(project.title, []), start=1):
                try:
                    with urlopen(asset["url"]) as response:
                        image = models.ProjectImage(project=project, caption=asset.get("caption", ""))
                        image.image.save(
                            f"{slugify(project.title)}-{idx}.jpg",
                            ContentFile(response.read()),
                            save=True,
                        )
                except Exception as exc:  # pragma: no cover - best effort
                    self.stdout.write(
                        self.style.WARNING(
                            f"Unable to download project gallery image for {project.title}: {exc}"
                        )
                    )

        models.Testimonial.objects.all().delete()
        for testimonial in TESTIMONIALS:
            models.Testimonial.objects.create(**testimonial)

        models.SocialLink.objects.all().delete()
        for link in SOCIAL_LINKS:
            models.SocialLink.objects.create(**link)

        for resume_data in RESUME_PLACEHOLDERS:
            if models.Resume.objects.filter(resume_type=resume_data["resume_type"]).exists():
                continue
            resume = models.Resume(resume_type=resume_data["resume_type"])
            resume.file.save(
                resume_data["filename"],
                ContentFile(resume_data["content"]),
                save=True,
            )

        models.Footer.objects.update_or_create(defaults=FOOTER)

        self.stdout.write(self.style.SUCCESS("Portfolio content seeded successfully."))
