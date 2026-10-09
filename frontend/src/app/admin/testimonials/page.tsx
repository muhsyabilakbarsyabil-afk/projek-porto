"use client";

import { useEffect, useState } from "react";
import { fetchTestimonials } from "@/Data/api";
import { Testimonial } from "@/Data/mockData";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [error, setError] = useState("");
  useEffect(() => { fetchTestimonials().then(setTestimonials).catch((reason: Error) => setError(reason.message)); }, []);

  return <section className="space-y-6"><header><p className="text-sm text-emerald-400">Portfolio content</p><h2 className="mt-1 text-2xl font-semibold text-white">Testimonials</h2><p className="mt-2 text-sm text-gray-400">Published testimonials are read-only through the available API.</p></header>{error && <p role="alert" className="text-sm text-rose-400">{error}</p>}<div className="divide-y divide-gray-800 border-y border-gray-800">{testimonials.map((item) => <article key={item.id} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto]"><div><div className="mb-1 text-amber-400">{"★".repeat(Math.max(0, item.stars))}</div><blockquote className="max-w-3xl text-sm leading-6 text-gray-300">“{item.quote}”</blockquote><p className="mt-3 text-sm font-medium text-white">{item.name} <span className="font-normal text-gray-500">· {item.role}, {item.company}</span></p></div><span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm text-gray-300">{item.name.slice(0, 1)}</span></article>)}{!testimonials.length && !error && <p className="py-5 text-sm text-gray-500">Loading testimonials...</p>}</div></section>;
}
