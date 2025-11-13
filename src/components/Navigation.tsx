import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePortfolioContent } from "@/hooks/usePortfolioContent";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCvDialogOpen, setIsCvDialogOpen] = useState(false);
  const { data } = usePortfolioContent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = useMemo(
    () =>
      data?.navigation?.map((item) => ({
        label: item.label,
        target: item.target,
        isExternal: item.is_external,
      })) ?? [
        { label: "About", target: "about", isExternal: false },
        { label: "Skills", target: "skills", isExternal: false },
        { label: "Projects", target: "projects", isExternal: false },
        { label: "Testimonials", target: "testimonials", isExternal: false },
        { label: "Contact", target: "contact", isExternal: false },
      ],
    [data?.navigation]
  );

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const openCvDialog = () => {
    const hasResumes = (data?.resumes?.length ?? 0) > 0;
    if (hasResumes) {
      setIsCvDialogOpen(true);
      setIsMobileMenuOpen(false);
    }
  };

  const professionalResume = data?.resumes?.find(
    (resume) => resume.resume_type === "professional"
  );

  const atsResume = data?.resumes?.find((resume) => resume.resume_type === "ats");

  const siteBrandName = data?.site?.brand_name ?? "ananthu.online";
  const siteBrandSubtitle = data?.site?.brand_subtitle ?? "Ananthu S Kumar";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          {/* Logo */}
          <motion.div
            className="cursor-pointer leading-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="block text-[0.55rem] uppercase tracking-[0.45em] text-primary/70 pl-2">
              {siteBrandSubtitle}
            </span>
            <span className="block text-xl font-semibold italic">
              <span className="bg-gradient-mango bg-clip-text text-transparent">
                {siteBrandName}
              </span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) =>
              item.isExternal ? (
                <a
                  key={item.label}
                  href={item.target}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.target)}
                  className="font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </button>
              )
            )}
            {(professionalResume || atsResume) && (
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={openCvDialog}
              >
                Download CV
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-foreground md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-t border-primary/20 md:hidden"
          >
            <div className="space-y-4 px-4 py-6">
              {navItems.map((item) =>
                item.isExternal ? (
                  <a
                    key={item.label}
                    href={item.target}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-2 text-left font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.target)}
                    className="block w-full py-2 text-left font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </button>
                )
              )}
              {(professionalResume || atsResume) && (
                <Button
                  variant="outline"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={openCvDialog}
                >
                  Download CV
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>

      <Dialog open={isCvDialogOpen} onOpenChange={setIsCvDialogOpen}>
        <DialogContent className="max-w-lg border border-primary/30 bg-background/90 backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-semibold text-white">
              Which resume reality are you choosing?
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              In the immortal words of Morpheus: take the orange glow for cinematic storytelling, or the teal glow for ATS-approved precision.
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-hidden rounded-3xl border border-primary/20">
            <img
              src="https://i.imgflip.com/1ur9b0.jpg"
              alt="Morpheus what if I told you meme"
              className="h-60 w-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {professionalResume && (
              <Button
                asChild
                className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground shadow-glow"
              >
                <a href={professionalResume.file} target="_blank" rel="noopener noreferrer">
                  Professional{" "}
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            )}
            {atsResume && (
              <Button
                asChild
                variant="outline"
                className="group flex items-center justify-center gap-2 rounded-full border-2 border-primary/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-primary shadow-glow hover:bg-primary hover:text-primary-foreground"
              >
                <a href={atsResume.file} target="_blank" rel="noopener noreferrer">
                  ATS Friendly{" "}
                  <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
