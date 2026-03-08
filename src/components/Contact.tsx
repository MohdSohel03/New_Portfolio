import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors";

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="subheading">Contact</p>
          <h2 className="heading-lg">Contact Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: FiMapPin, title: "Address", text: "Mumbai, India" },
            { icon: FiPhone, title: "Phone", text: "+91 XXXXX XXXXX" },
            { icon: FiMail, title: "Email", text: "sohel@example.com" },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 flex items-center justify-center rounded-full">
                <item.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass} maxLength={100} />
            <input type="email" placeholder="Your Email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass} maxLength={255} />
          </div>
          <input type="text" placeholder="Subject" value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className={inputClass} maxLength={200} />
          <textarea placeholder="Message" value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={6} className={`${inputClass} resize-none`} maxLength={1000} />
          <button type="submit" disabled={loading}
            className="px-8 py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50">
            <span className="flex items-center gap-2">
              <FiSend size={14} />
              {loading ? "Sending..." : "Send Message"}
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
