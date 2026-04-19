// Proper 10-tooth involute-style gear silhouette.
export default function GearDecor({
  size = 120,
  color = '#ffd600',
  spin = 'slow',
  className = '',
  strokeOnly = false,
}) {
  const spinCls =
    spin === 'slow' ? 'animate-spin-slow' :
    spin === 'slower' ? 'animate-spin-slower' : '';

  // Build gear path: 12 teeth
  const teeth = 12;
  const R_outer = 46;
  const R_inner = 38;
  const R_root  = 32;
  const R_hub   = 12;
  const cx = 50, cy = 50;

  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a0 = (2 * Math.PI * i) / teeth;
    const a1 = a0 + (Math.PI / teeth) * 0.4;
    const a2 = a0 + (Math.PI / teeth) * 0.6;
    const a3 = a0 + (2 * Math.PI) / teeth;

    const pt = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];

    const [x0, y0] = pt(R_root, a0);
    const [x1, y1] = pt(R_inner, a1 - 0.06);
    const [x2, y2] = pt(R_outer, a1);
    const [x3, y3] = pt(R_outer, a2);
    const [x4, y4] = pt(R_inner, a2 + 0.06);
    const [x5, y5] = pt(R_root, a3);

    if (i === 0) d += `M${x0.toFixed(2)},${y0.toFixed(2)} `;
    else         d += `L${x0.toFixed(2)},${y0.toFixed(2)} `;
    d += `L${x1.toFixed(2)},${y1.toFixed(2)} `;
    d += `L${x2.toFixed(2)},${y2.toFixed(2)} `;
    d += `L${x3.toFixed(2)},${y3.toFixed(2)} `;
    d += `L${x4.toFixed(2)},${y4.toFixed(2)} `;
    d += `L${x5.toFixed(2)},${y5.toFixed(2)} `;
  }
  d += 'Z';

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`${spinCls} ${className} gpu`}
      aria-hidden="true"
    >
      <path
        d={d}
        fill={strokeOnly ? 'none' : color}
        stroke={strokeOnly ? color : 'none'}
        strokeWidth={strokeOnly ? 2.5 : 0}
      />
      {/* Spoke holes */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const sx = cx + 22 * Math.cos(rad);
        const sy = cy + 22 * Math.sin(rad);
        return (
          <ellipse
            key={i}
            cx={sx} cy={sy}
            rx={5} ry={3}
            transform={`rotate(${deg} ${sx} ${sy})`}
            fill={strokeOnly ? 'none' : (color === '#ffd600' ? '#000b3a' : '#faf8f0')}
            fillOpacity={strokeOnly ? 0 : 0.35}
          />
        );
      })}
      {/* Centre hub */}
      <circle cx={cx} cy={cy} r={R_hub}
        fill={strokeOnly ? 'none' : (color === '#ffd600' ? '#000b3a' : '#faf8f0')}
        fillOpacity={strokeOnly ? 0 : 0.5}
        stroke={color} strokeWidth={strokeOnly ? 2.5 : 1.5}
      />
      <circle cx={cx} cy={cy} r={4}
        fill={color} opacity={0.8}
      />
    </svg>
  );
}
