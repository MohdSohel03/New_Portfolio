import { motion } from "framer-motion";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiDjango, SiPython,
  SiMysql, SiSupabase, SiGithub,
} from "react-icons/si";
import { FiDatabase, FiServer, FiCpu } from "react-icons/fi";

type Skill = { name: string; icon: React.ElementType; level: number };

const categories: { title: string; icon: React.ElementType; skills: Skill[] }[] = [
  {
    title: "Frontend",
    icon: FiServer,
    skills: [
      { name: "HTML", icon: SiHtml5, level: 90 },
      { name: "CSS", icon: SiCss3, level: 85 },
      { name: "JavaScript", icon: SiJavascript, level: 85 },
      { name: "React", icon: SiReact, level: 80 },
    ],
  },
  {
    title: "Backend",
    icon: FiServer,
    skills: [
      { name: "Django", icon: SiDjango, level: 80 },
      { name: "REST APIs", icon: FiServer, level: 75 },
      { name: "Python", icon: SiPython, level: 85 },
    ],
  },
  {
    title: "Database",
    icon: FiDatabase,
    skills: [
      { name: "SQL", icon: FiDatabase, level: 80 },
      { name: "MySQL", icon: SiMysql, level: 75 },
      { name: "Supabase", icon: SiSupabase, level: 70 },
    ],
  },
  {
    title: "Tools",
    icon: FiCpu,
    skills: [
      { name: "GitHub", icon: SiGithub, level: 85 },
      { name: "VS Code", icon: SiVisualstudiocode, level: 90 },
      { name: "AI Tools", icon: FiCpu, level: 75 },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// my skills</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Tech <span className="gradient-text">Stack</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="glass-card hover-glow p-6"
            >
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
                <cat.icon className="text-primary" size={20} />
                {cat.title}
              </h3>
              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-2 text-sm font-medium">
                        <skill.icon className="text-primary" size={14} />
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
