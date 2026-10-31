import { Aperture } from "lucide-react";
export function PageLoader() {
  return (
    <div className="min-h-[55vh] grid place-items-center" role="status">
      <div className="text-center">
        <Aperture
          className="animate-spin text-primary mx-auto mb-4"
          size={36}
        />
        <span className="text-sm opacity-60">Setting the scene…</span>
      </div>
    </div>
  );
}
export default function Skeleton({ count = 6 }) {
  return (
    <div className="studio-grid" aria-label="Loading studios" role="status">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="card bg-base-200 overflow-hidden">
          <div className="skeleton h-56 rounded-none" />
          <div className="p-5 space-y-4">
            <div className="skeleton h-5 w-3/4" />
            <div className="skeleton h-4 w-1/2" />
            <div className="skeleton h-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
