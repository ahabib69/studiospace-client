"use client";
import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Clapperboard,
  Mic2,
  Music2,
  Paintbrush,
  ShieldCheck,
  BadgeCheck,
  Headphones,
  PackageCheck,
} from "lucide-react";
import Hero from "@/components/Hero";
import StudioCard from "@/components/StudioCard";
import Skeleton from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import Steps from "@/components/Steps";
import { useData } from "@/hooks/useData";
import { categories, categoryLabels } from "@/lib/api";
const icons = [Camera, Clapperboard, Mic2, Music2, Paintbrush];
export default function Home() {
  const { data, loading, error, reload } = useData("/studios/featured");
  return (
    <>
      <Hero />
      <div className="border-b border-base-300">
        <div className="shell py-6 flex flex-wrap justify-between gap-4 text-[10px] md:text-xs uppercase tracking-[.12em] muted">
          <span>Space for every kind of creator</span>
          <span>Independent spaces · Real possibilities</span>
          <span className="hidden md:block">
            Book by the hour. Create without limits.
          </span>
        </div>
      </div>
      <section className="shell section">
        <div className="section-head">
          <div>
            <p className="eyebrow mb-3">
              The spaces we can’t stop thinking about
            </p>
            <h2 className="heading">Find your next creative home.</h2>
          </div>
          <Link href="/studios" className="btn btn-outline btn-sm">
            View all studios <ArrowUpRight size={15} />
          </Link>
        </div>
        {loading ? (
          <Skeleton />
        ) : error ? (
          <EmptyState title="The studios are taking a moment" text={error}>
            <button className="btn btn-primary" onClick={reload}>
              Try again
            </button>
          </EmptyState>
        ) : !data?.length ? (
          <EmptyState
            title="The next great space is on its way"
            text="Our hosts are getting their spaces ready. Check back soon."
          />
        ) : (
          <div className="studio-grid">
            {data.map((s) => (
              <StudioCard key={s._id} studio={s} />
            ))}
          </div>
        )}
      </section>
      <section className="shell pb-20">
        <div className="section-head">
          <div>
            <p className="eyebrow mb-3">
              Different crafts. Same creative energy.
            </p>
            <h2 className="heading">What are you making?</h2>
          </div>
          <p className="muted text-sm">A place for every possibility.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {categories.map((c, i) => {
            const Icon = icons[i];
            return (
              <Link
                className="group bg-base-200/60 border border-base-300 rounded-xl p-6 hover:border-primary transition-colors"
                href={`/studios?category=${encodeURIComponent(c)}`}
                key={c}
              >
                <Icon
                  size={28}
                  strokeWidth={1.3}
                  className="text-primary mb-7"
                />
                <h3 className="text-sm mb-2">{categoryLabels[i]}</h3>
                <span className="text-[10px] muted flex justify-between">
                  Find your space <ArrowUpRight size={13} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="bg-base-200/50 border-y border-base-300">
        <div className="shell section">
          <div className="section-head mb-12">
            <div>
              <p className="eyebrow mb-3">Less logistics. More creating.</p>
              <h2 className="heading">From idea to “that’s a wrap.”</h2>
            </div>
            <Link href="/how-it-works" className="text-xs flex gap-2">
              How booking works <ArrowUpRight size={15} />
            </Link>
          </div>
          <Steps />
        </div>
      </section>
      <section className="shell section grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <img
            className="rounded-xl w-full h-[420px] object-cover"
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1100&q=85"
            alt="A comfortable shared creative workspace"
            loading="lazy"
          />
          <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-black/60 text-white p-5 rounded-lg flex gap-4 items-center">
            <ShieldCheck className="text-[#e9ae72]" size={32} />
            <div>
              <h3 className="text-sm">Your craft. Our commitment.</h3>
              <p className="text-xs text-white/65 mt-1">
                Thoughtful spaces, people-first support.
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4">Host guarantee & creator support</p>
          <h2 className="heading mb-6">
            Good work starts
            <br />
            with peace of mind.
          </h2>
          <p className="muted text-sm leading-7 mb-7">
            The best sessions happen when you can focus on your craft. We help
            hosts and creators set clear expectations before the first light
            switches on.
          </p>
          <div className="grid sm:grid-cols-2 gap-7">
            {[
              [
                ShieldCheck,
                "Liability protection",
                "Clear guidance on insurance and studio responsibilities.",
              ],
              [
                BadgeCheck,
                "Verified profiles",
                "Account-based bookings and identifiable hosts.",
              ],
              [
                PackageCheck,
                "Equipment safety",
                "Agree on gear, access and safety before your session.",
              ],
              [
                Headphones,
                "24/7 host support",
                "Send a support request any time; hosts set their response hours.",
              ],
            ].map(([Icon, title, text]) => (
              <div key={title}>
                <Icon size={20} className="text-primary mb-3" />
                <h3 className="text-sm mb-2">{title}</h3>
                <p className="text-xs muted leading-5">{text}</p>
              </div>
            ))}
          </div>
          <p className="hint mt-7">
            Student project: no insurance coverage or live support service is
            provided.{" "}
            <Link className="underline" href="/terms">
              Read the terms
            </Link>
            .
          </p>
        </div>
      </section>
      <section className="shell pb-20">
        <div className="rounded-2xl bg-primary text-primary-content p-8 md:p-12 flex flex-wrap justify-between items-center gap-8">
          <div>
            <p className="text-[10px] uppercase tracking-widest mb-3 opacity-70">
              Your empty hours. Someone’s next big thing.
            </p>
            <h2 className="text-3xl md:text-4xl tracking-tight">
              Have a space worth sharing?
            </h2>
            <p className="text-sm mt-3 opacity-75">
              Open your doors to your local creative community.
            </p>
          </div>
          <Link
            href="/add-studio"
            className="btn bg-[#20231c] text-[#f1eee5] border-0 hover:bg-[#34372e]"
          >
            Become a host <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
