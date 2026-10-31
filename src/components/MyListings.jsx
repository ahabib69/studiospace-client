"use client";
import Link from "next/link";
import { useState } from "react";
import { Plus, Pencil, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { api, money } from "@/lib/api";
import { useData } from "@/hooks/useData";
import Modal from "./Modal";
import Skeleton from "./Skeleton";
import EmptyState from "./EmptyState";
export default function MyListings() {
  const { data, loading, error, reload } = useData("/my-studios"),
    [selected, setSelected] = useState(null),
    [busy, setBusy] = useState(false);
  async function remove() {
    setBusy(true);
    try {
      await api(`/studios/${selected._id}`, { method: "DELETE" });
      toast.success("Studio deleted. Existing reservation records are kept.");
      setSelected(null);
      reload();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="page">
      <div className="section-head">
        <div>
          <p className="eyebrow mb-4">Your hosting corner</p>
          <h1 className="heading">My studio listings.</h1>
        </div>
        <Link className="btn btn-primary" href="/add-studio">
          <Plus size={16} />
          Add New Studio
        </Link>
      </div>
      {loading ? (
        <Skeleton count={3} />
      ) : error ? (
        <EmptyState title="We couldn’t load your spaces" text={error}>
          <button className="btn btn-primary" onClick={reload}>
            Try again
          </button>
        </EmptyState>
      ) : !data?.length ? (
        <EmptyState
          title="Your first space belongs here"
          text="Turn your quiet hours into someone’s creative breakthrough. Add a studio to get started."
          href="/add-studio"
          label="List your first studio"
        />
      ) : (
        <div className="space-y-4">
          {data.map((s) => (
            <article
              key={s._id}
              className="panel !p-4 flex flex-col sm:flex-row gap-5"
            >
              <Link href={`/studios/${s._id}`}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full sm:w-44 h-40 sm:h-32 object-cover rounded-lg"
                />
              </Link>
              <div className="flex-1 py-2">
                <p className="eyebrow mb-2">{s.category}</p>
                <Link href={`/studios/${s._id}`} className="text-xl">
                  {s.title}
                </Link>
                <p className="text-xs muted flex items-center gap-1 mt-3">
                  <MapPin size={13} />
                  {s.location}
                </p>
                <p className="text-sm text-primary mt-3">
                  {money(s.hourlyRate)} / hr
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  className="btn btn-outline btn-sm"
                  href={`/studios/edit/${s._id}`}
                >
                  <Pencil size={14} />
                  Update
                </Link>
                <button
                  className="btn btn-ghost btn-sm text-error"
                  onClick={() => setSelected(s)}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
      <Modal
        open={!!selected}
        onClose={() => {
          if (!busy) setSelected(null);
        }}
        title="Close this set?"
      >
        <p className="text-sm muted leading-7 mb-7">
          Delete{" "}
          <strong className="text-base-content">{selected?.title}</strong>? This
          removes the listing permanently. Existing booking records will stay in
          creators’ accounts.
        </p>
        <div className="flex justify-end gap-3">
          <button
            disabled={busy}
            className="btn btn-ghost"
            onClick={() => setSelected(null)}
          >
            Keep studio
          </button>
          <button disabled={busy} className="btn btn-error" onClick={remove}>
            {busy ? "Deleting…" : "Delete studio"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
