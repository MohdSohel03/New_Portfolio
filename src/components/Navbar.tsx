import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navItems = ["Home"];

const sectionIds: Record<string, string> = {
  Home: "home",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => ({
        name: item,
        el: document.getElementById(sectionIds[item]),
      }));

      let current = "Home";
      for (const section of sections) {
        if (section.el) {
          const rect = section.el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = section.name;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (item: string) => {
    const id = sectionIds[item];
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
    setActiveSection(item);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-4 md:px-8">
        <button onClick={() => scrollTo("Home")} className="text-xl font-extrabold text-foreground tracking-tight uppercase">
          SOHEL
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="relative text-sm transition-colors duration-200 group py-1"
            >
              <span className={activeSection === item ? "text-primary" : "text-muted-foreground group-hover:text-primary"}>
                {item}
              </span>
              {activeSection === item && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground">
          {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border"
          >
            <div className="flex flex-col gap-4 p-6">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`text-left transition-colors ${
                    activeSection === item ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
