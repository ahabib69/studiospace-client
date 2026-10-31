"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Upload, ArrowUpRight } from "lucide-react";
import { api, categories } from "@/lib/api";
import { useSession } from "./Providers";
const amenityList = [
  "Natural light",
  "Wi-Fi",
  "Changing room",
  "Backdrops",
  "Blackout curtains",
  "Green room",
  "Loading access",
  "Air conditioning",
  "Microphones",
  "Acoustic treatment",
  "Audio interface",
  "Work tables",
  "Utility sink",
];
export default function StudioForm({ studio }) {
  const { user } = useSession(),
    router = useRouter();
  const [busy, setBusy] = useState(false),
    [uploading, setUploading] = useState(false),
    [image, setImage] = useState(studio?.image || ""),
    [amenities, setAmenities] = useState(studio?.amenities || []);
  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      file.size > 3 * 1024 * 1024
    ) {
      toast.error("Use a JPG, PNG or WebP image under 3 MB.");
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const result = await api("/uploads", { method: "POST", body: form });
      setImage(result.url);
      toast.success("Image uploaded.");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setUploading(false);
    }
  }
  async function submit(e) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const payload = {
      ...values,
      image,
      amenities,
      hourlyRate: Number(values.hourlyRate),
      securityDeposit: Number(values.securityDeposit),
      maxCapacity: Number(values.maxCapacity),
      gallery: values.gallery
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean),
    };
    setBusy(true);
    try {
      await api(studio ? `/studios/${studio._id}` : "/studios", {
        method: studio ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });
      toast.success(
        studio
          ? "Your studio is updated."
          : "Your space is live. Welcome, host!",
      );
      router.push("/my-listings");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="space-y-8" onSubmit={submit}>
      <section className="panel">
        <h2 className="text-xl mb-6">Tell us about your space</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <label className="field md:col-span-2">
            <span className="field-label">Studio title</span>
            <input
              name="title"
              className="input input-bordered"
              defaultValue={studio?.title}
              placeholder="The Daylight Loft"
              minLength={3}
              maxLength={120}
              required
            />
          </label>
          <label>
            <span className="field-label">Category</span>
            <select
              name="category"
              className="select select-bordered"
              defaultValue={studio?.category || categories[0]}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="field-label">Location</span>
            <input
              name="location"
              className="input input-bordered"
              placeholder="City, State"
              defaultValue={studio?.location}
              minLength={3}
              maxLength={200}
              required
            />
          </label>
          <label>
            <span className="field-label">Hourly rate (USD)</span>
            <input
              name="hourlyRate"
              className="input input-bordered"
              type="number"
              min="0.01"
              step="0.01"
              defaultValue={studio?.hourlyRate}
              required
            />
          </label>
          <label>
            <span className="field-label">Security deposit (USD)</span>
            <input
              name="securityDeposit"
              className="input input-bordered"
              type="number"
              min="0"
              step="0.01"
              defaultValue={studio?.securityDeposit ?? 0}
              required
            />
          </label>
          <label>
            <span className="field-label">Maximum capacity</span>
            <input
              name="maxCapacity"
              className="input input-bordered"
              type="number"
              min="1"
              step="1"
              defaultValue={studio?.maxCapacity}
              required
            />
          </label>
        </div>
      </section>
      <section className="panel">
        <h2 className="text-xl mb-6">Give creators a look inside</h2>
        <div className="space-y-5">
          <label>
            <span className="field-label">Cover image URL</span>
            <input
              type="url"
              className="input input-bordered"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              placeholder="https://…"
            />
          </label>
          <div className="flex flex-wrap gap-4 items-center">
            <label
              className={`btn btn-outline btn-sm ${uploading ? "pointer-events-none opacity-50" : ""}`}
            >
              <Upload size={15} />
              {uploading ? "Uploading…" : "Upload to imgbb"}
              <input
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                onChange={upload}
                disabled={uploading}
              />
            </label>
            <p className="text-xs muted">JPG, PNG or WebP · up to 3 MB</p>
          </div>
          {image && (
            <img
              src={image}
              alt="Your cover preview"
              className="w-full h-60 object-cover rounded-lg"
            />
          )}
          <label className="field">
            <span className="field-label">
              Gallery image URLs (one per line, up to 12)
            </span>
            <textarea
              name="gallery"
              className="textarea textarea-bordered h-28"
              defaultValue={studio?.gallery?.join("\n")}
              placeholder="https://…"
            />
          </label>
        </div>
      </section>
      <section className="panel">
        <h2 className="text-xl mb-6">The details that make a difference</h2>
        <fieldset>
          <legend className="field-label">Amenities</legend>
          <div className="flex flex-wrap gap-3 mb-7">
            {[...new Set([...amenityList, ...amenities])].map((a) => (
              <label
                key={a}
                className={`flex gap-2 items-center text-xs border rounded-lg p-3 cursor-pointer ${amenities.includes(a) ? "border-primary text-primary" : "border-base-300"}`}
              >
                <input
                  className="checkbox checkbox-xs checkbox-primary"
                  type="checkbox"
                  checked={amenities.includes(a)}
                  onChange={(e) =>
                    setAmenities(
                      e.target.checked
                        ? [...amenities, a]
                        : amenities.filter((x) => x !== a),
                    )
                  }
                />
                {a}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="field">
          <span className="field-label">Detailed overview</span>
          <textarea
            className="textarea textarea-bordered h-40"
            name="overview"
            minLength={3}
            maxLength={10000}
            required
            defaultValue={studio?.overview}
            placeholder="Describe the light, the layout, the equipment and what creators can make here."
          />
        </label>
      </section>
      <section className="panel">
        <h2 className="text-xl mb-6">Host information</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <label>
            <span className="field-label">Owner name</span>
            <input
              className="input input-bordered opacity-60"
              value={studio?.ownerName || user.name}
              readOnly
            />
          </label>
          <label>
            <span className="field-label">Owner email</span>
            <input
              className="input input-bordered opacity-60"
              value={studio?.ownerEmail || user.email}
              readOnly
            />
          </label>
        </div>
        <p className="hint mt-4">
          Your host identity comes from your account and cannot be changed here.
        </p>
      </section>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/my-listings")}
          className="btn btn-ghost"
        >
          Cancel
        </button>
        <button disabled={busy || uploading} className="btn btn-primary">
          {busy ? (
            <span className="loading loading-spinner loading-sm" />
          ) : studio ? (
            "Save changes"
          ) : (
            "Publish studio"
          )}
          <ArrowUpRight size={17} />
        </button>
      </div>
    </form>
  );
}
