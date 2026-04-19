// A wheat stalk — prairie identity motif. Accepts color + size + rotation.

export default function WheatDecor({
  size = 80,
  color = '#ffd600',
  rotate = 0,
  className = '',
}) {
  return (
    <svg
      width={size}
      height={size * 2}
      viewBox="0 0 60 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <g fill={color}>
        {/* stem */}
        <rect x="28" y="10" width="4" height="108" rx="2" />
        {/* tip */}
        <ellipse cx="30" cy="8" rx="5" ry="8" />
        {/* pairs of grains */}
        <ellipse cx="20" cy="22" rx="4.5" ry="8" />
        <ellipse cx="40" cy="22" rx="4.5" ry="8" />
        <ellipse cx="20" cy="38" rx="4.5" ry="8" />
        <ellipse cx="40" cy="38" rx="4.5" ry="8" />
        <ellipse cx="20" cy="54" rx="4.5" ry="8" />
        <ellipse cx="40" cy="54" rx="4.5" ry="8" />
        <ellipse cx="20" cy="70" rx="4.5" ry="8" />
        <ellipse cx="40" cy="70" rx="4.5" ry="8" />
      </g>
    </svg>
  );
}
