export const metadata = { title: "Terms of use" };
export default function Page() {
  return (
    <div className="page">
      <article className="prose-studio">
        <p className="eyebrow">A few ground rules</p>
        <h1 className="heading">Terms of use</h1>
        <p>
          StudioSpace is an educational demonstration, not an operating booking
          agency. All seeded studios and reviews are fictional. Do not travel to
          a listed location based on this demo.
        </p>
        <h2>Requests and prices</h2>
        <p>
          Bookings start as Pending. They are not confirmed reservations.
          Displayed totals cover hourly rental only; a listed security deposit
          is separate. No payment or financial authorization is collected.
        </p>
        <h2>Safety and responsibility</h2>
        <p>
          Do not upload content you do not own or have permission to use. Do not
          enter sensitive personal information. Hosts and creators should agree
          on equipment, house rules and liability before any real-world session.
          The “Host Guarantee” section describes intended marketplace guidance,
          not insurance coverage or a financial guarantee.
        </p>
        <h2>Account access</h2>
        <p>
          You are responsible for keeping your password private. This project
          does not implement email verification, password recovery, booking
          confirmation, real-time support or insurance claims. The database
          operator can remove demonstration data.
        </p>
        <h2>Support</h2>
        <p>
          The interface describes a future support experience. This assignment
          has no staffed 24/7 service. Contact the project maintainer through
          the repository where you received it.
        </p>
      </article>
    </div>
  );
}
