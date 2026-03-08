import { motion } from "framer-motion";
import aboutPhoto from "@/assets/about-photo.png";

const details = [
  { label: "Name", value: "Mohd Sohel Ansari" },
  { label: "Date of birth", value: "January 01, 2004" },
  { label: "Address", value: "Mumbai, India" },
  { label: "Education", value: "BSc IT, Mumbai" },
  { label: "Email", value: "sohel@example.com" },
  { label: "Phone", value: "+91 XXXXX XXXXX" },
];

const About = () => {
  return (
    <section id="about" className="section-padding bg-card/40">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-0 items-stretch">
          {/* Photo - no circle, edge-to-edge like reference */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex items-end justify-center overflow-hidden min-h-[400px] md:min-h-[550px]"
          >
            <img
              src={aboutPhoto}
              alt="Mohd Sohel Ansari"
              className="w-full h-full object-cover object-top absolute inset-0"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center py-12 px-8 md:px-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold mb-1">About Me</h2>
            <p className="text-4xl md:text-6xl font-extrabold text-muted-foreground/15 -mt-6 md:-mt-8 mb-4 select-none">
              About
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I am a BSc IT student and Full Stack Developer based in Mumbai. I specialize in
              building scalable web applications using React, Django, and AI technologies.
              Passionate about problem solving and innovation.
            </p>

            <div className="space-y-4 mb-8">
              {details.map((d) => (
                <div key={d.label} className="flex gap-6">
                  <span className="font-bold text-sm min-w-[120px]">{d.label}:</span>
                  <span className="text-muted-foreground text-sm">{d.value}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 mb-8">
              <span className="text-primary text-3xl font-bold">120</span>
              <span className="text-foreground font-semibold">Project complete</span>
            </div>

            <a
              href="/resume.pdf"
              download
              className="inline-block w-fit px-8 py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity"
            >
              Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
