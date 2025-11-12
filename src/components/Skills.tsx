import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import techTexture from "@/assets/tech-texture.jpg";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "Three.js"],
    color: "primary",
  },
  {
    title: "Backend",
    skills: ["Node.js", "Python", "Django", "PostgreSQL", "MongoDB", "GraphQL"],
    color: "secondary",
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    color: "accent",
  },
  {
    title: "Tools & Methods",
    skills: ["Git", "Agile", "REST APIs", "Testing", "Figma", "Jira"],
    color: "secondary",
  },
];

export const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${techTexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-mango bg-clip-text text-transparent">
            Technical Skills
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass p-8 rounded-2xl border-2 border-primary/20 hover:border-primary/40 transition-all"
            >
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="px-4 py-2 text-sm border-primary/40 hover:bg-primary hover:text-primary-foreground transition-all cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};
