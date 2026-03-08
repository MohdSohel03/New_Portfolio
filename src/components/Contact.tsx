import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { toast } from "sonner";
import aboutPhoto from "@/assets/about-photo.png";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="subheading">Contact</p>
          <h2 className="heading-lg">Contact Me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 overflow-hidden rounded-lg shadow-xl"
        >
          {/* Left - Photo on dark background */}
          <div className="relative min-h-[300px] md:min-h-[500px] bg-background overflow-hidden">
            <img
              src={aboutPhoto}
              alt="Mohd Sohel Ansari"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right - Form on light background */}
          <div className="bg-[hsl(210,30%,96%)] p-8 md:p-12 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-md text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-md text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                maxLength={200}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-md text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <textarea
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                maxLength={1000}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-md text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none focus:border-primary transition-colors resize-vertical"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3 bg-primary text-primary-foreground font-semibold text-sm uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  <FiSend size={14} />
                  {loading ? "Sending..." : "Send Message"}
                </span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
