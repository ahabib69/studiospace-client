"use client";
import EmptyState from "@/components/EmptyState";
export default function ErrorPage({ reset }) {
  return (
    <div className="page">
      <EmptyState
        title="A little technical difficulty"
        text="Your work deserves a smooth session. Please try loading this page again."
      >
        <button onClick={reset} className="btn btn-primary">
          Try again
        </button>
      </EmptyState>
    </div>
  );
}
