"use client";
import PrivatePage from "@/components/PrivatePage";
import StudioForm from "@/components/StudioForm";
export default function AddStudio() {
  return (
    <PrivatePage>
      <div className="page max-w-4xl">
        <p className="eyebrow mb-4">Open your doors</p>
        <h1 className="heading mb-4">Make space for someone’s next idea.</h1>
        <p className="muted text-sm mb-10">
          A thoughtful listing helps the right creators find you.
        </p>
        <StudioForm />
      </div>
    </PrivatePage>
  );
}
