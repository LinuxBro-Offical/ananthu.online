import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github, Briefcase } from "lucide-react";
import { toast } from "sonner";

export const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
  };

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:your.email@example.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Briefcase, label: "Upwork", href: "https://upwork.com" },
  ];

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-30" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-center mb-6"
        >
          <span className="bg-gradient-mango bg-clip-text text-transparent">
            Let's Work Together
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 text-lg"
        >
          Have a project in mind? Let's create something amazing together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="glass p-8 border-2 border-primary/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Input 
                    placeholder="Your Name" 
                    required
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    required
                    className="bg-background/50 border-primary/30 focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <Input 
                  placeholder="Subject" 
                  required
                  className="bg-background/50 border-primary/30 focus:border-primary"
                />
              </div>
              
              <div>
                <Textarea 
                  placeholder="Your Message" 
                  required
                  rows={6}
                  className="bg-background/50 border-primary/30 focus:border-primary resize-none"
                />
              </div>
              
              <Button 
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 animate-pulse-glow"
              >
                Send Message
              </Button>
            </form>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex justify-center gap-6"
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full glass border-2 border-primary/30 hover:border-primary flex items-center justify-center group transition-all hover:scale-110"
              >
                <Icon className="text-primary group-hover:scale-110 transition-transform" size={24} />
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
