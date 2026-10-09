const API_BASE = "http://localhost:5000/api"; // Sesuaikan URL backend kamu

import type { Project, SkillGroup, Testimonial } from "./mockData";

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
}

function mapCertificate(certificate: Record<string, unknown>): Certificate {
  return {
    id: Number(certificate.id),
    title: String(certificate.title ?? ""),
    issuer: String(certificate.issuer ?? ""),
    date: String(certificate.date ?? ""),
    credentialId: String(certificate.credentialId ?? certificate.credential_id ?? ""),
    verificationUrl: String(certificate.verificationUrl ?? certificate.verification_url ?? ""),
  };
}

export async function fetchCertificates(): Promise<Certificate[]> {
  const response = await fetch(`${API_BASE}/certificates`, { cache: "no-store" });
  const json = await response.json();
  if (!response.ok || !json.success) throw new Error(json.message || "Gagal mengambil data sertifikat");
  return json.data.map(mapCertificate);
}

export async function fetchCertificateById(id: number | string): Promise<Certificate> {
  const response = await fetch(`${API_BASE}/certificates/${id}`, { cache: "no-store" });
  const json = await response.json();
  if (!response.ok || !json.success) throw new Error(json.message || "Gagal mengambil detail sertifikat");
  return mapCertificate(json.data);
}

export async function createCertificate(data: Omit<Certificate, "id">): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE}/certificates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (!response.ok || !json.success) throw new Error(json.message || "Gagal menambahkan sertifikat");
  return json;
}

export async function updateCertificate(id: number | string, data: Partial<Certificate>): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE}/certificates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (!response.ok || !json.success) throw new Error(json.message || "Gagal memperbarui sertifikat");
  return json;
}

export async function deleteCertificate(id: number | string): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE}/certificates/${id}`, { method: "DELETE" });
  const json = await response.json();
  if (!response.ok || !json.success) throw new Error(json.message || "Gagal menghapus sertifikat");
  return json;
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE}/projects`, { cache: "no-store" });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.message || "Gagal mengambil data proyek");
  }

  return json.data.map((project: Record<string, unknown>) => ({
    id: Number(project.id),
    title: String(project.title ?? ""),
    category: String(project.category ?? ""),
    description: String(project.description ?? ""),
    tech: Array.isArray(project.tech)
      ? project.tech.map(String)
      : typeof project.tech === "string"
        ? JSON.parse(project.tech)
        : [],
    demoUrl: String(project.demoUrl ?? project.demo_url ?? ""),
    githubUrl: String(project.githubUrl ?? project.github_url ?? ""),
  }));
}

async function readApiResponse<T>(response: Response): Promise<T> {
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.message || "Permintaan API gagal");
  }
  return json.data as T;
}

export async function fetchSkills(): Promise<SkillGroup[]> {
  const response = await fetch(`${API_BASE}/skills`, { cache: "no-store" });
  const skills = await readApiResponse<Array<Record<string, unknown>>>(response);
  const groups = new Map<number, SkillGroup>();

  for (const skill of skills) {
    const groupId = Number(skill.skill_group_id);
    let group = groups.get(groupId);
    if (!group) {
      group = {
        title: String(skill.group_title ?? "Skills"),
        icon: String(skill.group_icon ?? "💡"),
        skills: [],
      };
      groups.set(groupId, group);
    }
    group.skills.push({
      name: String(skill.name ?? ""),
      level: String(skill.level ?? ""),
      percentage: Number(skill.percentage ?? 0),
    });
  }

  return [...groups.values()];
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const response = await fetch(`${API_BASE}/testimonials`, { cache: "no-store" });
  const testimonials = await readApiResponse<Array<Record<string, unknown>>>(response);
  return testimonials.map((testimonial) => ({
    id: Number(testimonial.id),
    name: String(testimonial.name ?? ""),
    role: String(testimonial.role ?? ""),
    company: String(testimonial.company ?? ""),
    avatar: String(testimonial.avatar ?? testimonial.photo_url ?? ""),
    stars: Number(testimonial.stars ?? 5),
    quote: String(testimonial.quote ?? testimonial.message ?? ""),
  }));
}

export async function sendContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  if (!response.ok || !json.success) {
    throw new Error(json.message || "Gagal mengirim pesan");
  }
  return json;
}

export interface AdminSkill {
  id: number;
  skillGroupId: number;
  groupTitle: string;
  name: string;
  level: string;
  percentage: number;
}

export interface SkillCategory {
  id: number;
  title: string;
  icon: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean | number;
  created_at: string;
}

export interface DashboardStats {
  total_projects: number;
  total_skills: number;
  total_certificates: number;
  total_testimonials: number;
  total_messages: number;
  unread_messages: number;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE}/dashboard/stats`, { cache: "no-store" });
  return readApiResponse<DashboardStats>(response);
}

export async function fetchAdminSkills(): Promise<AdminSkill[]> {
  const response = await fetch(`${API_BASE}/skills`, { cache: "no-store" });
  const skills = await readApiResponse<Array<Record<string, unknown>>>(response);
  return skills.map((skill) => ({
    id: Number(skill.id),
    skillGroupId: Number(skill.skill_group_id),
    groupTitle: String(skill.group_title ?? ""),
    name: String(skill.name ?? ""),
    level: String(skill.level ?? ""),
    percentage: Number(skill.percentage ?? 0),
  }));
}

export async function fetchSkillGroups(): Promise<SkillCategory[]> {
  const response = await fetch(`${API_BASE}/skills/groups`, { cache: "no-store" });
  return readApiResponse<SkillCategory[]>(response);
}

export async function saveSkill(
  data: { skill_group_id: number; name: string; level: string; percentage: number },
  id?: number,
): Promise<void> {
  const response = await fetch(`${API_BASE}/skills${id ? `/${id}` : ""}`, {
    method: id ? "PUT" : "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  await readApiResponse<unknown>(response);
}

export async function deleteSkill(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/skills/${id}`, { method: "DELETE" });
  await readApiResponse<unknown>(response);
}

export async function createSkillGroup(title: string): Promise<void> {
  const response = await fetch(`${API_BASE}/skills/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  await readApiResponse<unknown>(response);
}

export async function fetchAdminMessages(): Promise<ContactMessage[]> {
  const response = await fetch(`${API_BASE}/messages`, { cache: "no-store" });
  return readApiResponse<ContactMessage[]>(response);
}