import { Search, Clock3, CalendarCheck2, Clapperboard } from "lucide-react";
const steps = [
  [
    Search,
    "Discover Spaces",
    "Find a place that matches your vision, your crew and your budget.",
  ],
  [
    Clock3,
    "Select Shoot Hours",
    "Check confirmed availability and choose the time you need.",
  ],
  [
    CalendarCheck2,
    "Book Instantly",
    "Send your request with clear hourly pricing. It starts as Pending.",
  ],
  [
    Clapperboard,
    "Create & Produce",
    "Once your host confirms, show up and make something worth sharing.",
  ],
];
export default function Steps() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-9">
      {steps.map(([Icon, title, text], i) => (
        <div key={title} className="relative">
          <div className="flex items-center justify-between mb-6">
            <span className="w-12 h-12 rounded-full border border-base-300 grid place-items-center text-primary">
              <Icon size={20} strokeWidth={1.5} />
            </span>
            <span className="text-[11px] muted">0{i + 1}</span>
          </div>
          <h3 className="text-base mb-3">{title}</h3>
          <p className="text-sm leading-6 muted">{text}</p>
        </div>
      ))}
    </div>
  );
}
