import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#fb641b"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  );
}

function FloatingOrbs() {
  return (
    <group>
      <Sphere position={[-3, 2, -2]} args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
      </Sphere>
      <Sphere position={[3, -1, -1]} args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#fb641b" emissive="#fb641b" emissiveIntensity={0.7} />
      </Sphere>
      <Sphere position={[0, 3, -3]} args={[0.4, 32, 32]}>
        <meshStandardMaterial color="#fdba74" emissive="#fdba74" emissiveIntensity={0.6} />
      </Sphere>
    </group>
  );
}

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    )
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.5"
    )
    .fromTo(
      buttonsRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.4"
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* 3D Scene */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#fb641b" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#fbbf24" />
          <AnimatedSphere />
          <FloatingOrbs />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-background/50 to-background" />

      {/* Content */}
      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto">
        <motion.h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 glow-text"
        >
          <span className="bg-gradient-mango bg-clip-text text-transparent">
            Your Name
          </span>
        </motion.h1>
        
        <motion.p 
          ref={subtitleRef}
          className="text-xl md:text-3xl text-muted-foreground mb-4"
        >
          Software Engineer & Full Stack Developer
        </motion.p>
        
        <motion.p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Crafting intelligent, scalable, and beautiful web solutions
        </motion.p>

        <motion.div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full animate-pulse-glow"
          >
            Hire Me
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg rounded-full"
          >
            View Work
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};
