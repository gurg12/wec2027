// WEC 2027 logo mark — reconstructed from the branding PDF.
// Navy wings + yellow wheat stalk + sky-blue curved base.

export default function LogoMark({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WEC 2027 logo"
      className={className}
    >
      {/* Outer navy wings (left + right) */}
      <path
        d="M12 50 L58 50 L82 150 L66 170 Z"
        fill="#000b3a"
      />
      <path
        d="M188 50 L142 50 L118 150 L134 170 Z"
        fill="#000b3a"
      />

      {/* Inner navy triangles */}
      <path d="M60 52 L92 52 L98 120 L80 140 Z" fill="#000b3a" />
      <path d="M140 52 L108 52 L102 120 L120 140 Z" fill="#000b3a" />

      {/* Sky-blue curved base */}
      <path
        d="M40 140 Q100 188 160 140 L140 170 Q100 192 60 170 Z"
        fill="#7eb9ef"
      />

      {/* Gold accent curves */}
      <path d="M40 140 Q100 168 160 140" stroke="#ffd600" strokeWidth="6" fill="none" strokeLinecap="round" />

      {/* Wheat stalk (gold) */}
      <g fill="#ffd600">
        <rect x="97" y="60" width="6" height="90" rx="3" />
        <ellipse cx="100" cy="52"  rx="7" ry="12" />
        <ellipse cx="88"  cy="72"  rx="6" ry="11" />
        <ellipse cx="112" cy="72"  rx="6" ry="11" />
        <ellipse cx="86"  cy="92"  rx="6" ry="11" />
        <ellipse cx="114" cy="92"  rx="6" ry="11" />
        <ellipse cx="88"  cy="112" rx="6" ry="11" />
        <ellipse cx="112" cy="112" rx="6" ry="11" />
      </g>
    </svg>
  );
}
