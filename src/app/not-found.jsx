import Link from "next/link";
export default function NotFound() {
  return (
    <div className="page text-center">
      <svg
        className="mx-auto w-72 max-w-full my-10 text-primary"
        viewBox="0 0 360 200"
        fill="none"
        aria-label="Studio spotlight illuminating an empty set"
        role="img"
      >
        <path d="m90 55 160 120H35L90 55Z" fill="currentColor" opacity=".08" />
        <path d="M60 30h55v40H60z" stroke="currentColor" strokeWidth="3" />
        <path
          d="m115 38 25-13v50l-25-13M88 70v105m-30 10 30-15 30 15M190 165h125M240 165V75h65v90"
          stroke="currentColor"
          strokeWidth="3"
        />
        <text
          x="168"
          y="125"
          fill="currentColor"
          fontSize="43"
          fontFamily="Arial"
        >
          404
        </text>
      </svg>
      <p className="eyebrow mb-4">This set is empty</p>
      <h1 className="heading mb-5">Looks like a missed take.</h1>
      <p className="muted mb-8">
        That page has left the studio. Let’s find a better location.
      </p>
      <Link href="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  );
}
