import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.png";

const details = [
  { label: "Name", value: "Sohel Ansari" },
  { label: "Education", value: "BSc IT, Mumbai" },
  { label: "Email", value: "sohel@example.com" },
  { label: "Location", value: "Mumbai, India" },
];

const About = () => {
  return (
    <section id="about" className="section-padding bg-card/40">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
              <img src={profilePhoto} alt="Sohel Ansari" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="subheading">About</p>
            <h2 className="heading-lg mb-6">About Me</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I am a BSc IT student and Full Stack Developer based in Mumbai. I specialize in
              building scalable web applications using React, Django, and AI technologies.
              Passionate about problem solving and innovation.
            </p>

            <div className="space-y-3 mb-8">
              {details.map((d) => (
                <div key={d.label} className="flex gap-4">
                  <span className="font-semibold text-sm min-w-[100px]">{d.label}:</span>
                  <span className="text-muted-foreground text-sm">{d.value}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block px-7 py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
