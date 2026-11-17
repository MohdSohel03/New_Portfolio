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

  const columns = [skills.filter((_, index) => index % 2 === 0), skills.filter((_, index) => index % 2 === 1)];

  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="heading-lg">My Skills</h2>
          <div className="mt-8 border-t border-border pt-8">
            <h3 className="text-2xl font-bold text-foreground">Technical Skills</h3>
          </div>
        </motion.div>

        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 md:gap-x-16">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-7">
              {column.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="font-semibold text-foreground">{skill.name}</span>
                    <span className="shrink-0 text-sm text-muted-foreground">{skill.percentage}%</span>
                  </div>
                  <div
                    className="h-2.5 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-label={skill.name}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={skill.percentage}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.08 + 0.12, ease: "easeOut" }}
                      className="h-full rounded-full bg-primary"
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