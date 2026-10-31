"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/api";
import { useData } from "@/hooks/useData";
import StudioCard from "./StudioCard";
import Skeleton from "./Skeleton";
import EmptyState from "./EmptyState";
export default function Explore() {
  const params = useSearchParams(),
    router = useRouter();
  const search = params.get("search") || "",
    category = params.get("category") || "",
    sort = params.get("sort") || "newest";
  const [query, setQuery] = useState(search);
  useEffect(() => {
    setQuery(search);
  }, [search]);
  const { data, error, loading, reload } = useData(
    `/studios?${params.toString()}`,
  );
  function update(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`/studios?${next}`, { scroll: false });
  }
  return (
    <div className="page">
      <p className="eyebrow mb-4">Your next great project starts here</p>
      <div className="section-head">
        <h1 className="heading">Spaces with possibility.</h1>
        <p className="muted text-sm">Find a little room for your big ideas.</p>
      </div>
      <div className="panel !p-4 mb-9 flex flex-col md:flex-row gap-3">
        <form
          className="relative flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            update("search", query.trim());
          }}
        >
          <Search className="absolute left-4 top-4 muted" size={18} />
          <input
            className="input input-bordered pl-11 pr-20"
            aria-label="Search by studio or city"
            placeholder="Search by studio or city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="absolute right-2 top-2 btn btn-ghost btn-sm">
            Search
          </button>
        </form>
        <div className="flex gap-3 md:w-[420px]">
          <select
            aria-label="Filter category"
            className="select select-bordered flex-1"
            value={category}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            aria-label="Sort studios"
            className="select select-bordered flex-1"
            value={sort}
            onChange={(e) => update("sort", e.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mb-6 text-xs muted">
        <span>
          {loading
            ? "Finding your spaces…"
            : `${data?.length || 0} spaces to make it happen`}
        </span>
        <span className="flex gap-2">
          <SlidersHorizontal size={14} /> Curated for creators
        </span>
      </div>
      {loading ? (
        <Skeleton />
      ) : error ? (
        <EmptyState title="We couldn’t load the studios" text={error}>
          <button onClick={reload} className="btn btn-primary">
            Try again
          </button>
        </EmptyState>
      ) : !data?.length ? (
        <EmptyState
          title="Nothing matches this frame"
          text="Try another city, clear your search or choose a different category."
        >
          <button
            className="btn btn-primary"
            onClick={() => router.replace("/studios")}
          >
            Clear all filters
          </button>
        </EmptyState>
      ) : (
        <div className="studio-grid">
          {data.map((s) => (
            <StudioCard key={s._id} studio={s} />
          ))}
        </div>
      )}
    </div>
  );
}
