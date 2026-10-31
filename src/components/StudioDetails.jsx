"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper/modules";
import {
  MapPin,
  Star,
  Users,
  Check,
  ArrowLeft,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useData } from "@/hooks/useData";
import { money } from "@/lib/api";
import { useSession } from "./Providers";
import { PageLoader } from "./Skeleton";
import EmptyState from "./EmptyState";
import BookingModal from "./BookingModal";
export default function StudioDetails({ id }) {
  const { data: s, error, loading, reload } = useData(`/studios/${id}`),
    [open, setOpen] = useState(false),
    { user, loading: sessionLoading } = useSession(),
    router = useRouter();
  if (loading) return <PageLoader />;
  if (error || !s)
    return (
      <div className="page">
        <EmptyState
          title="This space is out of frame"
          text={error || "Studio not found."}
        >
          <button className="btn btn-outline mr-3" onClick={reload}>
            Retry
          </button>
          <Link className="btn btn-primary" href="/studios">
            Explore studios
          </Link>
        </EmptyState>
      </div>
    );
  const images = [...new Set([s.image, ...(s.gallery || [])])];
  function handleBooking() {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(`/studios/${id}`)}`);
      return;
    }
    setOpen(true);
  }
  return (
    <div className="page">
      <Link
        href="/studios"
        className="text-xs muted flex gap-2 items-center mb-8"
      >
        <ArrowLeft size={14} /> Back to all spaces
      </Link>
      <div className="section-head">
        <div>
          <span className="eyebrow">{s.category}</span>
          <h1 className="heading mt-3 mb-4">{s.title}</h1>
          <div className="flex flex-wrap gap-5 text-xs muted">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {s.location}
            </span>
            <span className="flex items-center gap-1">
              <Star size={13} className="text-primary" fill="currentColor" />
              {s.rating || "New"} · {s.reviews.length} reviews
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} /> Up to {s.maxCapacity} people
            </span>
          </div>
        </div>
      </div>
      <Swiper
        modules={[Pagination, Navigation, A11y]}
        pagination={{ clickable: true }}
        navigation={images.length > 1}
        className="rounded-2xl mb-12"
        style={{ "--swiper-theme-color": "#e9ae72" }}
      >
        {images.map((img, i) => (
          <SwiperSlide key={img}>
            <img
              src={img}
              alt={`${s.title}, view ${i + 1}`}
              className="w-full h-[280px] md:h-[520px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl mb-4 tracking-tight">Set the scene.</h2>
            <p className="muted leading-8 whitespace-pre-line text-sm">
              {s.overview}
            </p>
          </section>
          <section className="border-t border-base-300 pt-8">
            <h2 className="text-xl mb-5">What’s in the space</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {s.amenities.map((a) => (
                <p key={a} className="flex gap-3 text-sm">
                  <Check size={16} className="text-primary" />
                  {a}
                </p>
              ))}
            </div>
          </section>
          <section className="border-t border-base-300 pt-8">
            <h2 className="text-xl mb-5">Meet your host</h2>
            <div className="flex gap-4 items-center">
              <div className="rounded-full bg-base-200 w-14 h-14 grid place-items-center">
                <UserRound className="text-primary" />
              </div>
              <div>
                <h3>{s.ownerName}</h3>
                <a
                  className="text-xs muted break-all"
                  href={`mailto:${s.ownerEmail}`}
                >
                  {s.ownerEmail}
                </a>
              </div>
            </div>
            <p className="hint mt-4">
              Ask about equipment, accessibility and any special requirements
              before your session.
            </p>
          </section>
          <section className="border-t border-base-300 pt-8">
            <h2 className="text-xl mb-6">From the creative community</h2>
            {s.reviews.length ? (
              s.reviews.map((r, i) => (
                <div
                  key={i}
                  className="mb-6 rounded-xl border border-base-300 p-5"
                >
                  <div className="flex justify-between gap-3 text-sm mb-3">
                    <strong>{r.name}</strong>
                    <span className="text-primary">★ {r.rating}</span>
                  </div>
                  <p className="text-sm muted leading-7">{r.text}</p>
                  <p className="hint">{r.date}</p>
                </div>
              ))
            ) : (
              <p className="muted text-sm">
                A fresh space. Be the first to make memories here.
              </p>
            )}
          </section>
        </div>
        <aside>
          <div className="panel lg:sticky lg:top-28">
            <p className="text-3xl text-primary font-medium">
              {money(s.hourlyRate)}
              <span className="text-sm muted font-normal"> / hour</span>
            </p>
            <p className="muted text-xs mt-3 mb-6">
              Clear pricing. No creative compromises.
            </p>
            <div className="space-y-4 text-sm border-y border-base-300 py-5 mb-6">
              <div className="flex justify-between">
                <span className="muted">Maximum capacity</span>
                <span>{s.maxCapacity} people</span>
              </div>
              <div className="flex justify-between">
                <span className="muted">Security deposit</span>
                <span>{money(s.securityDeposit)}</span>
              </div>
            </div>
            <button
              onClick={handleBooking}
              disabled={sessionLoading}
              className="btn btn-primary w-full"
            >
              Book Workspace Now
            </button>
            <p className="hint text-center mt-4">
              You won’t be charged. Request starts as Pending.
            </p>
            <div className="flex gap-2 text-xs muted mt-6 pt-5 border-t border-base-300">
              <ShieldCheck size={19} className="shrink-0 text-primary" />
              <span>
                Confirm equipment and house rules with your host before you
                arrive.
              </span>
            </div>
          </div>
        </aside>
      </div>
      <BookingModal studio={s} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
