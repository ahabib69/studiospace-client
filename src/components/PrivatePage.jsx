"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "./Providers";
import { PageLoader } from "./Skeleton";
import EmptyState from "./EmptyState";
export default function PrivatePage({ children }) {
  const { user, loading, error, refetch } = useSession();
  const router = useRouter(),
    path = usePathname();
  useEffect(() => {
    if (!loading && !user && !error)
      router.replace(`/login?next=${encodeURIComponent(path)}`);
  }, [loading, user, error, path, router]);
  if (loading) return <PageLoader />;
  if (error)
    return (
      <EmptyState title="We couldn’t check your session" text={error}>
        <button className="btn btn-primary" onClick={() => refetch()}>
          Try again
        </button>
      </EmptyState>
    );
  if (!user) return <PageLoader />;
  return children;
}
