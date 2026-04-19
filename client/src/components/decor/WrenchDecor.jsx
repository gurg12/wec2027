// A stroked wrench in the style of the branding-PDF "Our Vision" card.

export default function WrenchDecor({
  size = 80,
  color = '#7eb9ef',
  className = '',
  rotate = -35,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* head */}
        <path d="M30 15 a18 18 0 1 0 18 18 L80 65 a10 10 0 0 1 -15 15 L33 48 a18 18 0 0 1 -18 -18 a18 18 0 0 1 15 -15 z" />
        <circle cx="30" cy="30" r="6" />
      </g>
    </svg>
  );
}
