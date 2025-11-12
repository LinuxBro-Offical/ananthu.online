import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack marketplace with real-time inventory management and payment integration",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    gradient: "from-primary to-accent",
  },
  {
    title: "AI Dashboard",
    description: "Analytics platform with machine learning insights and data visualization",
    tech: ["Next.js", "Python", "TensorFlow", "D3.js"],
    gradient: "from-secondary to-primary",
  },
  {
    title: "Social Media App",
    description: "Real-time messaging and content sharing platform with modern UI/UX",
    tech: ["React Native", "Firebase", "Redux", "WebSocket"],
    gradient: "from-accent to-secondary",
  },
  {
    title: "Cloud Management Tool",
    description: "Infrastructure monitoring and automation dashboard for DevOps teams",
    tech: ["Vue.js", "AWS", "Docker", "Kubernetes"],
    gradient: "from-primary to-secondary",
  },
];

export const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-mango bg-clip-text text-transparent">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="glass p-8 h-full border-2 border-primary/20 hover:border-primary/60 transition-all group">
                <div className={`w-full h-48 mb-6 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <div className="text-6xl opacity-50">🚀</div>
                </div>
                
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="border-primary/40 hover:bg-primary hover:text-primary-foreground">
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                  <Button variant="outline" size="sm" className="border-primary/40 hover:bg-primary hover:text-primary-foreground">
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
