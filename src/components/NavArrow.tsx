import './NavArrow.css'

/** Round marker with a right-pointing arrow at the start of a navigation row. */
export default function NavArrow({ primary = false }: { primary?: boolean }) {
  return (
    <span className={`nav-dot${primary ? ' nav-dot--primary' : ''}`} aria-hidden>
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none">
        <path
          d="M7 12h10M12.5 7.5 17 12l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
