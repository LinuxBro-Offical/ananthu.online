import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import * as LucideIcons from "lucide-react";
import { Quote } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const getLucideIconByName = (iconName?: string): LucideIcon => {
  if (!iconName) {
    return Quote;
  }
  const normalized = iconName.trim();
  const icons = LucideIcons as unknown as Record<string, LucideIcon | undefined>;
  return (
    icons[normalized] ||
    icons[normalized.charAt(0).toUpperCase() + normalized.slice(1)] ||
    Quote
  );
};

export const Contact = () => {
  const { data } = usePortfolioContent();
  const socialLinks = data?.social_links ?? [];
  const resumes = data?.resumes ?? [];
  const site = data?.site;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
  };

  const professionalResume = resumes.find((resume) => resume.resume_type === "professional");
  const atsResume = resumes.find((resume) => resume.resume_type === "ats");

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,152,56,0.15) 0%,rgba(16,12,10,0.85) 55%,rgba(7,6,5,0.95) 100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 blur-3xl">
        <div className="absolute -left-40 top-20 h-64 w-64 rounded-full bg-primary/20" />
        <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full bg-secondary/20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto max-w-5xl px-4 md:px-8"
      >
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-6 py-2 text-xs uppercase tracking-[0.35em] text-primary">
            Contact
          </span>
          <h2 className="mt-6 text-balance text-4xl font-bold text-white md:text-5xl">
            {site?.hero_subheading ? `Let’s orchestrate something luminous together.` : "Let’s orchestrate something luminous together."}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Share your vision, challenge, or curiosity — I’ll respond with ideas, timelines, and a cinematic plan of action.
          </p>
        </div>

        <div className="relative mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="relative overflow-hidden rounded-[2.2rem] border border-primary/25 bg-background/70 p-10 shadow-soft backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.15),transparent_55%)]" />
            <form onSubmit={handleSubmit} className="relative space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Name</label>
                  <Input
                    required
                    placeholder="Your Name"
                    className="rounded-2xl border border-primary/20 bg-background/60 px-5 py-4 text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:ring-0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Email</label>
                  <Input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="rounded-2xl border border-primary/20 bg-background/60 px-5 py-4 text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Project</label>
                <Input
                  required
                  placeholder="Tell me about the mission..."
                  className="rounded-2xl border border-primary/20 bg-background/60 px-5 py-4 text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:ring-0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">Message</label>
                <Textarea
                  required
                  rows={6}
                  placeholder="Share the narrative, timeline, constraints, or inspiration."
                  className="resize-none rounded-3xl border border-primary/20 bg-background/60 px-5 py-4 text-sm text-white placeholder:text-muted-foreground/60 focus:border-primary focus:ring-0"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="group relative w-full overflow-hidden rounded-full bg-gradient-mango px-10 py-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary-foreground shadow-glow transition-transform duration-500 hover:scale-105"
              >
                <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative">Send Transmission</span>
              </Button>
            </form>
          </Card>

          <div className="relative space-y-8 rounded-[2.2rem] border border-primary/15 bg-background/60 p-10 shadow-soft backdrop-blur-xl">
            <motion.div
              className="absolute -top-16 right-[-3rem] hidden h-36 w-36 rounded-[2.5rem] border border-primary/20 bg-background/40 backdrop-blur-2xl md:block"
              animate={{ rotateZ: [0, 6, 0], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/70">
                Signal Boost
              </p>
              <h3 className="text-2xl font-semibold text-white">
                Let’s align strategy, design, and engineering into an unforgettable release.
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                I partner with founders, studios, and product teams to materialize ambitious experiences — from cinematic landing moments to robust SaaS ecosystems. No templates, only bespoke craft.
              </p>
            </div>

            <div className="grid gap-4">
              {socialLinks.length > 0
                ? socialLinks.map((social, index) => {
                    const IconComponent = getLucideIconByName(social.icon_name);
                    const href = social.url;
                    const displayHref = href.startsWith("mailto:")
                      ? href.replace("mailto:", "")
                      : href.replace(/^https?:\/\//, "");
                    return (
                      <motion.a
                        key={social.label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-2xl border border-primary/20 bg-background/60 px-6 py-4 text-sm text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
                        whileHover={{ x: 6 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 18,
                          delay: index * 0.03,
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                            <IconComponent className="h-5 w-5" />
                          </span>
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                              {social.label}
                            </span>
                            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
                              {displayHref}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs uppercase tracking-[0.3em] text-primary/70">Open</span>
                      </motion.a>
                    );
                  })
                : ["LinkedIn", "GitHub", "Upwork"].map((label) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-2xl border border-primary/20 bg-background/60 px-6 py-4 text-sm text-muted-foreground"
                    >
                      <span>{label}</span>
                      <span className="text-xs uppercase tracking-[0.3em] text-primary/70">Open</span>
                    </div>
                  ))}
            </div>

            <motion.div
              className="grid gap-1 rounded-2xl border border-primary/20 bg-primary/10 px-6 py-4 text-center text-[0.6rem] uppercase tracking-[0.3em] text-primary md:text-left"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              <span>Available for select collaborations</span>
              <span className="text-primary/75">Remote · Hybrid · On-site</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
