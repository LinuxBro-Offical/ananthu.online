import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

const Index = () => {
  const { data } = usePortfolioContent();
  const footerText =
    data?.footer?.text || "© 2025 Portfolio. Crafted with passion and curiosity.";
  const footerTagline = data?.footer?.tagline || "Craft. Flow. Impact.";

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,hsl(var(--secondary)/0.15),transparent_55%)]" />
        <div className="absolute inset-0 backdrop-blur-[3px]" />
      </div>
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <div id="about">
          <About />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>

      <footer className="relative z-10 border-t border-primary/20 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-10 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {footerText}
          </p>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground/80">
            <span className="h-px w-10 bg-primary/40" />
            <span>{footerTagline}</span>
            <span className="h-px w-10 bg-primary/40" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
