import { FiGithub, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="text-primary">Sohel Ansari</span>. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors">
            <FiGithub size={18} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors">
            <FiLinkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
