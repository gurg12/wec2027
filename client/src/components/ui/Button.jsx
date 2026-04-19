import { Link } from 'react-router-dom';

const variantMap = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  'ghost-light': 'btn-ghost-light',
};

export default function Button({
  variant = 'primary',
  to,
  href,
  children,
  className = '',
  ...rest
}) {
  const cls = `${variantMap[variant] || variantMap.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
