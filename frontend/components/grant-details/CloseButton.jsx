// CloseButton.jsx — Accessible close button for the drawer
export default function CloseButton({ onClose }) {
  return (
    <button
      id="drawer-close"
      onClick={onClose}
      aria-label="Close grant details"
      className="group flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200 flex-shrink-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white/40 group-hover:text-red-300 transition-colors duration-200"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  )
}
