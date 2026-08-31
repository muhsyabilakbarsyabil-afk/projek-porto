"use client";

import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Penjualan Toko Donat",
    category: "Web Dev",
    description: "Membantu mengembangkan website penjualan donat dengan fitur keranjang belanja dan pembayaran online.",
    tech: ["Next.js", "Node.js", "TypeScript"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/ecommerce",
  },
  {
    id: 2,
    title: "Aplikasi Konsultasi Kesehatan",
    category: "Mobile",
    description: "Aplikasi mobile untuk konsultasi kesehatan dengan fitur chat dan jadwal booking.",
    tech: ["React Native", "Next.js", "Firebase"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example/attendance",
  },
  
  
];

const categories = ["All", "Web Dev", "Mobile", "UI/UX"];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Projects</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Kumpulan proyek yang telah saya kerjakan dalam web development, mobile app, dan UI/UX design.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25"
                : "bg-gray-800/80 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 flex flex-col justify-between"
          >
            <div>
              <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider mb-2 block">
                {project.category}
              </span>
              <h3 className="text-xl font-bold text-white mb-3 hover:text-indigo-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs rounded-md bg-gray-800 text-gray-300 border border-gray-700/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-800/80">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors duration-300 flex items-center gap-1"
              >
                Live Demo <span>↗️</span>
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
              >
                GitHub <span>↗️</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}