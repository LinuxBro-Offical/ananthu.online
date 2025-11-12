import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
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
      <div id="contact">
        <Contact />
      </div>
      
      {/* Footer */}
      <footer className="py-8 border-t border-primary/20 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Portfolio. Crafted with passion and{" "}
            <span className="text-primary">❤️</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
