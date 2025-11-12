import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Sparkles, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

export const About = () => {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-20" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-mango bg-clip-text text-transparent">
            About Me
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <Card className="glass p-8 border-2 border-primary/20 hover:border-primary/40 transition-all">
              <div className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-mango flex items-center justify-center animate-float">
                <div className="w-44 h-44 rounded-full bg-background flex items-center justify-center">
                  <Code2 size={80} className="text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">Professional Developer</h3>
              <p className="text-muted-foreground text-center">
                Passionate about creating elegant solutions to complex problems
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-lg text-foreground leading-relaxed">
              I'm a software engineer who loves turning ideas into reality through code. 
              With expertise in modern web technologies, I build scalable applications that 
              make a difference.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My approach combines technical excellence with creative problem-solving, 
              ensuring every project not only works flawlessly but also delivers an 
              exceptional user experience.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <Card className="glass p-6 border border-primary/20 hover:scale-105 transition-transform">
                <Sparkles className="text-primary mb-3" size={32} />
                <h4 className="font-semibold mb-2">Clean Code</h4>
                <p className="text-sm text-muted-foreground">Maintainable & elegant solutions</p>
              </Card>
              <Card className="glass p-6 border border-primary/20 hover:scale-105 transition-transform">
                <Rocket className="text-primary mb-3" size={32} />
                <h4 className="font-semibold mb-2">Fast Delivery</h4>
                <p className="text-sm text-muted-foreground">Efficient & reliable execution</p>
              </Card>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
