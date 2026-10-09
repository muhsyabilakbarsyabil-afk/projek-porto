"use client";

import { useEffect, useState } from "react";
import { fetchProjects } from "@/Data/api";
import { Project } from "@/Data/mockData";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  useEffect(() => { fetchProjects().then(setProjects).catch((reason: Error) => setError(reason.message)); }, []);

  return <section className="space-y-6"><header><p className="text-sm text-emerald-400">Portfolio content</p><h2 className="mt-1 text-2xl font-semibold text-white">Projects</h2><p className="mt-2 text-sm text-gray-400">Projects are currently read-only through the available API.</p></header>{error && <p role="alert" className="text-sm text-rose-400">{error}</p>}<div className="overflow-x-auto border border-gray-800"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-gray-900 text-xs uppercase text-gray-400"><tr><th className="p-3">Project</th><th className="p-3">Category</th><th className="p-3">Technologies</th><th className="p-3">Links</th></tr></thead><tbody>{projects.map((project) => <tr key={project.id} className="border-t border-gray-800 text-gray-300"><td className="p-3"><p className="font-medium text-white">{project.title}</p><p className="mt-1 max-w-md text-xs text-gray-500">{project.description}</p></td><td className="p-3">{project.category}</td><td className="p-3">{project.tech.join(", ")}</td><td className="p-3"><div className="flex gap-3">{project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-emerald-400">Demo</a>}{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-gray-300">GitHub</a>}</div></td></tr>)}</tbody></table>{!projects.length && !error && <p className="p-4 text-sm text-gray-500">Loading projects...</p>}</div></section>;
}
