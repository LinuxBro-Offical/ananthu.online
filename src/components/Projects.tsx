import { useMemo, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";
import type {
  Project as ProjectType,
  ProjectImage,
} from "@/hooks/usePortfolioContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProjectCard = ({
  project,
  index,
  onOpenGallery,
}: {
  project: ProjectType;
  index: number;
  onOpenGallery: (project: ProjectType) => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [12, -12]);
  const rotateY = useTransform(x, [-100, 100], [-12, 12]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const resetTilt = () => {
    x.set(0);
    y.set(0);
  };

  const gradient = `linear-gradient(135deg, ${project.gradient_start}33 0%, ${project.gradient_end}1A 100%)`;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 80, rotateX: -8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.12 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        className="relative rounded-[2.2rem] border border-primary/20 bg-background/70 p-1 shadow-soft backdrop-blur-2xl transition-transform duration-300 group-hover:border-primary/50"
      >
        <div
          className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-background/70 p-8"
          style={{ backgroundImage: gradient }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_50%)] opacity-70" />
          <motion.div
            className="relative flex items-center justify-between gap-6"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ repeat: Infinity, duration: 8 + index, ease: "easeInOut" }}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary/70">Project</p>
              <h3 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{project.title}</h3>
              {project.subtitle && (
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-secondary">
                  {project.subtitle}
                </p>
              )}
            </div>
            <motion.div
              className="hidden h-28 w-28 items-center justify-center rounded-full border border-primary/30 bg-background/50 text-5xl md:flex"
              whileHover={{ scale: 1.08, rotate: 5 }}
            >
              <span role="img" aria-hidden="true">
                🚀
              </span>
            </motion.div>
          </motion.div>

          <p className="relative mt-6 text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="relative mt-8 flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech.name}
                className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary"
              >
                {tech.name}
              </span>
            ))}
          </div>

          <div className="relative mt-10 flex flex-wrap items-center gap-4">
            {project.live_url && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-primary/50 px-6 py-2 text-xs uppercase tracking-[0.35em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live
                </a>
              </Button>
            )}
            {project.gallery && project.gallery.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-primary/50 px-6 py-2 text-xs uppercase tracking-[0.35em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                onClick={() => onOpenGallery(project)}
              >
                Gallery
              </Button>
            )}
            {project.code_url && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-primary/50 px-6 py-2 text-xs uppercase tracking-[0.35em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <a href={project.code_url} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            )}
          </div>

          <motion.div
            className="pointer-events-none absolute -right-5 top-10 hidden h-24 w-24 rounded-full bg-primary/20 blur-3xl md:block"
            animate={{ rotate: [0, 360] }}
            transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Projects = () => {
  const { data } = usePortfolioContent();
  const projects = data?.projects ?? [];
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const shimmeringColumns = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, index) => ({
        id: index,
        delay: index * 0.8,
        left: `${15 + index * 20}%`,
      })),
    []
  );

  return (
    <section ref={ref} className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.25),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,hsl(var(--secondary)/0.2),transparent_60%)]" />

      {shimmeringColumns.map(({ id, delay, left }) => (
        <motion.span
          key={id}
          className="pointer-events-none absolute top-0 z-0 block h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          style={{ left }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ repeat: Infinity, duration: 6, delay }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-6 py-2 text-xs uppercase tracking-[0.35em] text-primary">
            Projects
          </span>
          <h2 className="mt-6 text-balance text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Immersive builds engineered for performance and wonder.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Each project is a cinematic sandbox, pairing rigorous architecture with tactile experiences that feel alive.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {projects.length > 0
            ? projects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                  onOpenGallery={setActiveProject}
                />
              ))
            : [0, 1, 2, 3].map((placeholder) => (
                <div
                  key={placeholder}
                  className="rounded-[2.2rem] border border-primary/20 bg-background/40 p-12 text-muted-foreground"
                >
                  Loading project…
                </div>
              ))}
        </div>
      </div>

      <Dialog
        open={Boolean(activeProject)}
        onOpenChange={(open) => !open && setActiveProject(null)}
      >
        <DialogContent className="max-w-5xl bg-background/95 p-0 text-left shadow-[0_40px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-6">
          {activeProject && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-3xl font-semibold text-white">
                  {activeProject.title}
                </DialogTitle>
                {activeProject.subtitle && (
                  <DialogDescription className="text-sm uppercase tracking-[0.35em] text-primary/80">
                    {activeProject.subtitle}
                  </DialogDescription>
                )}
              </DialogHeader>

              <div className="space-y-6 p-6 pt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {activeProject.description}
                </p>

                {activeProject.gallery && activeProject.gallery.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {activeProject.gallery.map((asset: ProjectImage, idx: number) => (
                      <div
                        key={`${asset.image}-${idx}`}
                        className="overflow-hidden rounded-2xl border border-primary/20 bg-background/60"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={asset.image}
                          alt={asset.caption || `Project image ${idx + 1}`}
                          className="h-64 w-full object-cover transition-transform duration-700 hover:scale-105"
                          loading="lazy"
                        />
                        {asset.caption && (
                          <p className="px-4 py-3 text-xs uppercase tracking-[0.3em] text-primary/80">
                            {asset.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-primary/30 px-6 py-10 text-center text-xs uppercase tracking-[0.35em] text-primary/70">
                    Gallery coming soon. Check back shortly.
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {activeProject.tech.map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-primary"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
