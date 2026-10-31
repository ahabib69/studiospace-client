import Link from "next/link";
export const metadata = { title: "About us" };
export default function Page() {
  return (
    <div className="page">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <p className="eyebrow mb-4">Built for the independently creative</p>
          <h1 className="heading mb-7">
            The right space
            <br />
            changes everything.
          </h1>
          <p className="muted leading-8">
            A photographer needs daylight. A podcaster needs a quiet room. A
            musician needs a place to turn it up. Too often, finding that place
            takes more energy than making the work itself.
          </p>
          <p className="muted leading-8 mt-5">
            StudioSpace is a university project exploring a simpler alternative:
            connect people who have thoughtfully equipped spaces with people
            ready to create in them. Book only the hours you need, understand
            the price up front, and spend more time on the work.
          </p>
        </div>
        <img
          className="w-full h-[430px] object-cover rounded-2xl"
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85"
          alt="A welcoming open studio with room for collaboration"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          [
            "Independent by design",
            "We celebrate small studios, local hosts and the creators building something on their own terms.",
          ],
          [
            "Clear from the start",
            "Hourly rates, capacity and deposits should be visible before a booking request—not discovered after one.",
          ],
          [
            "Respect for the room",
            "Great creative communities look after equipment, respect neighbors and leave spaces ready for the next person.",
          ],
        ].map(([title, text]) => (
          <section className="panel" key={title}>
            <h2 className="text-xl mb-4">{title}</h2>
            <p className="text-sm muted leading-7">{text}</p>
          </section>
        ))}
      </div>
      <div className="prose-studio">
        <h2>A real assignment, not a live marketplace</h2>
        <p>
          This application is built to demonstrate full-stack development,
          secure sessions, listing ownership and booking rules. Seed listings
          and reviews are fictional, and photographs illustrate the kinds of
          spaces you can discover. No payments are taken, no insurance policy is
          issued, and no live customer-support service is operated.
        </p>
        <p>
          Want to try the workflow? Explore the studios, create an account, and
          send a sample booking request. Hosts can also add a space and manage
          its details.
        </p>
        <Link href="/studios" className="btn btn-primary">
          Explore the possibilities
        </Link>
      </div>
    </div>
  );
}
