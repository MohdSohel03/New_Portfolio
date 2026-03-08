import { motion } from "framer-motion";
import freelanceBg from "@/assets/freelance-bg.jpg";

const stats = [
  { number: "100", label: "Awards" },
  { number: "1,200", label: "Complete Projects" },
  { number: "1,200", label: "Happy Customers" },
  { number: "500", label: "Cups of coffee" },
];

const Freelance = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative">
      {/* Stats Row */}
      <div className="bg-background py-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-secondary/60 border border-border p-8 text-center"
              >
                <span className="block text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Freelancing CTA */}
      <div className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src={freelanceBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/50" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center px-4"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            I'm <span className="text-primary">Available</span> for freelancing
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            I build scalable web applications and AI-powered solutions. Let's work together to bring your ideas to life.
          </p>
          <button
            onClick={() => scrollTo("contact")}
            className="px-10 py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity"
          >
            Hire Me
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Freelance;
