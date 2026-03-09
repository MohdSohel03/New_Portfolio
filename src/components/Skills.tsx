import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Skill {
  id: string;
  name: string;
  percentage: number;
  sort_order: number;
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    supabase.from("skills").select("*").order("sort_order").then(({ data }) => {
      if (data) setSkills(data);
    });
  }, []);

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
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <span className="text-[120px] md:text-[180px] font-black text-muted/5 select-none">
              Skills
            </span>
          </div>
          <h2 className="heading-lg relative z-10">My Skills</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
          {[leftColumn, rightColumn].map((column, colIdx) => (
            <div key={colIdx} className="space-y-8">
              {column.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: colIdx === 0 ? -20 : 20 }}
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
