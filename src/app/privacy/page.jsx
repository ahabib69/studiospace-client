export const metadata = { title: "Privacy policy" };
export default function Page() {
  return (
    <div className="page">
      <article className="prose-studio">
        <p className="eyebrow">Your information, explained</p>
        <h1 className="heading">Privacy policy</h1>
        <p>
          This educational application stores your account name, email, profile
          image URL, authentication sessions, listings and booking requests in
          MongoDB. Passwords are hashed by BetterAuth and are never returned by
          the API.
        </p>
        <h2>Cookies</h2>
        <p>
          BetterAuth session cookies and an HTTPOnly application JWT keep you
          signed in. These are authentication cookies, not advertising trackers.
          The selected visual theme is stored locally in your browser.
        </p>
        <h2>Public information</h2>
        <p>
          A listing displays its owner’s name and email so creators can discuss
          the space. Do not use an email you do not wish to publish when
          creating a listing. Booking records are visible only to the account
          that created them through the authenticated API.
        </p>
        <h2>External services</h2>
        <p>
          Google sign-in is optional. Unsplash and profile image hosts receive
          normal image requests. Image uploads go to imgbb if configured. The
          newsletter form displays a demonstration success message and does not
          store or send your email.
        </p>
        <h2>Removing data</h2>
        <p>
          Delete your listings through My Studio Listings. Contact the
          repository maintainer for account or booking-data removal. No
          analytics or marketing service is installed in this project.
        </p>
      </article>
    </div>
  );
}
