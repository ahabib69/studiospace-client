"use client";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
export default function Modal({ open, onClose, title, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className="modal"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-label={title}
    >
      <div className="modal-box bg-base-100">
        <div className="flex justify-between items-center gap-5 mb-6">
          <h2 className="text-2xl">{title}</h2>
          <button
            type="button"
            className="btn btn-ghost btn-circle btn-sm"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
