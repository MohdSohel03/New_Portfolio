import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMapPin, FiPhone, FiSend as FiEmail, FiGlobe } from "react-icons/fi";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import emailjs from "@emailjs/browser";
import aboutPhoto from "@/assets/about-photo.png";

// EmailJS Configuration - Replace these with your actual values
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const contactInfo = [
  { icon: FiMapPin, title: "ADDRESS", text: "Mumbai, India" },
  { icon: FiPhone, title: "CONTACT NUMBER", text: "+91 XXXXX XXXXX" },
  { icon: FiEmail, title: "EMAIL ADDRESS", text: "sohel@example.com" },
  { icon: FiGlobe, title: "WEBSITE", text: "yoursite.com" },
];

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

    // Save to database
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || null,
      message: form.message.trim(),
    });

    if (error) {
      toast.error("Failed to send message. Please try again.");
      setLoading(false);
      return;
    }

    // Send email notification
    supabase.functions.invoke("send-contact-email", {
      body: {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || undefined,
        message: form.message.trim(),
      },
    }).catch((err) => console.error("Email notification failed:", err));

    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        {/* Header with watermark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-1">Contact Me</h2>
          <p className="text-4xl md:text-6xl font-extrabold text-muted-foreground/15 -mt-6 md:-mt-8 mb-4 select-none">
            Contact
          </p>
          <p className="text-muted-foreground max-w-xl mx-auto">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                <item.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 overflow-hidden rounded-lg shadow-xl"
        >
          {/* Left - Photo */}
          <div className="relative min-h-[300px] md:min-h-[500px] bg-background overflow-hidden">
            <img
              src={aboutPhoto}
              alt="Mohd Sohel Ansari"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right - Form */}
          <div className="bg-secondary p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">Contact Me</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="w-full px-5 py-4 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="w-full px-5 py-4 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                maxLength={200}
                className="w-full px-5 py-4 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <textarea
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                maxLength={1000}
                className="w-full px-5 py-4 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-vertical"
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
