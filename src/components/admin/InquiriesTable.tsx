"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Inquiry = {
  id: number;
  name: string;
  phone: string;
  email: string;
  model: string;
  source?: string;
  status: string;
  created_at: string;
};

const statuses = ["new", "in_progress", "done", "archived"] as const;

export default function InquiriesTable({
  initial,
  initialFilter = "all",
}: {
  initial: Inquiry[];
  initialFilter?: string;
}) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState(initialFilter);
  const [q, setQ] = useState("");
  const [error, setError] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!term) return true;
      return (
        r.name.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term) ||
        r.phone.toLowerCase().includes(term) ||
        r.model.toLowerCase().includes(term) ||
        (r.source || "").toLowerCase().includes(term)
      );
    });
  }, [rows, filter, q]);

  async function setStatus(id: number, status: string) {
    setError("");
    const res = await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      setError("Failed to update status");
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    router.refresh();
  }

  async function remove(id: number) {
    if (!confirm("Delete this inquiry?")) return;
    setError("");
    const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete");
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
    router.refresh();
  }

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div
        data-tour="tour-inquiries-filters"
        className="space-y-3"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, phone, model or source…"
            className="w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["all", ...statuses].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize ${
                filter === s
                  ? "bg-[#3c2412] text-[#f5ebe0]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div
        data-tour="tour-inquiries-table"
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs tracking-wide text-gray-500 uppercase">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Contact</th>
                <th className="px-4 py-3 text-left font-medium">Door / interest</th>
                <th className="px-4 py-3 text-left font-medium">Opened from</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Received</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{row.name}</div>
                    <div className="text-xs text-gray-500">
                      {row.email || row.phone || "—"}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {row.model || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <span className="line-clamp-2 max-w-[14rem]">{row.source || "—"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={row.status}
                      onChange={(e) => setStatus(row.id, e.target.value)}
                      className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs capitalize"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(row.created_at + "Z").toLocaleString("en-GB")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/inquiries/${row.id}`}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                      >
                        Open
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(row.id)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    No inquiries match your search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
