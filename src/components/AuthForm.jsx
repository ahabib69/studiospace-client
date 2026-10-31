"use client";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Aperture, ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth";
import { api } from "@/lib/api";
export default function AuthForm({ register = false }) {
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [visible, setVisible] = useState(false);
  const params = useSearchParams(),
    router = useRouter();
  const requested = params.get("next"),
    next =
      requested?.startsWith("/") &&
      !requested.startsWith("//") &&
      !requested.includes("\\")
        ? requested
        : "/";
  async function submit(e) {
    e.preventDefault();
    setError("");
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (
      register &&
      (values.password.length < 6 ||
        !/[A-Z]/.test(values.password) ||
        !/[a-z]/.test(values.password))
    ) {
      setError(
        "Password must have an uppercase letter, a lowercase letter, and be at least 6 characters.",
      );
      return;
    }
    setBusy(true);
    try {
      const result = register
        ? await authClient.signUp.email({
            name: values.name,
            email: values.email.trim().toLowerCase(),
            password: values.password,
            image: values.image,
          })
        : await authClient.signIn.email({
            email: values.email.trim().toLowerCase(),
            password: values.password,
          });
      if (result.error)
        throw new Error(result.error.message || "Please check your details.");
      if (register) {
        await authClient.signOut();
        toast.success("Your account is ready. Please log in.");
        router.push(
          `/login${requested ? `?next=${encodeURIComponent(next)}` : ""}`,
        );
      } else {
        await api("/token", { method: "POST" });
        toast.success("Welcome back. Let’s make something.");
        router.replace(next);
        router.refresh();
      }
    } catch (e) {
      setError(e.message);
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function google() {
    setBusy(true);
    setError("");
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}${next}`,
        errorCallbackURL: `${window.location.origin}/login?error=google`,
      });
      if (result.error) throw new Error(result.error.message);
    } catch (e) {
      toast.error(e.message || "Google login is not configured.");
      setBusy(false);
    }
  }
  return (
    <div className="shell py-12 md:py-20 grid lg:grid-cols-2 gap-12 items-center max-w-6xl">
      <div className="hidden lg:block relative rounded-2xl overflow-hidden h-[680px]">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85"
          className="w-full h-full object-cover"
          alt="Sunlight falling into a creative studio"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
        <div className="absolute bottom-12 left-10 right-10 text-white">
          <Aperture size={38} className="text-[#e9ae72] mb-6" />
          <h2 className="text-4xl tracking-tight leading-tight">
            A little space.
            <br />A lot of possibility.
          </h2>
          <p className="text-sm text-white/65 mt-5 leading-7">
            Join a community of people who turn blank rooms into something
            extraordinary.
          </p>
        </div>
      </div>
      <div className="w-full max-w-md mx-auto">
        <p className="eyebrow mb-4">
          {register
            ? "Your next chapter starts here"
            : "Back to your creative space"}
        </p>
        <h1 className="heading mb-3">
          {register ? "Let’s make room." : "Welcome back."}
        </h1>
        <p className="muted text-sm mb-8">
          {register
            ? "Create an account. Find your people. Make your thing."
            : "Your next great idea is waiting for the right space."}
        </p>
        <form className="space-y-5" onSubmit={submit}>
          {register && (
            <>
              <label className="field">
                <span className="field-label">Full name</span>
                <input
                  name="name"
                  autoComplete="name"
                  className="input input-bordered"
                  required
                  minLength={2}
                />
              </label>
              <label className="field">
                <span className="field-label">Photo URL</span>
                <input
                  name="image"
                  type="url"
                  className="input input-bordered"
                  placeholder="https://…"
                  required
                />
              </label>
            </>
          )}
          <label className="field">
            <span className="field-label">Email address</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="input input-bordered"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="field">
            <span className="field-label">Password</span>
            <div className="relative">
              <input
                name="password"
                type={visible ? "text" : "password"}
                autoComplete={register ? "new-password" : "current-password"}
                className="input input-bordered pr-12"
                required
                aria-describedby={error ? "auth-error" : undefined}
              />
              <button
                type="button"
                className="absolute right-3 top-3.5 muted"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? "Hide password" : "Show password"}
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {register && (
              <p className="hint">
                At least 6 characters, one uppercase and one lowercase letter.
              </p>
            )}
          </label>
          {(error || params.get("error")) && (
            <p id="auth-error" className="text-sm text-error" role="alert">
              {error ||
                "Google sign-in did not finish. Please try again or use email."}
            </p>
          )}
          <button disabled={busy} className="btn btn-primary w-full">
            {busy ? (
              <span className="loading loading-spinner loading-sm" />
            ) : register ? (
              "Create account"
            ) : (
              "Login"
            )}
            <ArrowUpRight size={16} />
          </button>
        </form>
        <div className="divider text-xs muted my-6">or keep it simple</div>
        <button
          type="button"
          onClick={google}
          disabled={busy}
          className="btn btn-outline w-full"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.2h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.8 3-4.3 3-7.3Z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.7 0 5-.9 6.6-2.5l-3.2-2.4c-.9.6-2 .9-3.4.9-2.6 0-4.9-1.8-5.7-4.1H3v2.5C4.7 19.7 8.1 22 12 22Z"
            />
            <path
              fill="#FBBC05"
              d="M6.3 13.9a6 6 0 0 1 0-3.8V7.6H3a10 10 0 0 0 0 8.8l3.3-2.5Z"
            />
            <path
              fill="#EA4335"
              d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A9.5 9.5 0 0 0 12 2C8.1 2 4.7 4.3 3 7.6l3.3 2.5C7.1 7.8 9.4 6 12 6Z"
            />
          </svg>
          Continue with Google
        </button>
        <p className="text-sm text-center muted mt-7">
          {register ? "Already part of the community?" : "New around here?"}{" "}
          <Link
            className="text-primary"
            href={`${register ? "/login" : "/register"}${requested ? `?next=${encodeURIComponent(next)}` : ""}`}
          >
            {register ? "Log in" : "Register"}
          </Link>
        </p>
        <p className="text-xs muted text-center mt-5">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline">
            terms of use
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
