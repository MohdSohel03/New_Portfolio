import { motion } from "framer-motion";
import { FiCode, FiCpu, FiLayout, FiDatabase, FiSmartphone, FiTrendingUp } from "react-icons/fi";

const services = [
  { icon: FiCode, title: "Web Development", description: "Building responsive, scalable web applications using modern frameworks like React and Django." },
  { icon: FiCpu, title: "AI Solutions", description: "Developing intelligent applications powered by machine learning and AI-driven algorithms." },
  { icon: FiLayout, title: "UI/UX Design", description: "Crafting intuitive, user-friendly interfaces with a focus on clean design and seamless experience." },
  { icon: FiDatabase, title: "Backend Development", description: "Designing robust APIs and database architectures for high-performance server-side applications." },
  { icon: FiSmartphone, title: "Responsive Design", description: "Ensuring pixel-perfect layouts that adapt flawlessly across all devices and screen sizes." },
  { icon: FiTrendingUp, title: "SEO Optimization", description: "Implementing best practices to improve search engine rankings and drive organic traffic." },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-card/40">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg">My Services</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-8 bg-secondary/50 border border-border hover:border-primary/40 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 bg-primary/10 flex items-center justify-center rounded-full group-hover:bg-primary/20 transition-colors">
                <service.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-semibold text-lg mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
