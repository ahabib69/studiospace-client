"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { api, money, today } from "@/lib/api";
export default function BookingModal({ studio, open, onClose }) {
  const [date, setDate] = useState(today),
    [start, setStart] = useState("09:00"),
    [end, setEnd] = useState("10:00"),
    [busy, setBusy] = useState(false),
    [slots, setSlots] = useState([]),
    [checking, setChecking] = useState(false),
    [availabilityError, setAvailabilityError] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!open || !date) return;
    let active = true;
    setChecking(true);
    setAvailabilityError("");
    api(`/studios/${studio._id}/availability?date=${date}`)
      .then((s) => {
        if (active) setSlots(s);
      })
      .catch((e) => {
        if (active) setAvailabilityError(e.message);
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, [open, date, studio._id]);
  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  const hours = (toMinutes(end) - toMinutes(start)) / 60;
  const conflict = slots.some((s) => s.startTime < end && s.endTime > start);
  async function book(e) {
    e.preventDefault();
    if (date < today())
      return toast.error("The booking date cannot be in the past.");
    if (!(hours > 0)) return toast.error("End time must be after start time.");
    if (conflict)
      return toast.error(
        "This time slot is already booked. Please pick another time.",
      );
    setBusy(true);
    try {
      await api("/bookings", {
        method: "POST",
        body: JSON.stringify({
          studioId: studio._id,
          date,
          startTime: start,
          endTime: end,
        }),
      });
      toast.success("Booking requested. Your reservation is Pending.");
      onClose();
      router.push("/my-bookings");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal
      open={open}
      onClose={() => {
        if (!busy) onClose();
      }}
      title="Make time for your craft"
    >
      <p className="muted text-sm mb-6">
        {studio.title} · {money(studio.hourlyRate)} / hr
      </p>
      <form onSubmit={book} className="space-y-5">
        <label className="field">
          <span className="field-label">Session date</span>
          <input
            className="input input-bordered"
            type="date"
            min={today()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label>
            <span className="field-label">Start time</span>
            <input
              className="input input-bordered"
              type="time"
              step="900"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </label>
          <label>
            <span className="field-label">End time</span>
            <input
              className="input input-bordered"
              type="time"
              step="900"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="text-xs muted" aria-live="polite">
          {checking ? (
            "Checking confirmed reservations…"
          ) : availabilityError ? (
            <span className="text-error">
              {availabilityError} Please choose the date again.
            </span>
          ) : slots.length ? (
            <>
              Unavailable:{" "}
              {slots.map((s) => `${s.startTime}–${s.endTime}`).join(", ")}
            </>
          ) : (
            "No confirmed reservations for this date."
          )}
        </div>
        {conflict && (
          <p className="text-error text-sm">
            This time slot is already booked. Please pick another time.
          </p>
        )}
        <div className="rounded-xl bg-base-200 p-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="muted">
              {hours > 0 ? hours : 0} hours × {money(studio.hourlyRate)}
            </span>
            <strong>{money(hours > 0 ? hours * studio.hourlyRate : 0)}</strong>
          </div>
          <div className="border-t border-base-300 pt-3 flex justify-between">
            <span>Total rental price</span>
            <strong className="text-primary">
              {money(hours > 0 ? hours * studio.hourlyRate : 0)}
            </strong>
          </div>
          <p className="hint">
            Refundable security deposit: {money(studio.securityDeposit)},
            arranged directly with your host. Not charged by this demo.
          </p>
        </div>
        <p className="hint">
          Times are local to the studio. This creates a Pending request, not an
          instant confirmation. No payment is collected.
        </p>
        <button
          className="btn btn-primary w-full"
          disabled={
            busy || checking || !!availabilityError || conflict || !(hours > 0)
          }
        >
          {busy ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Confirm booking request"
          )}
        </button>
      </form>
    </Modal>
  );
}
