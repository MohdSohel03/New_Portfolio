import { motion } from "framer-motion";
import { FiBook, FiAward, FiCpu } from "react-icons/fi";

const About = () => {
  return (
    <section id="about" className="section-padding relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// about me</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Know Who I <span className="gradient-text">Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 glow-border flex items-center justify-center overflow-hidden">
              <div className="text-6xl md:text-7xl font-bold gradient-text font-mono">SA</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              I am a BSc IT student and Full Stack Developer based in Mumbai. I specialize in
              building scalable web applications using React, Django, and AI technologies.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Passionate about problem solving and innovation, I strive to create impactful
              digital solutions that make a difference.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: FiBook, label: "BSc IT", sub: "Mumbai" },
                { icon: FiAward, label: "SIH Finalist", sub: "Hackathon" },
                { icon: FiCpu, label: "AI & ML", sub: "Enthusiast" },
              ].map((item, i) => (
                <div key={i} className="glass-card hover-glow p-4 text-center">
                  <item.icon className="mx-auto mb-2 text-primary" size={24} />
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
