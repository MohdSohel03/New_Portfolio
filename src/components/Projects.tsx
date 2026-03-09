import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { supabase } from "@/integrations/supabase/client";

// Fallback images for projects without image_url
import careerImg from "@/assets/project-career-counselor.jpg";
import resumeImg from "@/assets/project-resume-builder.jpg";
import ecommerceImg from "@/assets/project-ecommerce.jpg";
import fitnessImg from "@/assets/project-fitness.jpg";
import inventoryImg from "@/assets/project-inventory.jpg";

const fallbackImages: Record<string, string> = {
  "AI-Based Career Counselor Application": careerImg,
  "AI Resume Builder Application": resumeImg,
  "E-commerce Website": ecommerceImg,
  "Personal Fitness Tracking Web Application": fitnessImg,
  "Inventory Management System": inventoryImg,
};

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github_url: string | null;
  live_url: string | null;
  image_url: string | null;
  sort_order: number;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    supabase.from("projects").select("*").order("sort_order").then(({ data }) => {
      if (data) setProjects(data);
    });
  }, []);

  const getImage = (project: Project) => {
    return project.image_url || fallbackImages[project.title] || "/placeholder.svg";
  };

  return (
    <section id="projects" className="section-padding bg-card/40">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg">My Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden bg-secondary"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={getImage(project)}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                <h3 className="text-primary-foreground font-bold text-center mb-3">{project.title}</h3>
                <p className="text-primary-foreground/80 text-xs text-center mb-4">{project.description}</p>
                <div className="flex gap-3">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                      className="p-2 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors">
                      <FiGithub size={16} />
                    </a>
                  )}
                  {project.live_url && project.live_url !== "#" && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                      className="p-2 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors">
                      <FiExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold mb-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground">{project.tech.join(", ")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
