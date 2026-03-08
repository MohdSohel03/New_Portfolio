import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import profilePhoto1 from "@/assets/profile-photo.png";
import profilePhoto2 from "@/assets/profile-photo-2.png";

const photos = [profilePhoto1, profilePhoto2];

const Hero = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center section-padding overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="subheading">Hello!</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight">
            I'm <span className="text-primary">Sohel</span>
            <br />
            <span className="text-primary">Ansari</span>
          </h1>
          <h2 className="text-lg md:text-xl text-muted-foreground mb-8 font-light">
            A Full Stack Developer
          </h2>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => scrollTo("contact")}
              className="px-7 py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Hire me
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="px-7 py-3 border border-foreground/30 text-foreground font-semibold text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
            >
              My works
            </button>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <FiGithub size={20} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors">
              <FiLinkedin size={20} />
            </a>
          </div>
        </motion.div>

        {/* Photo with crossfade animation */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <div className="w-72 h-80 md:w-[420px] md:h-[500px] overflow-hidden relative">
            <AnimatePresence mode="sync">
              <motion.img
                key={currentPhoto}
                src={photos[currentPhoto]}
                alt="Sohel Ansari"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-full h-full object-cover object-top absolute inset-0"
              />
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPhoto(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    i === currentPhoto ? "bg-primary" : "bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
