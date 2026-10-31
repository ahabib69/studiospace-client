"use client";
import Link from "next/link";
import { ArrowUpRight, Building2, CalendarDays, Plus } from "lucide-react";
import { useSession } from "./Providers";
export default function Dashboard() {
  const { user } = useSession();
  return (
    <div className="page">
      <p className="eyebrow mb-4">Your creative control room</p>
      <h1 className="heading mb-5">
        Good to see you, {user.name.split(" ")[0]}.
      </h1>
      <p className="muted mb-12">
        A home for your spaces, sessions and next big ideas.
      </p>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          [
            Building2,
            "My studio listings",
            "Manage the spaces you share with the community.",
            "/my-listings",
          ],
          [
            CalendarDays,
            "My bookings",
            "Check your reservations and manage pending requests.",
            "/my-bookings",
          ],
          [
            Plus,
            "Add a new studio",
            "Open your doors to something extraordinary.",
            "/add-studio",
          ],
        ].map(([Icon, title, text, href]) => (
          <Link
            href={href}
            key={href}
            className="panel hover:border-primary transition-colors"
          >
            <Icon className="text-primary mb-8" size={28} />
            <h2 className="text-xl mb-3">{title}</h2>
            <p className="muted text-sm leading-7 mb-6">{text}</p>
            <ArrowUpRight className="text-primary" size={19} />
          </Link>
        ))}
      </div>
    </div>
  );
}
