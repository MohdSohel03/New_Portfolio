import { motion } from "framer-motion";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import profilePhoto from "@/assets/profile-photo.png";

const Hero = () => {
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-[1.1]">
            I'm <span className="text-primary italic">Mohd</span>
            <br />
            <span className="text-primary italic">Sohel Ansari</span>
          </h1>
          <h2 className="text-lg md:text-xl text-muted-foreground mb-8 font-light">
            A Freelance Web Designer
          </h2>

          <div className="flex gap-4 mb-8">
            <button
              onClick={() => scrollTo("contact")}
              className="px-7 py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity"
            >
              Hire me
            </button>
            <button
              onClick={() => scrollTo("projects")}
              className="px-7 py-3 border border-foreground/30 text-foreground font-semibold text-sm uppercase tracking-wider rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              My works
            </button>
          </div>

          <div className="flex gap-6">
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

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <div className="w-72 h-80 md:w-[420px] md:h-[500px] overflow-hidden">
            <img
              src={profilePhoto}
              alt="Mohd Sohel Ansari"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
