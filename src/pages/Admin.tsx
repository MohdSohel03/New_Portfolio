import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FiPlus, FiTrash2, FiSave, FiLogOut } from "react-icons/fi";

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

interface Skill {
  id: string;
  name: string;
  percentage: number;
  sort_order: number;
}

const Admin = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"projects" | "skills">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: p }, { data: s }] = await Promise.all([
      supabase.from("projects").select("*").order("sort_order"),
      supabase.from("skills").select("*").order("sort_order"),
    ]);
    setProjects(p || []);
    setSkills(s || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  // Project CRUD
  const addProject = async () => {
    const { data, error } = await supabase.from("projects").insert({
      title: "New Project",
      description: "Project description",
      tech: [],
      sort_order: projects.length,
    }).select().single();
    if (error) { toast.error("Failed to add project"); return; }
    if (data) setProjects([...projects, data]);
    toast.success("Project added");
  };

  const updateProject = async (project: Project) => {
    const { error } = await supabase.from("projects").update({
      title: project.title,
      description: project.description,
      tech: project.tech,
      github_url: project.github_url,
      live_url: project.live_url,
      image_url: project.image_url,
      sort_order: project.sort_order,
    }).eq("id", project.id);
    if (error) { toast.error("Failed to update"); return; }
    toast.success("Project updated");
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    setProjects(projects.filter(p => p.id !== id));
    toast.success("Project deleted");
  };

  // Skill CRUD
  const addSkill = async () => {
    const { data, error } = await supabase.from("skills").insert({
      name: "New Skill",
      percentage: 50,
      sort_order: skills.length,
    }).select().single();
    if (error) { toast.error("Failed to add skill"); return; }
    if (data) setSkills([...skills, data]);
    toast.success("Skill added");
  };

  const updateSkill = async (skill: Skill) => {
    const { error } = await supabase.from("skills").update({
      name: skill.name,
      percentage: skill.percentage,
      sort_order: skill.sort_order,
    }).eq("id", skill.id);
    if (error) { toast.error("Failed to update"); return; }
    toast.success("Skill updated");
  };

  const deleteSkill = async (id: string) => {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) { toast.error("Failed to delete"); return; }
    setSkills(skills.filter(s => s.id !== id));
    toast.success("Skill deleted");
  };

  const setProjectField = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const setSkillField = (id: string, field: keyof Skill, value: any) => {
    setSkills(skills.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto max-w-5xl flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex gap-3">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Back to site
            </a>
            <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors">
              <FiLogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-secondary rounded-md p-1 w-fit">
          <button
            onClick={() => setTab("projects")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === "projects" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setTab("skills")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === "skills" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Skills ({skills.length})
          </button>
        </div>

        {/* Projects Tab */}
        {tab === "projects" && (
          <div className="space-y-4">
            <button onClick={addProject} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:opacity-90">
              <FiPlus size={14} /> Add Project
            </button>
            {projects.map(project => (
              <div key={project.id} className="bg-secondary rounded-lg p-5 space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    value={project.title}
                    onChange={e => setProjectField(project.id, "title", e.target.value)}
                    placeholder="Title"
                    className="px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                  <input
                    value={project.tech.join(", ")}
                    onChange={e => setProjectField(project.id, "tech", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                    placeholder="Tech (comma-separated)"
                    className="px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <textarea
                  value={project.description}
                  onChange={e => setProjectField(project.id, "description", e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:border-primary resize-vertical"
                />
                <div className="grid md:grid-cols-3 gap-3">
                  <input
                    value={project.github_url || ""}
                    onChange={e => setProjectField(project.id, "github_url", e.target.value || null)}
                    placeholder="GitHub URL"
                    className="px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                  <input
                    value={project.live_url || ""}
                    onChange={e => setProjectField(project.id, "live_url", e.target.value || null)}
                    placeholder="Live URL"
                    className="px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                  <input
                    value={project.image_url || ""}
                    onChange={e => setProjectField(project.id, "image_url", e.target.value || null)}
                    placeholder="Image URL"
                    className="px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs text-muted-foreground">Order:</label>
                  <input
                    type="number"
                    value={project.sort_order}
                    onChange={e => setProjectField(project.id, "sort_order", parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                  <div className="flex-1" />
                  <button onClick={() => updateProject(project)} className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground text-xs rounded-md hover:opacity-90">
                    <FiSave size={12} /> Save
                  </button>
                  <button onClick={() => deleteProject(project.id)} className="flex items-center gap-1 px-3 py-2 bg-destructive text-destructive-foreground text-xs rounded-md hover:opacity-90">
                    <FiTrash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Tab */}
        {tab === "skills" && (
          <div className="space-y-4">
            <button onClick={addSkill} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:opacity-90">
              <FiPlus size={14} /> Add Skill
            </button>
            {skills.map(skill => (
              <div key={skill.id} className="bg-secondary rounded-lg p-4 flex flex-wrap items-center gap-3">
                <input
                  value={skill.name}
                  onChange={e => setSkillField(skill.id, "name", e.target.value)}
                  placeholder="Skill name"
                  className="flex-1 min-w-[150px] px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:border-primary"
                />
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground">%:</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={skill.percentage}
                    onChange={e => setSkillField(skill.id, "percentage", parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-muted-foreground">Order:</label>
                  <input
                    type="number"
                    value={skill.sort_order}
                    onChange={e => setSkillField(skill.id, "sort_order", parseInt(e.target.value) || 0)}
                    className="w-20 px-3 py-2 bg-background border border-border rounded-md text-foreground text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <button onClick={() => updateSkill(skill)} className="flex items-center gap-1 px-3 py-2 bg-primary text-primary-foreground text-xs rounded-md hover:opacity-90">
                  <FiSave size={12} /> Save
                </button>
                <button onClick={() => deleteSkill(skill.id)} className="flex items-center gap-1 px-3 py-2 bg-destructive text-destructive-foreground text-xs rounded-md hover:opacity-90">
                  <FiTrash2 size={12} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
