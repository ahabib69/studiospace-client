"use client";
import Link from "next/link";
import { useState } from "react";
import { CalendarDays, Clock3, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { api, money } from "@/lib/api";
import { useData } from "@/hooks/useData";
import Modal from "./Modal";
import Skeleton from "./Skeleton";
import EmptyState from "./EmptyState";
const statusClass = {
  Pending: "text-warning",
  Confirmed: "text-success",
  Completed: "text-info",
  Cancelled: "opacity-50",
};
export default function MyBookings() {
  const { data, loading, error, reload } = useData("/my-bookings"),
    [selected, setSelected] = useState(null),
    [busy, setBusy] = useState(false);
  async function cancel() {
    setBusy(true);
    try {
      await api(`/bookings/${selected._id}/cancel`, { method: "PATCH" });
      toast.success("Your booking is cancelled.");
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
          <p className="eyebrow mb-4">Keep your creative calendar in focus</p>
          <h1 className="heading">My bookings.</h1>
        </div>
        <Link className="btn btn-outline btn-sm" href="/studios">
          Find another space <ArrowUpRight size={15} />
        </Link>
      </div>
      <p className="text-sm muted mb-8">
        Pending requests await host confirmation. Only Pending bookings can be
        cancelled here.
      </p>
      {loading ? (
        <Skeleton count={3} />
      ) : error ? (
        <EmptyState title="Your calendar couldn’t load" text={error}>
          <button className="btn btn-primary" onClick={reload}>
            Try again
          </button>
        </EmptyState>
      ) : !data?.length ? (
        <EmptyState
          title="Your next session is waiting"
          text="No reservations yet. Discover a space that brings your next project to life."
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {data.map((b) => (
            <article key={b._id} className="panel !p-5">
              <div className="flex gap-4 mb-5">
                <img
                  src={b.studioImage}
                  alt={b.studioTitle}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="min-w-0">
                  <span className={`status ${statusClass[b.status]}`}>
                    {b.status}
                  </span>
                  <h2 className="text-lg mt-3">
                    <Link href={`/studios/${b.studioId}`}>{b.studioTitle}</Link>
                  </h2>
                  <p className="hint">Reservation #{b._id.slice(-8)}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-5 text-xs muted border-y border-base-300 py-4">
                <span className="flex gap-2 items-center">
                  <CalendarDays size={14} />
                  {b.date}
                </span>
                <span className="flex gap-2 items-center">
                  <Clock3 size={14} />
                  {b.startTime}–{b.endTime} · studio local time
                </span>
              </div>
              <div className="flex justify-between items-center mt-5">
                <p className="text-sm">
                  Total{" "}
                  <strong className="text-primary ml-2">
                    {money(b.totalPrice)}
                  </strong>
                </p>
                {b.status === "Pending" && (
                  <button
                    onClick={() => setSelected(b)}
                    className="btn btn-outline btn-sm text-error"
                  >
                    Cancel Booking
                  </button>
                )}
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
        title="Cancel this session?"
      >
        <p className="text-sm muted mb-7 leading-7">
          Your request for{" "}
          <strong className="text-base-content">{selected?.studioTitle}</strong>{" "}
          on {selected?.date} will be marked Cancelled. You can always request
          another time.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="btn btn-ghost"
            disabled={busy}
            onClick={() => setSelected(null)}
          >
            Keep booking
          </button>
          <button className="btn btn-error" disabled={busy} onClick={cancel}>
            {busy ? "Cancelling…" : "Cancel booking"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
