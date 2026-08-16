export function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className="relative h-16 w-full overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1440 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute inset-0 h-full w-full ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <path
          d="M0 32C240 58 480 4 720 28C960 52 1200 6 1440 30V64H0V32Z"
          fill="currentColor"
          className="text-surface-low"
        />
      </svg>
    </div>
  );
}
