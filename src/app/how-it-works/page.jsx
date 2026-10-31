import Link from "next/link";
import Steps from "@/components/Steps";
export const metadata = { title: "How it works" };
export default function Page() {
  return (
    <div className="page">
      <div className="max-w-2xl mb-16">
        <p className="eyebrow mb-4">Less admin. More action.</p>
        <h1 className="heading mb-6">
          From a good idea
          <br />
          to a great session.
        </h1>
        <p className="muted leading-8">
          You bring the vision. Our hosts bring the space. Here’s how to turn
          your next creative plan into a date on the calendar.
        </p>
      </div>
      <Steps />
      <div className="grid md:grid-cols-2 gap-6 mt-16">
        <section className="panel">
          <h2 className="text-2xl mb-5">For creators</h2>
          <ol className="space-y-5 text-sm muted leading-7 list-decimal pl-5">
            <li>
              Explore by craft, city and hourly rate. Read the amenities and
              reviews, and check the studio’s capacity.
            </li>
            <li>
              Log in and select your date and hours. Confirmed slots are shown
              in the booking dialog. Adjacent sessions are allowed; overlapping
              confirmed sessions are not.
            </li>
            <li>
              Review your total. The rental price is hours multiplied by the
              listed rate. A refundable deposit, if listed, is arranged with the
              host.
            </li>
            <li>
              Your request starts as Pending. Coordinate directly with the host
              before making travel plans. You can cancel a Pending request in My
              Bookings.
            </li>
          </ol>
        </section>
        <section className="panel">
          <h2 className="text-2xl mb-5">For hosts</h2>
          <ol className="space-y-5 text-sm muted leading-7 list-decimal pl-5">
            <li>
              Create your account and add a space. Use clear photos, a precise
              description and an honest equipment list.
            </li>
            <li>
              Set an hourly rate, deposit and capacity. Include any access
              restrictions or safety rules in the overview.
            </li>
            <li>
              Update your space any time from My Studio Listings. Only you can
              edit or delete your listing.
            </li>
            <li>
              Talk through expectations with your creator before a session. This
              assignment demonstrates request creation and cancellation;
              confirmation and payments are handled outside the application.
            </li>
          </ol>
        </section>
      </div>
      <div className="text-center mt-14">
        <Link href="/studios" className="btn btn-primary">
          Find your next space
        </Link>
      </div>
    </div>
  );
}
