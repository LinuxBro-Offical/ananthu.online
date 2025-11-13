import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

const glassVariants = {
  enter: {
    opacity: 0,
    y: 60,
    rotateX: -12,
    rotateY: 10,
    scale: 0.85,
  },
  center: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -60,
    rotateX: 10,
    rotateY: -8,
    scale: 0.9,
    transition: {
      duration: 0.6,
      ease: "easeIn",
    },
  },
};

export const Testimonials = () => {
  const { data } = usePortfolioContent();
  const testimonials = data?.testimonials ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const visibleTestimonials = useMemo(() => {
    if (testimonials.length === 0) {
      const fallback = {
        author_name: "Client",
        author_role: "Product Leader",
        quote: "Creative, reliable, and detail-oriented. Highly recommend!",
      };
      return {
        current: fallback,
        prev: fallback,
        next: fallback,
      };
    }
    const prev = (activeIndex - 1 + testimonials.length) % testimonials.length;
    const next = (activeIndex + 1) % testimonials.length;
    return {
      current: testimonials[activeIndex],
      prev: testimonials[prev],
      next: testimonials[next],
    };
  }, [activeIndex, testimonials]);

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,hsl(var(--primary)/0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(10,7,5,0.75) 0%,rgba(17,12,10,0.9) 55%,rgba(10,8,7,0.95) 100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.12]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center md:px-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-6 py-2 text-xs uppercase tracking-[0.35em] text-primary">
          Testimonials
        </span>
        <h2 className="mt-6 text-balance text-4xl font-bold text-white md:text-5xl">
          Voices from collaborators who believe in cinematic engineering.
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Crafting immersive products is never a solo act. These perspectives capture the shared energy behind each release.
        </p>

        <div className="relative mt-16 flex w-full flex-col items-center justify-center">
          <div className="pointer-events-none absolute -top-12 h-32 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-[420px] w-[420px] rounded-[3rem] border border-primary/15 bg-background/40 blur-[120px]" />
          </div>

          <div className="flex w-full flex-col items-center gap-10 md:flex-row md:justify-center">
            <motion.div
              className="hidden aspect-square w-64 rounded-[2.2rem] border border-primary/10 bg-background/50 p-6 text-left text-sm text-muted-foreground/80 backdrop-blur-xl md:flex md:flex-col"
              animate={{ rotateY: [10, 6, 10], y: [8, -8, 8] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            >
              <Quote className="mb-4 h-6 w-6 text-primary/60" />
              <p className="max-h-32 overflow-hidden text-ellipsis">{visibleTestimonials.prev.quote}</p>
              <div className="mt-auto pt-4 text-xs uppercase tracking-[0.35em] text-primary/60">
                {visibleTestimonials.prev.author_name}
              </div>
            </motion.div>

            <div className="relative h-[360px] w-full max-w-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${visibleTestimonials.current.author_name}-${visibleTestimonials.current.quote}`}
                  variants={glassVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex flex-col rounded-[2.8rem] border border-primary/30 bg-background/60 p-10 text-left text-base text-muted-foreground shadow-glow backdrop-blur-xl"
                >
                  <motion.div className="absolute inset-0 rounded-[2.8rem] border border-primary/10 opacity-0 transition-opacity duration-500 hover:opacity-100" />
                  <Quote className="h-10 w-10 text-primary" />
                  <p className="mt-6 text-lg leading-relaxed text-white/90">
                    “{visibleTestimonials.current.quote}”
                  </p>
                  <div className="mt-auto">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                      {visibleTestimonials.current.author_name}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
                      {visibleTestimonials.current.author_role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              className="hidden aspect-square w-64 rounded-[2.2rem] border border-primary/10 bg-background/50 p-6 text-left text-sm text-muted-foreground/80 backdrop-blur-xl md:flex md:flex-col"
              animate={{ rotateY: [-8, -4, -8], y: [-6, 10, -6] }}
              transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
            >
              <Quote className="mb-4 h-6 w-6 text-primary/60" />
              <p className="max-h-32 overflow-hidden text-ellipsis">{visibleTestimonials.next.quote}</p>
              <div className="mt-auto pt-4 text-xs uppercase tracking-[0.35em] text-primary/60">
                {visibleTestimonials.next.author_name}
              </div>
            </motion.div>
          </div>

          <div className="mt-12 flex items-center gap-3">
            {(testimonials.length > 0 ? testimonials : visibleTestimonials ? [visibleTestimonials.current] : []).map((testimonial, index) => {
              const isActive = testimonials.length > 0 ? index === activeIndex : index === 0;
              return (
                <button
                  key={testimonial.author_name + index}
                  onClick={() => testimonials.length > 0 && setActiveIndex(index)}
                  className={`h-3 rounded-full transition-all ${
                    isActive ? "w-10 bg-primary" : "w-3 bg-primary/30 hover:bg-primary/60"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                  disabled={testimonials.length === 0}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

