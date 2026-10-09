"use client";

import Link from "next/link";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const adminLinks = [
  ["Dashboard", "/admin"],
  ["Projects", "/admin/projects"],
  ["Skills", "/admin/skills"],
  ["Certificates", "/admin/certificates"],
  ["Testimonials", "/admin/testimonials"],
  ["Messages", "/admin/messages"],
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Backdrop overlay untuk layar HP/mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <span className="text-lg font-bold text-white">Admin Panel</span>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {adminLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}