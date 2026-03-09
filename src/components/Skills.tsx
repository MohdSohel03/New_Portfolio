import { motion } from "framer-motion";

const skills = [
  { name: "React + JavaScript", percentage: 90 },
  { name: "React + TypeScript", percentage: 85 },
  { name: "Bootstrap", percentage: 80 },
  { name: "TailwindCSS", percentage: 95 },
  { name: "MongoDB", percentage: 75 },
  { name: "Supabase", percentage: 88 },
  { name: "MYSQL", percentage: 82 },
  { name: "Firebase", percentage: 85 },
  { name: "Figma", percentage: 90 },
  { name: "Canva", percentage: 80 },
];

const Skills = () => {
  // Split skills into two columns
  const leftColumn = skills.filter((_, i) => i % 2 === 0);
  const rightColumn = skills.filter((_, i) => i % 2 === 1);

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          {/* Background "Skills" text */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <span className="text-[120px] md:text-[180px] font-black text-muted/5 select-none">
              Skills
            </span>
          </div>
          
          {/* Main heading */}
          <h2 className="heading-lg relative z-10">My Skills</h2>
          
          {/* Subtitle */}
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
          {/* Left Column */}
          <div className="space-y-8">
            {leftColumn.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-foreground font-semibold">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-muted/20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.2, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {rightColumn.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-foreground font-semibold">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-muted/20 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.2, ease: "easeOut" }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
