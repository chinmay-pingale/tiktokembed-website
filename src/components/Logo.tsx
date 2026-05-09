type Props = {
  className?: string;
};

export default function Logo({ className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="shrink-0"
        fill="none"
      >
        <path
          d="M 8 8 L 3 16 L 8 24"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 24 8 L 29 16 L 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="13"
          y="9"
          width="6"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <span className="text-lg tracking-tight text-foreground">
        <span className="font-semibold">TikTok Embed</span>{" "}
        <span className="font-light text-[color:var(--color-muted)]">Tool</span>
      </span>
    </span>
  );
}
