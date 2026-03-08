import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const projects = [
  {
    title: "AI Job & Internship Platform",
    description: "AI-powered job recommendation platform developed for Smart India Hackathon. Matches candidates with opportunities using intelligent algorithms.",
    tech: ["React", "Django", "MySQL"],
    github: "https://github.com/",
    live: "#",
    color: "from-primary/20 to-accent/10",
  },
  {
    title: "Freelancing Platform",
    description: "A platform that connects freelancers and clients without extra commissions. Features secure payments and project management tools.",
    tech: ["React", "Django"],
    github: "https://github.com/",
    live: "#",
    color: "from-accent/20 to-primary/10",
  },
  {
    title: "Inventory Management System",
    description: "A system to track inventory, stock levels, and generate detailed reports. Built with efficient data processing pipelines.",
    tech: ["Python", "SQL"],
    github: "https://github.com/",
    live: "#",
    color: "from-primary/15 to-accent/15",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding relative">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-sm mb-2">// my work</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card hover-glow group flex flex-col"
            >
              {/* Project image placeholder */}
              <div className={`h-44 rounded-t-xl bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <span className="text-3xl font-bold gradient-text font-mono opacity-60 group-hover:opacity-100 transition-opacity">
                  {project.title.split(" ").map(w => w[0]).join("")}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-primary">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                    <FiGithub size={14} /> Code
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-medium">
                    <FiExternalLink size={14} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
