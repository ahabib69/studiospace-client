import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import { money } from "@/lib/api";
export default function StudioCard({ studio }) {
  return (
    <article className="studio-card group">
      <Link href={`/studios/${studio._id}`} className="studio-image">
        <img src={studio.image} alt={studio.title} loading="lazy" />
        <span className="category-pill">{studio.category}</span>
        <span className="rating-pill">
          <Star size={12} fill="currentColor" />
          {studio.rating ? studio.rating.toFixed(1) : "New"}
        </span>
      </Link>
      <div className="p-5 flex flex-col grow">
        <div className="flex justify-between gap-3 items-start">
          <h3 className="text-lg font-medium">
            <Link href={`/studios/${studio._id}`}>{studio.title}</Link>
          </h3>
          <p className="shrink-0 text-primary font-semibold">
            {money(studio.hourlyRate)}
            <span className="text-xs font-normal muted"> / hr</span>
          </p>
        </div>
        <p className="flex gap-1.5 items-center muted text-xs mt-3">
          <MapPin size={13} />
          {studio.location}
        </p>
        <Link href={`/studios/${studio._id}`} className="card-link">
          View Details <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}
