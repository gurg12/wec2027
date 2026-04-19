// A hex bolt — nods to the branding PDF "Engineering Motifs" page.

export default function BoltDecor({
  size = 60,
  color = '#ffd600',
  className = '',
  strokeOnly = true,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon
        points="50,8 86,28 86,72 50,92 14,72 14,28"
        fill={strokeOnly ? 'none' : color}
        stroke={color}
        strokeWidth={strokeOnly ? 5 : 2}
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="14" fill="none" stroke={color} strokeWidth={5} />
    </svg>
  );
}
