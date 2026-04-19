import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import WheatDecor from './decor/WheatDecor.jsx';

function RegisterCTA() {
  return (
    <section className="relative overflow-hidden border-t border-gold/8" style={{ background: '#020c2a' }}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,214,0,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(255,214,0,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="max-w-content mx-auto px-6 py-16 relative z-10">
        <div
          className="border border-gold/15 p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-8 items-center"
          style={{ background: 'rgba(255,214,0,0.04)' }}
        >
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-8 bg-gold" />
              <span className="kicker text-gold">Registration is open</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ivory leading-[1.05] mb-3">
              Grab your spot before the wheat does.
            </h2>
            <p className="font-display text-ivory/45 text-[13px] leading-relaxed max-w-xl text-pretty border-l-2 border-ivory/15 pl-4">
              Team registration opens soon. Contact your school's engineering society
              or reach out to us directly to get on the list.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <Link to="/contact" className="btn-primary">
              Get in touch <ArrowRight size={15} />
            </Link>
            <Link to="/events" className="btn-gold-outline text-center">
              See all events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <>
    <RegisterCTA />
    <footer className="section-navy pt-16 pb-10 relative overflow-hidden">
      {/* Decorative wheat in the corners */}
      <div className="absolute -bottom-6 -left-6 opacity-15">
        <WheatDecor size={120} color="#ffd600" rotate={-15} />
      </div>
      <div className="absolute -bottom-6 -right-6 opacity-15">
        <WheatDecor size={120} color="#ffd600" rotate={15} />
      </div>

      <div className="container-page relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/assets/logo-white.png" alt="WEC 2027" className="h-12 w-auto" />
              <div>
                <div className="font-display font-extrabold text-ivory tracking-[0.1em]">
                  WEC 2027
                </div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-sky font-display font-semibold">
                  Western Engineering Competition
                </div>
              </div>
            </div>
            <p className="mt-5 body max-w-md text-ivory/75 text-pretty">
              <span className="font-display font-extrabold text-gold">Rural Innovation.</span>{' '}
              Inspiring growth in small communities through engineering,
              one prairie problem at a time.
            </p>
          </div>

          {/* Explore */}
          <div>
            <div className="kicker text-gold">Explore</div>
            <ul className="mt-4 space-y-2">
              {[
                ['/about', 'About'],
                ['/events', 'Events'],
                ['/schedule', 'Schedule'],
                ['/sponsors', 'Sponsors'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-ivory/80 hover:text-gold link-underline text-sm font-display"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="kicker text-gold">Connect</div>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:chair@wec27.ca"
                  className="flex items-center gap-2 text-ivory/80 hover:text-gold text-sm font-display"
                >
                  <Mail size={16} /> chair@wec27.ca
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/wec2027"
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-ivory/80 hover:text-gold text-sm font-display"
                >
                  <Instagram size={16} /> @wec2027
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/wec2027"
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 text-ivory/80 hover:text-gold text-sm font-display"
                >
                  <Linkedin size={16} /> WEC 2027
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ivory/60 font-display">
          <div>© {new Date().getFullYear()} Western Engineering Competition 2027</div>
          <div>Hosted on Treaty 4 Territory, homeland of the Métis.</div>
        </div>
      </div>
    </footer>
    </>
  );
}
