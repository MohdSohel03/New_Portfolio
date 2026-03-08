import { FiTwitter, FiFacebook, FiInstagram, FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const links = ["Home", "About", "Services", "Projects", "Contact"];
const services = ["Web Design", "Web Development", "AI Solutions", "Backend Development", "UI/UX Design"];

const sectionIds: Record<string, string> = {
  Home: "home",
  About: "about",
  Services: "services",
  Projects: "projects",
  Contact: "contact",
};

const Footer = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-6">About</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              I am a BSc IT student and Full Stack Developer based in Mumbai, passionate about building scalable web applications and AI solutions.
            </p>
            <div className="flex gap-3">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <FiTwitter size={16} />
              </a>
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <FiFacebook size={16} />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <FiInstagram size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-6">Links</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(sectionIds[link])}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span>→</span> {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo("services")}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span>→</span> {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Have a Question */}
          <div>
            <h3 className="text-foreground font-bold text-lg mb-6">Have a Questions?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-muted-foreground mt-1 shrink-0" size={16} />
                <span className="text-muted-foreground text-sm">Mumbai, India</span>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="text-muted-foreground mt-1 shrink-0" size={16} />
                <span className="text-muted-foreground text-sm">+91 XXXXX XXXXX</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="text-muted-foreground mt-1 shrink-0" size={16} />
                <span className="text-muted-foreground text-sm">sohel@example.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-6">
        <p className="text-center text-muted-foreground text-sm">
          Copyright ©{new Date().getFullYear()} All rights reserved | Made with <span className="text-primary">❤</span> by Mohd Sohel Ansari
        </p>
      </div>
    </footer>
  );
};

export default Footer;
