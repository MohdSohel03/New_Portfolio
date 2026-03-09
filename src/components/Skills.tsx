import { motion } from "framer-motion";

const skillPairs = [
  { left: "React + JavaScript", right: "React + TypeScript" },
  { left: "Bootstrap", right: "TailwindCSS" },
  { left: "MongoDB", right: "Supabase" },
  { left: "MYSQL", right: "Firebase" },
  { left: "Figma", right: "Canva" },
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg">My Skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
          {skillPairs.map((pair, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between gap-8"
            >
              <div className="flex-1 text-center">
                <div className="py-4 px-6 bg-secondary/60 border border-border hover:border-primary/40 transition-colors">
                  <span className="text-sm font-medium">{pair.left}</span>
                </div>
              </div>
              <div className="flex-1 text-center">
                <div className="py-4 px-6 bg-secondary/60 border border-border hover:border-primary/40 transition-colors">
                  <span className="text-sm font-medium">{pair.right}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
