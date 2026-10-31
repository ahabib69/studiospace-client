import StudioDetails from "@/components/StudioDetails";
export default async function Page({ params }) {
  const { id } = await params;
  return <StudioDetails id={id} />;
}
