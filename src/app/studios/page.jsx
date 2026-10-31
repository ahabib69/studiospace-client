import { Suspense } from "react";
import Explore from "@/components/Explore";
import { PageLoader } from "@/components/Skeleton";
export const metadata = { title: "Explore studios" };
export default function Studios() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Explore />
    </Suspense>
  );
}
