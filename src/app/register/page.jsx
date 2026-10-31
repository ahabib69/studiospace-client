import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
import { PageLoader } from "@/components/Skeleton";
export const metadata = { title: "Register" };
export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <AuthForm register={true} />
    </Suspense>
  );
}
