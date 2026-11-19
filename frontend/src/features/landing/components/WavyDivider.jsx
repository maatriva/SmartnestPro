export default function WavyDivider({ fromColor, toColor, inverted = false, className = "" }) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none -my-px relative z-10 ${className}`}
      style={{ backgroundColor: toColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-7 sm:h-11 md:h-14 block"
        fill={fromColor}
      >
        {inverted ? (
          <path d="M0,0 C250,20 450,55 700,30 C900,10 1080,45 1200,25 L1200,0 L0,0 Z" />
        ) : (
          <path d="M0,0 C300,48 550,8 800,42 C1000,56 1120,18 1200,32 L1200,0 L0,0 Z" />
        )}
      </svg>
    </div>
  );
}
