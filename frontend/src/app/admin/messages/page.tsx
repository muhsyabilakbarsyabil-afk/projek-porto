"use client";

import { useEffect, useState } from "react";
import { ContactMessage, fetchAdminMessages } from "@/Data/api";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [error, setError] = useState("");
  useEffect(() => { fetchAdminMessages().then((items) => { setMessages(items); setSelected(items[0] ?? null); }).catch((reason: Error) => setError(reason.message)); }, []);

  return <section className="space-y-6"><header><p className="text-sm text-emerald-400">Inbox</p><h2 className="mt-1 text-2xl font-semibold text-white">Messages</h2><p className="mt-2 text-sm text-gray-400">Messages can be read here; the available API does not expose deletion or read-status updates.</p></header>{error && <p role="alert" className="text-sm text-rose-400">{error}</p>}<div className="grid min-h-[420px] border border-gray-800 lg:grid-cols-[minmax(240px,0.8fr)_2fr]"><div className="divide-y divide-gray-800 border-b border-gray-800 lg:border-b-0 lg:border-r">{messages.map((message) => <button key={message.id} onClick={() => setSelected(message)} className={`block w-full p-4 text-left hover:bg-gray-900 ${selected?.id === message.id ? "bg-gray-900" : ""}`}><span className="flex items-center justify-between gap-3"><span className="truncate text-sm font-medium text-white">{message.name}</span>{!message.is_read && <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-label="Unread" />}</span><span className="mt-1 block truncate text-xs text-gray-500">{message.subject || message.email}</span><span className="mt-2 block text-[11px] text-gray-600">{new Date(message.created_at).toLocaleString("id-ID")}</span></button>)}{!messages.length && !error && <p className="p-4 text-sm text-gray-500">Loading messages...</p>}</div><article className="p-5 sm:p-7">{selected ? <><p className="text-xs text-gray-500">{new Date(selected.created_at).toLocaleString("id-ID")}</p><h3 className="mt-2 text-xl font-semibold text-white">{selected.subject || "No subject"}</h3><p className="mt-2 text-sm text-emerald-400">{selected.name} · <a href={`mailto:${selected.email}`} className="underline">{selected.email}</a></p><p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-gray-300">{selected.message}</p></> : <p className="text-sm text-gray-500">Select a message to read it.</p>}</article></div></section>;
}
