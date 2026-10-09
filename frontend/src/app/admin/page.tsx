"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DashboardStats, fetchDashboardStats } from "@/Data/api";

const sections = [
  { title: "Projects", href: "/admin/projects", description: "Browse portfolio projects." },
  { title: "Skills", href: "/admin/skills", description: "Manage skills and groups." },
  { title: "Certificates", href: "/admin/certificates", description: "Create, update, or remove certificates." },
  { title: "Testimonials", href: "/admin/testimonials", description: "Review published testimonials." },
  { title: "Messages", href: "/admin/messages", description: "Read messages submitted through the contact form." },
];

export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardStats().then(setStats).catch((reason: Error) => setError(reason.message));
  }, []);

  const metrics = stats
    ? [
        ["Projects", stats.total_projects],
        ["Skills", stats.total_skills],
        ["Certificates", stats.total_certificates],
        ["Testimonials", stats.total_testimonials],
        ["Messages", stats.total_messages],
        ["Unread messages", stats.unread_messages],
      ]
    : [];

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-medium text-emerald-400">Admin</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Dashboard</h2>
        <p className="mt-2 text-sm text-gray-400">Portfolio content and activity overview.</p>
      </div>

      {error && <p role="alert" className="mb-5 text-sm text-rose-400">{error}</p>}
      <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {metrics.map(([label, value]) => (
          <div key={label} className="border border-gray-800 bg-gray-900/60 p-4">
            <p className="text-xs text-gray-400">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
        {!stats && !error && <p className="col-span-full text-sm text-gray-400">Loading dashboard totals...</p>}
      </div>

      <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Content</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="border border-gray-800 bg-gray-900/60 p-5 transition-colors hover:border-emerald-500/50"
          >
            <h3 className="font-semibold text-white">{section.title}</h3>
            <p className="mt-2 text-sm text-gray-400">{section.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}