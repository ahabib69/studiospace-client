import PrivatePage from "@/components/PrivatePage";
import EditStudio from "@/components/EditStudio";
export default async function Page({ params }) {
  const { id } = await params;
  return (
    <PrivatePage>
      <EditStudio id={id} />
    </PrivatePage>
  );
}
