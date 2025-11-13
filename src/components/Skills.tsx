import { useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import techTexture from "@/assets/tech-texture.jpg";
import {
  usePortfolioContent,
  type SkillCategory as SkillCategoryType,
  type SkillItem as SkillItemType,
} from "@/hooks/usePortfolioContent";

const gradientPalette = [
  "linear-gradient(135deg, rgba(255,140,65,0.18) 0%, rgba(255,217,119,0.05) 100%)",
  "linear-gradient(135deg, rgba(255,190,98,0.2) 0%, rgba(255,138,61,0.05) 100%)",
  "linear-gradient(135deg, rgba(255,217,119,0.2) 0%, rgba(255,140,65,0.05) 100%)",
];

const trailPoints = Array.from({ length: 14 }).map((_, index) => ({
  id: index,
  x: (Math.sin(index * 0.55) * 45).toFixed(1),
  y: (Math.cos(index * 0.45) * 28 + index * 12).toFixed(1),
  delay: index * 0.18,
}));

const SkillRow = ({ skill }: { skill: SkillItemType }) => {
  const logoSrc = skill.logo || skill.logo_url || "";
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-primary/20 bg-background/70 px-4 py-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-primary/10">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[0_10px_28px_rgba(255,150,70,0.2)]">
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoSrc}
            alt={skill.name}
            loading="lazy"
            className="h-8 w-8 object-contain"
          />
        ) : (
          <span className="text-sm font-semibold uppercase tracking-[0.3em]">
            {skill.name[0]}
          </span>
        )}
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {skill.name}
        </span>
        {skill.description && (
          <span className="text-xs text-muted-foreground">{skill.description}</span>
        )}
      </div>
    </div>
  );
};

const SkillCard = ({ category, index }: { category: SkillCategoryType; index: number }) => {
  const gradient = gradientPalette[index % gradientPalette.length];
  return (
    <motion.article
      className="relative overflow-hidden rounded-[2.5rem] border border-primary/25 bg-background/70 p-8 shadow-[0_25px_90px_rgba(255,150,70,0.18)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
      style={{ backgroundImage: gradient }}
    >
      <div className="pointer-events-none absolute -right-20 top-0 h-32 w-32 rounded-full bg-primary/20 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.15),transparent_55%)] opacity-80" />

      <div className="relative flex flex-col gap-6">
        <div className="space-y-2">
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-primary/70">
            Stack {(index + 1).toString().padStart(2, "0")}
          </span>
          <h3 className="text-2xl font-semibold text-white drop-shadow-[0_15px_45px_rgba(255,150,70,0.32)]">
            {category.title}
          </h3>
          {category.subtitle && (
            <p className="text-sm text-muted-foreground">{category.subtitle}</p>
          )}
          {category.highlight && (
            <p className="text-xs uppercase tracking-[0.35em] text-secondary">
              {category.highlight}
            </p>
          )}
        </div>

        <div className="grid gap-3">
          {category.skills.length > 0 ? (
            category.skills.map((skill) => <SkillRow key={skill.name} skill={skill} />)
          ) : (
            <div className="rounded-2xl border border-dashed border-primary/30 px-4 py-6 text-center text-xs uppercase tracking-[0.3em] text-primary/70">
              Configure skills in the admin panel
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export const Skills = () => {
  const { data } = usePortfolioContent();
  const categories = data?.skills ?? [];
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const hasData = categories.length > 0;
  const placeholderCategories = useMemo<SkillCategoryType[]>(
    () =>
      hasData
        ? []
        : [
            {
              title: "Frontend & Interfaces",
              subtitle: "Designing human moments with high-polish UI engineering.",
              highlight: "Immersive UI • Motion Systems • Design Systems",
              order: 0,
              skills: [],
            },
            {
              title: "Backends & Intelligence",
              subtitle: "Architecting resilient, data-driven services with automation.",
              highlight: "API Design • Data Pipelines • AI Integrations",
              order: 1,
              skills: [],
            },
            {
              title: "Cloud & Delivery",
              subtitle: "Ensuring reliability, security, and speed from commit to prod.",
              highlight: "DevOps • Observability • Continuous Delivery",
              order: 2,
              skills: [],
            },
          ],
    [hasData]
  );

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.2 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `url(${techTexture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background/95 via-background/70 to-background/95" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/70 px-6 py-2 text-xs uppercase tracking-[0.35em] text-primary shadow-soft">
            Skill Radar
          </span>
          <h2 className="mt-6 text-balance text-4xl font-bold text-white md:text-5xl">
            A stack you can recognize at a glance.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Logos stay vibrant, descriptions stay clear—every capability is driven from the
            backend so your story stays current.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {(hasData ? categories : placeholderCategories).map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-20 mx-auto flex max-w-2xl justify-between"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {trailPoints.map((point) => (
            <motion.span
              key={point.id}
              className="h-2 w-2 rounded-full bg-primary shadow-glow"
              style={{
                transform: `translate(${point.x}px, ${point.y}px)`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}
              transition={{ repeat: Infinity, duration: 7.5, delay: point.delay }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
