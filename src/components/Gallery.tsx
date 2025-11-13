import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const galleryItems = [
  {
    title: "Immersive Dashboard",
    subtitle: "Realtime systems map",
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "3D Landing Experience",
    subtitle: "Product reveal journeys",
    image:
      "https://images.unsplash.com/photo-1618005198900-89ac7e90b3c6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "AI Studio Interface",
    subtitle: "Cinematic workflow design",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Holographic Analytics",
    subtitle: "Spatial storytelling",
    image:
      "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=1200&q=80",
  },
];

export const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.15),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,hsl(var(--secondary)/0.15),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/60 px-6 py-2 text-xs uppercase tracking-[0.35em] text-primary">
            Gallery
          </span>
          <h2 className="mt-6 text-balance text-4xl font-bold text-white md:text-5xl">
            Glimpses into immersive, mango-lit experiences.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A visual collage of spatial interfaces, cinematic flows, and bold product narratives crafted with heart.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] border border-primary/15 bg-background/60 shadow-soft backdrop-blur-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/30 to-transparent" />
              </div>

              <div className="relative space-y-2 px-8 py-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-sm uppercase tracking-[0.3em] text-primary/70">{item.subtitle}</p>
              </div>

              <motion.div
                className="pointer-events-none absolute inset-0 border border-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};


