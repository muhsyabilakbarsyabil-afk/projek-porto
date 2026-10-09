"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  AdminSkill,
  createSkillGroup,
  deleteSkill,
  fetchAdminSkills,
  fetchSkillGroups,
  saveSkill,
  SkillCategory,
} from "@/Data/api";

type SkillForm = { skill_group_id: number; name: string; level: string; percentage: number };
const blankSkill: SkillForm = { skill_group_id: 0, name: "", level: "", percentage: 0 };

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<AdminSkill[]>([]);
  const [groups, setGroups] = useState<SkillCategory[]>([]);
  const [form, setForm] = useState<SkillForm>(blankSkill);
  const [groupName, setGroupName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function load() {
    try {
      const [skillRows, categories] = await Promise.all([fetchAdminSkills(), fetchSkillGroups()]);
      setSkills(skillRows);
      setGroups(categories);
      setForm((current) => ({ ...current, skill_group_id: current.skill_group_id || categories[0]?.id || 0 }));
      setError("");
    } catch (reason) {
      setError((reason as Error).message);
    }
  }
  useEffect(() => {
    Promise.all([fetchAdminSkills(), fetchSkillGroups()])
      .then(([skillRows, categories]) => {
        setSkills(skillRows);
        setGroups(categories);
        setForm((current) => ({ ...current, skill_group_id: current.skill_group_id || categories[0]?.id || 0 }));
      })
      .catch((reason: Error) => setError(reason.message));
  }, []);

  async function submitSkill(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await saveSkill(form, editingId ?? undefined);
      setForm({ ...blankSkill, skill_group_id: groups[0]?.id ?? 0 });
      setEditingId(null);
      await load();
    } catch (reason) { setError((reason as Error).message); }
  }

  async function submitGroup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try { await createSkillGroup(groupName); setGroupName(""); await load(); }
    catch (reason) { setError((reason as Error).message); }
  }

  function edit(skill: AdminSkill) {
    setEditingId(skill.id);
    setForm({ skill_group_id: skill.skillGroupId, name: skill.name, level: skill.level, percentage: skill.percentage });
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this skill?")) return;
    try { await deleteSkill(id); await load(); }
    catch (reason) { setError((reason as Error).message); }
  }

  return (
    <section className="space-y-8">
      <header><p className="text-sm text-emerald-400">Portfolio content</p><h2 className="mt-1 text-2xl font-semibold text-white">Skills</h2></header>
      {error && <p role="alert" className="text-sm text-rose-400">{error}</p>}
      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <form onSubmit={submitSkill} className="grid gap-4 border border-gray-800 bg-gray-900/50 p-5 sm:grid-cols-2">
          <h3 className="sm:col-span-2 font-medium text-white">{editingId ? "Edit skill" : "Add skill"}</h3>
          <label className="grid gap-1.5 text-sm text-gray-300">Group<select required value={form.skill_group_id || ""} onChange={(event) => setForm({ ...form, skill_group_id: Number(event.target.value) })} className="border border-gray-700 bg-gray-950 px-3 py-2 text-white"><option value="" disabled>Select group</option>{groups.map((group) => <option key={group.id} value={group.id}>{group.title}</option>)}</select></label>
          <label className="grid gap-1.5 text-sm text-gray-300">Skill name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="border border-gray-700 bg-gray-950 px-3 py-2 text-white" /></label>
          <label className="grid gap-1.5 text-sm text-gray-300">Level<input required value={form.level} onChange={(event) => setForm({ ...form, level: event.target.value })} className="border border-gray-700 bg-gray-950 px-3 py-2 text-white" /></label>
          <label className="grid gap-1.5 text-sm text-gray-300">Proficiency (%)<input type="number" min="0" max="100" value={form.percentage} onChange={(event) => setForm({ ...form, percentage: Number(event.target.value) })} className="border border-gray-700 bg-gray-950 px-3 py-2 text-white" /></label>
          <div className="flex gap-2 sm:col-span-2"><button disabled={!groups.length} className="bg-emerald-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50">{editingId ? "Save changes" : "Add skill"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ ...blankSkill, skill_group_id: groups[0]?.id ?? 0 }); }} className="border border-gray-700 px-4 py-2 text-sm text-gray-300">Cancel</button>}</div>
        </form>
        <form onSubmit={submitGroup} className="flex h-fit flex-col gap-3 border border-gray-800 bg-gray-900/50 p-5">
          <h3 className="font-medium text-white">Add skill group</h3><label className="grid gap-1.5 text-sm text-gray-300">Group name<input required value={groupName} onChange={(event) => setGroupName(event.target.value)} className="border border-gray-700 bg-gray-950 px-3 py-2 text-white" /></label><button className="self-start border border-gray-700 px-4 py-2 text-sm text-gray-200 hover:border-emerald-500">Add group</button><p className="text-xs text-gray-500">{groups.length} groups available</p>
        </form>
      </div>
      <div className="overflow-x-auto border border-gray-800"><table className="w-full min-w-[650px] text-left text-sm"><thead className="bg-gray-900 text-xs uppercase text-gray-400"><tr><th className="p-3">Skill</th><th className="p-3">Group</th><th className="p-3">Level</th><th className="p-3">Progress</th><th className="p-3">Actions</th></tr></thead><tbody>{skills.map((skill) => <tr key={skill.id} className="border-t border-gray-800 text-gray-300"><td className="p-3 font-medium text-white">{skill.name}</td><td className="p-3">{skill.groupTitle}</td><td className="p-3">{skill.level}</td><td className="p-3">{skill.percentage}%</td><td className="p-3"><div className="flex gap-3"><button onClick={() => edit(skill)} className="text-emerald-400">Edit</button><button onClick={() => void remove(skill.id)} className="text-rose-400">Delete</button></div></td></tr>)}</tbody></table>{!skills.length && !error && <p className="p-4 text-sm text-gray-500">Loading skills...</p>}</div>
    </section>
  );
}
