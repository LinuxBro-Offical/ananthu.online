import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageCircle, Calendar, SendHorizonal } from "lucide-react";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import { postContactMessage } from "@/lib/api";

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#fb641b"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  );
}

function FloatingOrbs() {
  return (
    <group>
      <Sphere position={[-3, 2, -2]} args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere position={[3, -1, -1]} args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#fb641b" emissive="#fb641b" emissiveIntensity={0.7} />
      </Sphere>
      <Sphere position={[0, 3, -3]} args={[0.4, 32, 32]}>
        <meshStandardMaterial color="#fdba74" emissive="#fdba74" emissiveIntensity={0.6} />
      </Sphere>
    </group>
  );
}

export const Hero = () => {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
  const { data } = usePortfolioContent();
  const site = data?.site;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );
  }, []);

  useEffect(() => {
    if (isMobile) {
      setShouldRenderCanvas(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setShouldRenderCanvas(false);
      return;
    }

    const timer = window.setTimeout(() => setShouldRenderCanvas(true), 450);
    return () => window.clearTimeout(timer);
  }, [isMobile]);

  const primaryLabel = site?.primary_cta_label || "Hire Me";
  const secondaryLabel = site?.secondary_cta_label || "View Work";
  const highlight = site?.hero_highlight;
  const heroHeading = (site?.hero_heading || "ANANTHU S KUMAR").toUpperCase();
  const heroSubheading =
    site?.hero_subheading || "Software Engineer & Full Stack Developer";
  const heroDescription =
    site?.hero_description ||
    "Crafting intelligent, scalable, and beautiful web solutions";

  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaAction = (
    action: string | undefined,
    target: string | undefined,
    fallbackModal?: () => void,
    fallbackScrollTarget?: string
  ) => {
    const normalizedAction = action || "modal";
    switch (normalizedAction) {
      case "scroll":
        if (target) {
          handleScrollToSection(target);
        } else if (fallbackScrollTarget) {
          handleScrollToSection(fallbackScrollTarget);
        }
        break;
      case "url":
        if (target) {
          window.open(target, "_blank", "noopener,noreferrer");
        }
        break;
      case "modal":
      default:
        fallbackModal?.();
        break;
    }
  };

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSendingMessage) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      project: String(formData.get("project") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.project || !payload.message) {
      toast.error("Please complete all fields before sending.");
      return;
    }

    try {
      setIsSendingMessage(true);
      await postContactMessage(payload);
      toast.success("Thanks! I’ll get back to you shortly.");
      form.reset();
      setIsHireModalOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send message right now.";
      toast.error(message);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const whatsappLink = useMemo(() => {
    const rawValue = site?.whatsapp_link?.trim() || site?.contact_phone?.trim();
    if (!rawValue) {
      return undefined;
    }

    if (rawValue.startsWith("http://") || rawValue.startsWith("https://")) {
      return rawValue;
    }

    const digits = rawValue.replace(/[^\d]/g, "");
    if (!digits) {
      return undefined;
    }

    return `https://wa.me/${digits}`;
  }, [site?.whatsapp_link, site?.contact_phone]);

  const calendlyLink = site?.calendly_link;

  const quickLinks = useMemo(() => {
    const links = [];
    if (whatsappLink) {
      links.push({
        label: "WhatsApp Chat",
        href: whatsappLink,
        icon: <MessageCircle className="h-4 w-4 text-[#25D366]" />,
        meta: "Instant",
      });
    }
    if (calendlyLink) {
      links.push({
        label: "Book a Call",
        href: calendlyLink,
        icon: <Calendar className="h-4 w-4 text-[#0069ff]" />,
        meta: "15-30 min",
      });
    }
    return links;
  }, [whatsappLink, calendlyLink]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 z-10">
        {shouldRenderCanvas ? (
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#fb641b" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#fbbf24" />
            <AnimatedSphere />
            <FloatingOrbs />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(251,100,27,0.2),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(255,191,36,0.18),transparent_60%)]" />
        )}
      </div>

      <div className="absolute inset-0 z-20 bg-gradient-to-b from-background/10 via-background/65 to-background" />

      <div className="relative z-30 mx-auto max-w-5xl px-4 text-center">
        <motion.h1
          ref={titleRef}
          className="mb-6 text-5xl font-bold glow-text md:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-mango bg-clip-text text-transparent">
            {heroHeading}
          </span>
        </motion.h1>

        {highlight && (
          <motion.p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary/70">
            {highlight}
          </motion.p>
        )}

        <motion.p
          ref={subtitleRef}
          className="mb-4 text-xl text-muted-foreground md:text-3xl"
        >
          {heroSubheading}
        </motion.p>

        <motion.p
          ref={subtitleRef}
          className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          {heroDescription}
        </motion.p>

        <motion.div
          ref={buttonsRef}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            className="rounded-full bg-primary px-8 py-6 text-lg text-primary-foreground animate-pulse-glow hover:bg-primary/90"
            onClick={() =>
              handleCtaAction(
                site?.primary_cta_action,
                site?.primary_cta_target,
                () => setIsHireModalOpen(true),
                "contact"
              )
            }
          >
            {primaryLabel}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-2 border-primary px-8 py-6 text-lg text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() =>
              handleCtaAction(
                site?.secondary_cta_action,
                site?.secondary_cta_target,
                undefined,
                "projects"
              )
            }
          >
            {secondaryLabel}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-primary pt-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      </motion.div>

      <Dialog open={isHireModalOpen} onOpenChange={setIsHireModalOpen}>
        <DialogContent className="max-w-2xl border border-primary/30 bg-background/95 p-8 shadow-[0_30px_90px_rgba(255,150,70,0.18)] backdrop-blur-2xl">
          <DialogHeader className="space-y-2 text-center">
            <DialogTitle className="text-3xl font-semibold text-white">
              Let’s craft something cinematic together.
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Choose the fastest way to reach me. I respond within 24 hours.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid gap-3">
                <Input
                    name="name"
                  required
                  placeholder="Your Name"
                    autoComplete="name"
                  className="rounded-xl border-primary/25 bg-background/70 text-sm transition-none focus:border-primary/25 focus:ring-0 focus-visible:border-primary/25 focus-visible:ring-0"
                />
                <Input
                    name="email"
                  required
                  type="email"
                  placeholder="Email Address"
                    autoComplete="email"
                  className="rounded-xl border-primary/25 bg-background/70 text-sm transition-none focus:border-primary/25 focus:ring-0 focus-visible:border-primary/25 focus-visible:ring-0"
                />
                  <Input
                    name="project"
                    required
                    placeholder="Company / Project"
                    className="rounded-xl border-primary/25 bg-background/70 text-sm transition-none focus:border-primary/25 focus:ring-0 focus-visible:border-primary/25 focus-visible:ring-0"
                  />
                <Textarea
                    name="message"
                  required
                  rows={4}
                  placeholder="Project details or a quick hello..."
                  className="rounded-2xl border-primary/25 bg-background/70 text-sm transition-none focus:border-primary/25 focus:ring-0 focus-visible:border-primary/25 focus-visible:ring-0"
                />
              </div>
                <Button
                  className="w-full rounded-full bg-gradient-mango px-8 py-4 text-sm font-semibold uppercase tracking-[0.35em] text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSendingMessage}
                >
                <SendHorizonal className="mr-2 h-4 w-4" />
                  {isSendingMessage ? "Sending…" : "Send Message"}
              </Button>
            </form>

            <div className="flex flex-col gap-4 rounded-[2rem] border border-primary/30 bg-background/70 p-6 shadow-soft backdrop-blur-2xl">
              <p className="text-sm uppercase tracking-[0.35em] text-primary/70">
                Quick Connect
              </p>
              <p className="text-sm text-muted-foreground">
                Prefer a direct chat or want to lock a slot instantly? Use one of these hotkeys and we’ll sync right away.
              </p>
              <div className="grid gap-3">
                {quickLinks.map((link) => (
                  <Button
                    key={link.label}
                    asChild
                    variant="outline"
                    className="flex items-center justify-between rounded-2xl border-primary/40 px-5 py-4 text-sm text-primary transition-colors hover:border-primary hover:bg-primary/20 hover:text-primary-foreground"
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center gap-3">
                        {link.icon}
                        {link.label}
                      </span>
                      <span className="text-xs uppercase tracking-[0.35em] text-primary/70">
                        {link.meta}
                      </span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
