import { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as LucideIcons from "lucide-react";
import { Brain, Cloud, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

const GRID_PATTERN_SVG = `
<svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="rgba(255, 180, 100, 0.05)" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="400" height="400" fill="url(#grid)" />
</svg>
`;

const GRID_PATTERN = `data:image/svg+xml,${encodeURIComponent(GRID_PATTERN_SVG)}`;

const floatingIcons = [
  { Icon: Brain, className: "left-10 top-12", delay: 0 },
  { Icon: Cloud, className: "right-16 top-24", delay: 1.6 },
  { Icon: Zap, className: "left-[35%] bottom-12", delay: 2.4 },
];

export const About = () => {
  const { data } = usePortfolioContent();
  const about = data?.about;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const leadingHighlights = about?.highlights?.slice(0, 2) ?? [];
  const remainingHighlights = about?.highlights?.slice(2) ?? [];

  const highlightCaptionLines = useMemo(() => {
    if (about?.highlight_caption) {
      return about.highlight_caption.split("\n").filter(Boolean);
    }
    if (remainingHighlights.length > 0) {
      return remainingHighlights.map((highlight) => highlight.description || highlight.title);
    }
    return [];
  }, [about?.highlight_caption, remainingHighlights]);

  const profileImage = about?.profile_image || "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=1600&q=80";

  const renderHighlightIcon = (iconName: string) => {
    const cleanedName = iconName?.trim();
    const IconComponent = (LucideIcons as Record<string, LucideIcons.LucideIcon | undefined>)[cleanedName];
    if (IconComponent) {
      return <IconComponent className="h-7 w-7" />;
    }
    return <Zap className="h-7 w-7" />;
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-[#26130c] via-[#18100f] to-[#0a0908] py-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-y-0 left-1/2 w-[60vw] -translate-x-1/2 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,hsl(var(--secondary)/0.2),transparent_65%)]" />
        <div
          className="absolute inset-0 opacity-100 mix-blend-screen"
          style={{ backgroundImage: `url(${GRID_PATTERN})` }}
        />
      </div>

      {floatingIcons.map(({ Icon, className, delay }) => (
        <motion.div
          key={className}
          className={`pointer-events-none absolute z-10 hidden rounded-3xl border border-primary/30 bg-background/60 p-4 shadow-soft backdrop-blur-2xl md:block ${className}`}
          animate={{ y: [0, -14, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 7 + delay, delay, ease: "easeInOut" }}
        >
          <Icon className="h-8 w-8 text-primary" />
        </motion.div>
      ))}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-20 mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-8 lg:px-10"
      >
        <motion.div variants={itemVariants} className="space-y-8">
          <div>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/40 px-5 py-2 text-xs uppercase tracking-[0.35em] text-primary"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              About
            </motion.span>
          </div>

          <motion.h2
            variants={itemVariants}
            className="text-balance text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
          >
            {about?.heading || "A technologist blending artful expression with scalable engineering craft."}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {about?.description ||
              "I’m a passionate software engineer crafting scalable and visually stunning web solutions using Django, Python, and modern front-end frameworks. Great products are born where bold ideas meet precise systems — I reside in that intersection."}
          </motion.p>

          <div className="grid gap-6 md:grid-cols-2">
            {leadingHighlights.length > 0
              ? leadingHighlights.map((highlight, index) => (
                  <Card
                    key={highlight.title}
                    className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-background/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                        {renderHighlightIcon(highlight.icon_name || (index === 0 ? "Code2" : "Zap"))}
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-primary/70">
                          {`0${index + 1}`}
                        </p>
                        <h3 className="text-lg font-semibold text-white">{highlight.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {highlight.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              : [0, 1].map((index) => (
                  <Card
                    key={index}
                    className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-background/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary">
                        {index === 0 ? <Zap className="h-7 w-7" /> : <Brain className="h-7 w-7" />}
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-primary/70">0{index + 1}</p>
                        <h3 className="text-lg font-semibold text-white">Highlight</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Tailored highlight sourced from admin.
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[2.4rem] border border-primary/25 bg-background/65 shadow-[0_25px_85px_rgba(255,150,70,0.2)] backdrop-blur-2xl"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(120deg, rgba(18, 10, 7, 0.78), rgba(17, 11, 8, 0.82)), url("${profileImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                mixBlendMode: "lighten",
                opacity: 0.85,
              }}
            />
            <div className="relative grid gap-5 p-8 text-left text-white">
              <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
                Behind the screens
              </p>
              <p className="text-lg leading-relaxed drop-shadow-[0_12px_35px_rgba(255,150,70,0.35)]">
                {about?.highlight_quote || "“Code is my language. Storytelling is my medium. I build digital worlds that feel alive.”"}
              </p>
              <p className="text-sm text-muted-foreground max-w-md">
                {about?.subtitle ||
                  "From design studios to production pipelines, I align teams around bold ideas and deliver the systems that power them."}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative flex flex-col justify-end gap-6"
        >
          <div className="relative overflow-hidden rounded-[2.6rem] border border-primary/25 bg-background/60 shadow-[0_30px_90px_rgba(255,150,70,0.18)] backdrop-blur-2xl">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(115deg, rgba(20, 13, 8, 0.82), rgba(19, 12, 7, 0.88)), url("${profileImage}")`,
                backgroundSize: "cover",
                backgroundPosition: "center 30%",
                mixBlendMode: "screen",
                opacity: 0.85,
              }}
            />
            <div className="relative grid gap-6 p-10 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-primary/80">
                  Profiles in motion
                </p>
                <h3 className="text-3xl font-semibold leading-tight drop-shadow-[0_18px_45px_rgba(255,150,70,0.3)]">
                  Meet the engineer who sketches in gradients and thinks in systems.
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {about?.subtitle ||
                  "My workflows blend design intuition with engineering rigor—shipping experiences that feel cinematic yet remain scalable, accessible, and measurable."}
              </p>
              <div className="grid gap-4 text-sm text-muted-foreground">
                {highlightCaptionLines.length > 0
                  ? highlightCaptionLines.map((line, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
                        {line}
                      </div>
                    ))
                  : [
                      "Humanized product strategy grounded in data.",
                      "Performance-obsessed code with automated resilience.",
                      "Cross-disciplinary collaboration across design and engineering.",
                    ].map((line, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-primary shadow-glow" />
                        {line}
                      </div>
                    ))}
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl border border-primary/20 bg-background/70 p-10 shadow-soft backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[0.4em] text-primary/70">
              Core Focus
            </p>
            <ul className="mt-4 space-y-3 text-base text-muted-foreground">
              {remainingHighlights.length > 0
                ? remainingHighlights.map((highlight) => (
                    <li key={highlight.title} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {highlight.description || highlight.title}
                    </li>
                  ))
                : [
                    "Humanized product strategy grounded in data.",
                    "Performance-obsessed code with automated resilience.",
                    "Cross-disciplinary collaboration across design and engineering.",
                  ].map((line, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {line}
                    </li>
                  ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
