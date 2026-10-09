"use client";

import { FormEvent, useEffect, useState } from "react";
import { Certificate, createCertificate, deleteCertificate, fetchCertificates, updateCertificate } from "@/Data/api";

type CertificateForm = Omit<Certificate, "id">;
const emptyForm: CertificateForm = { title: "", issuer: "", date: "", credentialId: "", verificationUrl: "" };

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [form, setForm] = useState<CertificateForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    try { setCertificates(await fetchCertificates()); setError(""); }
    catch (reason) { setError((reason as Error).message); }
  }
  useEffect(() => {
    fetchCertificates()
      .then(setCertificates)
      .catch((reason: Error) => setError(reason.message));
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    try {
      if (editingId) await updateCertificate(editingId, form);
      else await createCertificate(form);
      setForm(emptyForm); setEditingId(null); await load();
    } catch (reason) { setError((reason as Error).message); }
    finally { setBusy(false); }
  }

  function edit(certificate: Certificate) {
    const { id, ...fields } = certificate;
    setEditingId(id); setForm(fields);
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this certificate?")) return;
    try { await deleteCertificate(id); await load(); }
    catch (reason) { setError((reason as Error).message); }
  }

  return (
    <section className="space-y-8">
      <header><p className="text-sm text-emerald-400">Portfolio content</p><h2 className="mt-1 text-2xl font-semibold text-white">Certificates</h2></header>
      {error && <p role="alert" className="text-sm text-rose-400">{error}</p>}
      <form onSubmit={submit} className="grid gap-4 border border-gray-800 bg-gray-900/50 p-5 md:grid-cols-2">
        <h3 className="md:col-span-2 font-medium text-white">{editingId ? "Edit certificate" : "Add certificate"}</h3>
        {([ ["title", "Title"], ["issuer", "Issuer"], ["date", "Date"], ["credentialId", "Credential ID"], ["verificationUrl", "Verification URL"] ] as const).map(([field, label]) => (
          <label key={field} className="grid gap-1.5 text-sm text-gray-300">
            {label}
            <input required={field === "title" || field === "issuer"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="min-w-0 border border-gray-700 bg-gray-950 px-3 py-2 text-white outline-none focus:border-emerald-500" />
          </label>
        ))}
        <div className="flex items-end gap-2 md:col-span-2">
          <button disabled={busy} className="bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50">{busy ? "Saving..." : editingId ? "Save changes" : "Add certificate"}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="border border-gray-700 px-4 py-2 text-sm text-gray-300">Cancel</button>}
        </div>
      </form>
      <div className="overflow-x-auto border border-gray-800">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-gray-900 text-xs uppercase text-gray-400"><tr><th className="p-3">Certificate</th><th className="p-3">Issuer</th><th className="p-3">Date</th><th className="p-3">Actions</th></tr></thead>
          <tbody>{certificates.map((certificate) => <tr key={certificate.id} className="border-t border-gray-800 text-gray-300"><td className="p-3 font-medium text-white">{certificate.title}</td><td className="p-3">{certificate.issuer}</td><td className="p-3">{certificate.date}</td><td className="p-3"><div className="flex gap-3"><button onClick={() => edit(certificate)} className="text-emerald-400 hover:text-emerald-300">Edit</button><button onClick={() => void remove(certificate.id)} className="text-rose-400 hover:text-rose-300">Delete</button></div></td></tr>)}</tbody>
        </table>
        {!certificates.length && <p className="p-4 text-sm text-gray-500">No certificates found.</p>}
      </div>
    </section>
  );
}
