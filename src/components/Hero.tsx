import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FiGithub, FiLinkedin, FiArrowRight } from "react-icons/fi";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center section-padding grid-bg overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-4 tracking-wider">👋 Hello, I'm</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
            Sohel <span className="gradient-text">Ansari</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
            Full Stack Developer
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="h-8 mb-8"
        >
          <span className="font-mono text-primary text-sm md:text-base">
            <TypeAnimation
              sequence={[
                "React Developer",
                2000,
                "Django Developer",
                2000,
                "AI Enthusiast",
                2000,
              ]}
              repeat={Infinity}
              speed={50}
            />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed"
        >
          I build AI-powered, scalable web applications with modern technologies.
          Turning ideas into elegant digital solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all"
          >
            View Projects <FiArrowRight />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-primary/40 text-primary font-semibold hover:bg-primary/10 transition-all"
          >
            Hire Me
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-5"
        >
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
            className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all text-muted-foreground">
            <FiGithub size={20} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"
            className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all text-muted-foreground">
            <FiLinkedin size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
