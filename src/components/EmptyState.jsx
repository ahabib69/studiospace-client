import Link from "next/link";
import { ScanLine } from "lucide-react";
export default function EmptyState({
  title = "Nothing in frame yet",
  text = "Try a different search or explore all our creative spaces.",
  href = "/studios",
  label = "Explore studios",
  children,
}) {
  return (
    <div className="empty-state">
      <ScanLine size={38} className="text-primary mx-auto mb-5" />
      <h2 className="text-2xl mb-3">{title}</h2>
      <p className="muted mb-6 max-w-lg mx-auto">{text}</p>
      {children || (
        <Link className="btn btn-primary" href={href}>
          {label}
        </Link>
      )}
    </div>
  );
}
