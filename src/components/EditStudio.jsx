"use client";
import { useData } from "@/hooks/useData";
import { useSession } from "./Providers";
import StudioForm from "./StudioForm";
import { PageLoader } from "./Skeleton";
import EmptyState from "./EmptyState";
export default function EditStudio({ id }) {
  const { data, loading, error } = useData(`/studios/${id}`),
    { user } = useSession();
  if (loading) return <PageLoader />;
  if (error || data?.ownerEmail !== user.email.toLowerCase())
    return (
      <div className="page">
        <EmptyState
          title="This isn’t one of your spaces"
          text={error || "Only a studio’s owner can edit this listing."}
          href="/my-listings"
          label="My listings"
        />
      </div>
    );
  return (
    <div className="page max-w-4xl">
      <p className="eyebrow mb-4">Keep your space in focus</p>
      <h1 className="heading mb-10">Update your studio.</h1>
      <StudioForm studio={data} />
    </div>
  );
}
