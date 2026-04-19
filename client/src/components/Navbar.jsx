import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to:'/',         label:'Home'     },
  { to:'/about',    label:'About'    },
  { to:'/events',   label:'Events'   },
  { to:'/schedule', label:'Schedule' },
  { to:'/sponsors', label:'Sponsors' },
  { to:'/contact',  label:'Contact'  },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location              = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300
                  ${scrolled || open
                    ? 'bg-navy/96 backdrop-blur-md shadow-[0_2px_32px_-8px_rgba(0,11,58,0.6)]'
                    : 'bg-transparent'}`}
    >
      <nav className="container-page flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="WEC 2027 home">
          <img
            src="/assets/logo-white.png"
            alt="WEC 2027"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="leading-tight">
            <div className="font-display font-extrabold text-ivory text-sm
                            tracking-[0.12em] leading-none">WEC 2027</div>
            <div className="hidden sm:block text-[9px] uppercase tracking-[0.24em]
                            text-sky font-display font-semibold mt-0.5">
              Western Engineering
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `font-display font-extrabold text-xs uppercase tracking-[0.18em]
                   link-underline transition-colors duration-200
                   ${isActive ? 'text-gold' : 'text-ivory/80 hover:text-ivory'}`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-ivory p-2 rounded-lg hover:bg-white/10
                     transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`lg:hidden overflow-hidden transition-[max-height]
                       duration-300 ease-out border-t border-ivory/8
                       ${open ? 'max-h-[70vh]' : 'max-h-0'}`}>
        <ul className="container-page pb-8 pt-3 flex flex-col gap-1">
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 font-display font-extrabold
                   text-sm uppercase tracking-[0.16em]
                   border-b border-ivory/8 last:border-0 transition-colors
                   ${isActive ? 'text-gold' : 'text-ivory/80'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    )}
                    {l.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
