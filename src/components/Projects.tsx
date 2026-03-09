import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import careerImg from "@/assets/project-career-counselor.jpg";
import resumeImg from "@/assets/project-resume-builder.jpg";
import ecommerceImg from "@/assets/project-ecommerce.jpg";
import fitnessImg from "@/assets/project-fitness.jpg";
import inventoryImg from "@/assets/project-inventory.jpg";

const projects = [
  {
    title: "AI-Based Career Counselor Application",
    description: "An intelligent career guidance platform powered by AI that provides personalized career recommendations and learning pathways.",
    tech: ["React", "Python", "TensorFlow"],
    image: careerImg,
    github: "https://github.com/MohdSohel03/AI-Based-Career-Counselor-Application",
    live: "#",
  },
  {
    title: "AI Resume Builder Application",
    description: "An intelligent resume builder that uses AI to generate optimized resumes, suggest improvements, and match job descriptions.",
    tech: ["React", "Node.js", "OpenAI"],
    image: resumeImg,
    github: "https://github.com/MohdSohel03/AI-Resume-Builder-Application",
    live: "#",
  },
  {
    title: "E-commerce Website",
    description: "A full-featured e-commerce platform with product catalog, shopping cart, payment integration, and order management.",
    tech: ["React", "Node.js", "MongoDB"],
    image: ecommerceImg,
    github: "https://github.com/",
    live: "#",
  },
  {
    title: "Personal Fitness Tracking Web Application",
    description: "A comprehensive fitness tracking app that monitors workouts, nutrition, progress, and goals with data visualization.",
    tech: ["React", "Firebase", "Chart.js"],
    image: fitnessImg,
    github: "https://github.com/MohdSohel03/Personal-Fitness-Tracking-Web-Application",
    live: "#",
  },
  {
    title: "Inventory Management System",
    description: "A system to track inventory, stock levels, and generate detailed reports with efficient data processing pipelines.",
    tech: ["Python", "SQL"],
    image: inventoryImg,
    github: "https://github.com/MohdSohel03/inventory-pro-hub",
    live: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section-padding bg-card/40">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="subheading">Projects</p>
          <h2 className="heading-lg">My Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden bg-secondary"
            >
              {/* Placeholder image area */}
              <div className="h-48 bg-muted flex items-center justify-center">
                <span className="text-2xl font-bold text-muted-foreground/40 uppercase tracking-wider">
                  {project.title.split(" ").slice(0, 2).join(" ")}
                </span>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                <h3 className="text-primary-foreground font-bold text-center mb-3">{project.title}</h3>
                <p className="text-primary-foreground/80 text-xs text-center mb-4">{project.description}</p>
                <div className="flex gap-3">
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors">
                    <FiGithub size={16} />
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 transition-colors">
                    <FiExternalLink size={16} />
                  </a>
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
