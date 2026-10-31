"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { authClient } from "@/lib/auth";
import { api } from "@/lib/api";
const SessionContext = createContext(null);
export const useSession = () => useContext(SessionContext);
export default function Providers({ children }) {
  const {
    data: session,
    isPending,
    error: sessionError,
    refetch,
  } = authClient.useSession();
  const router = useRouter();
  const sessionId = session?.session?.id;
  const [attempt, setAttempt] = useState(0);
  const [ready, setReady] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    setReady(false);
    setError("");
    if (isPending) return;
    if (!sessionId) {
      setReady(true);
      return;
    }
    api("/token", { method: "POST" })
      .then(() => {
        if (active) setReady(true);
      })
      .catch((e) => {
        if (active) {
          setError(e.message);
          setReady(true);
        }
      });
    return () => {
      active = false;
    };
  }, [sessionId, isPending, attempt]);
  async function logout() {
    try {
      await api("/logout", { method: "POST" });
      const result = await authClient.signOut();
      if (result.error) throw new Error(result.error.message);
      toast.success("You’re signed out.");
      router.replace("/");
      router.refresh();
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <SessionContext.Provider
      value={{
        user: session?.user,
        loading: isPending || !ready,
        error: error || sessionError?.message,
        logout,
        refetch: () => {
          refetch();
          setAttempt((value) => value + 1);
        },
      }}
    >
      {children}
      <Toaster position="top-right" richColors closeButton />
    </SessionContext.Provider>
  );
}
