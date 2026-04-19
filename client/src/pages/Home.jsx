import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import WheatDecor from '../components/decor/WheatDecor.jsx';
import { useCountdown } from '../hooks/useCountdown.js';
import { useApi } from '../hooks/useApi.js';
import { api } from '../api.js';

const CONFERENCE_START = new Date('2027-01-22T15:00:00Z');

// Pre-computed stars — deterministic, not re-generated on every render
const STAR_FIELD = [
  'radial-gradient(circle 0.5px at 0.00% 13.00%, rgba(255,255,255,0.45), transparent)',
  'radial-gradient(circle 0.9px at 37.50% 10.30%, rgba(255,255,255,0.60), transparent)',
  'radial-gradient(circle 1.2px at 75.00% 7.60%, rgba(255,255,255,0.35), transparent)',
  'radial-gradient(circle 0.7px at 12.50% 4.90%, rgba(255,255,255,0.75), transparent)',
  'radial-gradient(circle 1.4px at 50.00% 2.20%, rgba(255,255,255,0.40), transparent)',
  'radial-gradient(circle 0.6px at 87.50% 99.50%, rgba(255,255,255,0.55), transparent)',
  'radial-gradient(circle 1.1px at 25.00% 96.80%, rgba(255,255,255,0.30), transparent)',
  'radial-gradient(circle 0.8px at 62.50% 94.10%, rgba(255,255,255,0.65), transparent)',
  'radial-gradient(circle 1.3px at 0.00% 91.40%, rgba(255,255,255,0.50), transparent)',
  'radial-gradient(circle 0.5px at 37.50% 88.70%, rgba(255,255,255,0.45), transparent)',
  'radial-gradient(circle 1.0px at 75.00% 86.00%, rgba(255,255,255,0.70), transparent)',
  'radial-gradient(circle 0.7px at 12.50% 83.30%, rgba(255,255,255,0.35), transparent)',
  'radial-gradient(circle 1.4px at 50.00% 80.60%, rgba(255,255,255,0.55), transparent)',
  'radial-gradient(circle 0.6px at 87.50% 77.90%, rgba(255,255,255,0.40), transparent)',
  'radial-gradient(circle 0.9px at 25.00% 75.20%, rgba(255,255,255,0.65), transparent)',
  'radial-gradient(circle 1.2px at 62.50% 72.50%, rgba(255,255,255,0.30), transparent)',
  'radial-gradient(circle 0.5px at 0.00% 69.80%, rgba(255,255,255,0.75), transparent)',
  'radial-gradient(circle 1.1px at 37.50% 67.10%, rgba(255,255,255,0.50), transparent)',
  'radial-gradient(circle 0.8px at 75.00% 64.40%, rgba(255,255,255,0.45), transparent)',
  'radial-gradient(circle 1.3px at 12.50% 61.70%, rgba(255,255,255,0.60), transparent)',
  'radial-gradient(circle 0.6px at 50.00% 59.00%, rgba(255,255,255,0.35), transparent)',
  'radial-gradient(circle 1.0px at 87.50% 56.30%, rgba(255,255,255,0.70), transparent)',
  'radial-gradient(circle 0.7px at 25.00% 53.60%, rgba(255,255,255,0.55), transparent)',
  'radial-gradient(circle 1.4px at 62.50% 50.90%, rgba(255,255,255,0.40), transparent)',
  'radial-gradient(circle 0.5px at 0.00% 48.20%, rgba(255,255,255,0.65), transparent)',
  'radial-gradient(circle 0.9px at 37.50% 45.50%, rgba(255,255,255,0.30), transparent)',
  'radial-gradient(circle 1.2px at 75.00% 42.80%, rgba(255,255,255,0.50), transparent)',
  'radial-gradient(circle 0.6px at 12.50% 40.10%, rgba(255,255,255,0.75), transparent)',
  'radial-gradient(circle 1.1px at 50.00% 37.40%, rgba(255,255,255,0.45), transparent)',
  'radial-gradient(circle 0.8px at 87.50% 34.70%, rgba(255,255,255,0.60), transparent)',
  'radial-gradient(circle 1.3px at 25.00% 32.00%, rgba(255,255,255,0.35), transparent)',
  'radial-gradient(circle 0.5px at 62.50% 29.30%, rgba(255,255,255,0.70), transparent)',
  'radial-gradient(circle 1.0px at 0.00% 26.60%, rgba(255,255,255,0.55), transparent)',
  'radial-gradient(circle 0.7px at 37.50% 23.90%, rgba(255,255,255,0.40), transparent)',
  'radial-gradient(circle 1.4px at 75.00% 21.20%, rgba(255,255,255,0.65), transparent)',
  'radial-gradient(circle 0.6px at 12.50% 18.50%, rgba(255,255,255,0.30), transparent)',
  'radial-gradient(circle 0.9px at 50.00% 15.80%, rgba(255,255,255,0.75), transparent)',
  'radial-gradient(circle 1.2px at 87.50% 13.10%, rgba(255,255,255,0.50), transparent)',
  'radial-gradient(circle 0.5px at 25.00% 10.40%, rgba(255,255,255,0.45), transparent)',
  'radial-gradient(circle 1.1px at 62.50% 7.70%, rgba(255,255,255,0.60), transparent)',
  'radial-gradient(circle 0.8px at 18.00% 44.50%, rgba(255,255,255,0.40), transparent)',
  'radial-gradient(circle 1.3px at 83.00% 67.20%, rgba(255,255,255,0.55), transparent)',
  'radial-gradient(circle 0.6px at 44.00% 38.80%, rgba(255,255,255,0.70), transparent)',
  'radial-gradient(circle 1.0px at 7.00% 58.30%, rgba(255,255,255,0.35), transparent)',
  'radial-gradient(circle 0.7px at 91.00% 31.60%, rgba(255,255,255,0.65), transparent)',
  'radial-gradient(circle 1.4px at 55.00% 82.90%, rgba(255,255,255,0.30), transparent)',
  'radial-gradient(circle 0.5px at 31.00% 19.70%, rgba(255,255,255,0.80), transparent)',
  'radial-gradient(circle 0.9px at 69.00% 71.40%, rgba(255,255,255,0.45), transparent)',
].join(', ');

/* ═══════════════════════════════════════════════════════
   1. HERO — MORNING: Land of Living Skies
   Sky blue tint at top → deep navy at bottom
═══════════════════════════════════════════════════════ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const { days, hours, mins, secs } = useCountdown(CONFERENCE_START);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-navy">
      {/* Parallax morning-sky photo */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-[115%] -top-[5%]">
        <img
          src="/assets/photo-sun-halo.webp"
          alt="Saskatchewan morning sky"
          className="w-full h-full object-cover"
        />
        {/* Cool sky-blue tint top → deep navy bottom */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(15,40,100,0.65) 0%, rgba(126,185,239,0.15) 30%, rgba(0,11,58,0.72) 65%, rgba(0,11,58,0.99) 100%)'
        }} />
      </motion.div>

      {/* Top gold hairline */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent z-20" />

      {/* Content */}
      <div className="container-page relative z-10 pb-0 pt-36">

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-px w-10 bg-gold" />
          <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.38em] text-gold/80">
            Regina, SK · Jan 22–24, 2027
          </span>
        </motion.div>

        {/* Giant stacked type — each line a reveal */}
        <div className="overflow-hidden">
          {[
            { text: 'Western',     cls: 'text-ivory'        },
            { text: 'Engineering', cls: 'text-outline-ivory' },
            { text: 'Competition', cls: 'text-ivory'        },
            { text: '2027',        cls: 'text-gold'         },
          ].map(({ text, cls }, i) => (
            <div key={text} className="overflow-hidden">
              <motion.div
                className={`heading-hero ${cls} leading-[0.88] tracking-[-0.04em]`}
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {text}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Tagline + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <p className="font-display text-ivory/55 text-[13px] max-w-xs leading-relaxed
                        border-l-2 border-ivory/20 pl-4">
            Rural Innovation. Three days of engineering design, debate, and prairie hospitality.
          </p>
          <div className="flex items-center gap-3 sm:ml-auto">
            <Link to="/events" className="btn-primary">
              Explore Events <ArrowRight size={14} />
            </Link>
            <Link to="/sponsors" className="btn-gold-outline">
              Sponsors
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Countdown strip — sharp blurred bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="relative z-10 border-t border-white/8 mt-8"
        style={{ background: 'rgba(0,11,58,0.72)', backdropFilter: 'blur(16px)' }}
      >
        <div className="container-page py-4">
          <div className="flex items-center gap-6 md:gap-10 flex-wrap">
            <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.32em] text-gold/50">
              Conference opens in
            </span>
            {[
              { n: days,  l: 'Days' },
              { n: hours, l: 'Hrs'  },
              { n: mins,  l: 'Min'  },
              { n: secs,  l: 'Sec'  },
            ].map(({ n, l }) => (
              <div key={l} className="flex items-baseline gap-1.5">
                <span className="font-display font-extrabold text-3xl md:text-4xl text-ivory
                                 tabular-nums leading-none">
                  {String(n).padStart(2, '0')}
                </span>
                <span className="font-display text-[9px] uppercase tracking-[0.22em] text-gold/50">{l}</span>
              </div>
            ))}
            <div className="ml-auto hidden md:flex items-center gap-4">
              <div className="h-px w-14 bg-gold/20" />
              <span className="font-display text-[9px] uppercase tracking-[0.28em] text-ivory/25">
                WEC 2027
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   2. MISSION / VISION — DEEP NAVY MIDDAY
   Dark editorial grid — no ivory
═══════════════════════════════════════════════════════ */
export function MissionVision() {
  const cards = [
    {
      n: '01',
      kicker: 'Our Mission',
      title: 'Deliver a meaningful conference for Western Canada.',
      body: 'A well-planned, impactful, and engaging conference that unites engineering students from every prairie school to compete, learn, and connect.',
      sub: 'WEC · Since 1990',
      bar: '#7eb9ef',
    },
    {
      n: '02',
      kicker: 'Our Vision',
      title: 'Connect rural communities through engineering.',
      body: 'To address the difficulties rural communities face and connect them through engineering principles. Truly impactful.',
      sub: 'Theme: Rural Innovation',
      bar: '#ffd600',
    },
    {
      n: '03',
      kicker: 'The Theme',
      title: 'Rural Innovation.',
      body: "This year's design briefs land on farms, water systems, and the grid. Real problems for real places across the prairies.",
      sub: 'WEC 2027 Theme',
      bar: '#7eb9ef',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#020c2a' }}>
      {/* Subtle gold grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,214,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Ghost section number */}
      <div
        className="absolute -top-4 -left-2 font-display font-extrabold leading-none
                   select-none pointer-events-none"
        style={{ fontSize: '28vw', color: 'rgba(255,255,255,0.022)', letterSpacing: '-0.04em' }}
      >
        02
      </div>

      <div className="container-page relative z-10">
        {/* Section label row */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.36em] text-gold/55">
            About WEC 2027
          </span>
          <div className="flex-1 h-px bg-gold/12" />
          <span className="font-display text-[9px] uppercase tracking-[0.24em] text-ivory/18">
            02 / 06
          </span>
        </div>

        {/* Card grid — gap-px creates gold hairline separators */}
        <div className="grid lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,214,0,0.1)' }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.n}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 md:p-10 group transition-all duration-200
                         hover:-translate-x-1.5 hover:-translate-y-1.5"
              style={{ background: '#020c2a', borderLeft: `2px solid ${card.bar}` }}
              whileHover={{ boxShadow: `6px 6px 0 ${card.bar}88` }}
            >
              {/* Ghost card number */}
              <div
                className="absolute top-4 right-4 font-display font-extrabold leading-none
                           select-none pointer-events-none"
                style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.032)' }}
              >
                {card.n}
              </div>

              <div className="kicker text-gold mb-4 relative z-10">{card.kicker}</div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-ivory
                             leading-[1.1] mb-5 relative z-10">
                {card.title}
              </h3>
              <p className="body text-ivory/50 relative z-10 text-pretty">{card.body}</p>

              <div className="mt-8 pt-6 border-t border-ivory/8 flex items-center gap-3">
                <div className="h-px w-5" style={{ background: card.bar }} />
                <span className="font-display text-[9px] uppercase tracking-[0.26em] text-ivory/35">
                  {card.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   3. GOLDEN HOUR — Prairie sunset, angled in
   Warm amber overlay, angular clip-path entry/exit
═══════════════════════════════════════════════════════ */
function GoldenHour() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const features = [
    { n: '08', title: 'Competitions',  body: 'Junior Design to Re-Engineering: a category for every kind of engineer.', to: '/events'   },
    { n: '200+', title: 'Delegates',   body: 'Top undergrads from every Western Canadian engineering school.',            to: '/about'    },
    { n: '01', title: 'Closing Gala', body: 'A formal night of awards, prairie hospitality, and celebration.',           to: '/schedule' },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-36 md:py-52"
      style={{
        clipPath: 'polygon(0 5%, 100% 0%, 100% 95%, 0 100%)',
        marginTop: '-4vw',
        marginBottom: '-4vw',
        paddingTop: 'calc(4vw + 5rem)',
        paddingBottom: 'calc(4vw + 5rem)',
      }}
    >
      {/* Parallax golden-hour photo */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src="/assets/photo-prairie-sunset.webp"
          alt="Prairie golden hour"
          className="w-full h-full object-cover brightness-110"
        />
        {/* Navy top/bottom — lighter overlay (10% brighter) */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,11,58,0.80) 0%, rgba(0,11,58,0.28) 22%, rgba(175,88,0,0.48) 55%, rgba(0,11,58,0.80) 90%)',
        }} />
      </motion.div>

      {/* Gold hairlines at diagonal edges */}
      <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ top: '5%' }}>
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,214,0,0.4) 20%, rgba(255,214,0,0.4) 80%, transparent)' }} />
      </div>

      <div className="container-page relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.36em] text-gold">
            The Experience
          </span>
          <div className="flex-1 h-px bg-gold/30" />
          <span className="font-display text-[9px] uppercase tracking-[0.24em] text-ivory/30">
            Golden Hour · 03 / 06
          </span>
        </div>

        {/* Feature cards — hairline grid */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: 'rgba(255,214,0,0.18)' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={f.to}
                className="group flex flex-col h-full p-8 md:p-10 relative overflow-hidden
                           transition-all duration-200
                           hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-gold"
                style={{ background: 'rgba(0,11,58,0.58)', backdropFilter: 'blur(20px)' }}
              >
                {/* Ghost number */}
                <div
                  className="absolute top-2 right-3 font-display font-extrabold leading-none
                             select-none pointer-events-none transition-opacity duration-500"
                  style={{ fontSize: '5.5rem', color: 'rgba(255,255,255,0.045)' }}
                >
                  {f.n}
                </div>

                <div className="h-px w-8 bg-gold mb-7" />
                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-ivory
                               leading-tight mb-4 relative z-10">
                  {f.title}
                </h3>
                <p className="body text-ivory/60 relative z-10 text-pretty flex-1">{f.body}</p>

                <div className="mt-8 flex items-center gap-2 font-display font-extrabold
                                text-[9px] uppercase tracking-[0.28em] text-gold
                                group-hover:gap-3 transition-all duration-300">
                  Learn More <ArrowUpRight size={11} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   4. TESTIMONIAL — DUSK
   Warm amber fading into cool navy (golden → evening)
═══════════════════════════════════════════════════════ */
function Testimonial() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #150c00 0%, #0a0a20 55%, #020c2a 100%)' }}
    >
      {/* Warm amber glow in top-left — the dusk bleed */}
      <div
        className="absolute top-0 left-0 pointer-events-none"
        style={{
          width: '55%',
          height: '65%',
          background: 'radial-gradient(ellipse 90% 80% at 0% 0%, rgba(180,90,10,0.2), transparent 70%)',
        }}
      />

      <div className="container-page relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.36em] text-gold/50">
            From Last Year
          </span>
          <div className="flex-1 h-px bg-gold/10" />
          <span className="font-display text-[9px] uppercase tracking-[0.24em] text-ivory/18">
            WEC 2026 · Saskatoon · 04 / 06
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Photo — angular clip */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 94% 0, 100% 100%, 0 100%)' }}
            >
              <img
                src="/assets/photo-prairie-sunset.webp"
                alt="Prairie golden hour"
                className="w-full h-56 md:h-80 lg:h-96 object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(145,70,5,0.45) 0%, rgba(0,11,58,0.6) 80%)',
                }}
              />
            </div>
            {/* Offset gold border */}
            <div
              className="absolute pointer-events-none border border-gold/22"
              style={{
                inset: 0,
                transform: 'translate(10px, 10px)',
                clipPath: 'polygon(0 0, 94% 0, 100% 100%, 0 100%)',
              }}
            />
          </motion.div>

          {/* Quote block */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-display font-extrabold text-[5rem] leading-none text-gold/30 mb-4 select-none">
              "
            </div>
            <blockquote className="font-display font-extrabold text-2xl md:text-3xl lg:text-4xl
                                   text-ivory leading-[1.15] text-pretty">
              We showed up for the competition and left with a network. Three of my teammates are now at my company.
            </blockquote>

            <div className="mt-10 flex items-center gap-4">
              {/* Sharp square avatar */}
              <div className="w-10 h-10 bg-gold text-navy flex items-center justify-center
                              font-display font-extrabold text-sm shrink-0">
                AM
              </div>
              <div className="h-8 w-px bg-ivory/15" />
              <div>
                <div className="font-display font-extrabold text-ivory text-sm">Amrit Mahal</div>
                <div className="font-display text-[9px] uppercase tracking-[0.24em] text-gold/55 mt-0.5">
                  4th-year Mech · WEC 2026 Gold
                </div>
              </div>
            </div>

            <div className="mt-10 body text-ivory/40 text-sm border-l-2 border-gold/25 pl-5 max-w-md text-pretty">
              WEC has connected Western Canadian engineering students for over thirty years, building the teams who keep the prairies running.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   5. SPONSORS — COOL EVENING
   Dark editorial grid, hairline borders
═══════════════════════════════════════════════════════ */
function SponsorStrip() {
  const { data, loading } = useApi(() => api.getSponsors(), []);
  const sponsors = data?.sponsors?.flatMap(g => g.sponsors) ?? [];

  return (
    <section
      className="relative py-20 md:py-24 overflow-hidden border-t border-gold/8"
      style={{ background: '#030a20' }}
    >
      <div className="container-page">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.36em] text-gold/50">
            Our Sponsors
          </span>
          <div className="flex-1 h-px bg-gold/8" />
          <span className="font-display text-[9px] uppercase tracking-[0.24em] text-ivory/18">
            05 / 06
          </span>
          <Link
            to="/sponsors"
            className="flex items-center gap-1.5 font-display font-extrabold text-[9px]
                       uppercase tracking-[0.28em] text-gold hover:text-gold-200 transition-colors ml-4"
          >
            Full Roster <ArrowUpRight size={10} />
          </Link>
        </div>

        {loading ? (
          <p className="font-display text-ivory/30 text-xs tracking-widest">Loading partners…</p>
        ) : sponsors.length > 0 ? (
          <div
            className="grid grid-cols-3 md:grid-cols-6 gap-px"
            style={{ background: 'rgba(255,214,0,0.08)' }}
          >
            {sponsors.slice(0, 6).map((s, i) => (
              <motion.div
                key={s._id || s.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-center p-6 md:p-8 aspect-square
                           transition-colors duration-300 group"
                style={{ background: '#030a20' }}
              >
                {s.logoUrl ? (
                  <img
                    src={s.logoUrl}
                    alt={s.name}
                    className="max-h-10 max-w-full object-contain opacity-50 group-hover:opacity-90 transition-opacity duration-300"
                  />
                ) : (
                  <span className="font-display font-extrabold text-[11px] text-ivory/25
                                   text-center tracking-tight leading-tight">
                    {s.name}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div
            className="p-10 text-center border border-gold/10"
            style={{ background: 'rgba(255,214,0,0.02)' }}
          >
            <p className="font-display text-ivory/25 text-xs tracking-[0.2em] uppercase">
              Sponsors announced soon
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   6. CTA BAND — NORTHERN LIGHTS
   Deep navy + aurora radials + star field + wheat silhouettes
═══════════════════════════════════════════════════════ */
function CtaBand() {
  return (
    <section
      className="relative py-36 md:py-52 overflow-hidden border-t border-gold/8"
      style={{ background: '#000b3a' }}
    >
      {/* Aurora — 4 individually animated blobs for natural shimmer */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 90% 50% at 10% 25%, rgba(80,255,190,0.30) 0%, transparent 65%)',
        animation: 'aurora-drift-a 8s ease-in-out infinite',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 65% 55% at 70% 12%, rgba(155,100,240,0.26) 0%, transparent 70%)',
        animation: 'aurora-drift-b 11s ease-in-out infinite',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 42% at 88% 58%, rgba(80,205,255,0.22) 0%, transparent 65%)',
        animation: 'aurora-drift-c 9s ease-in-out infinite',
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 100% 40% at 38% 78%, rgba(120,240,180,0.18) 0%, transparent 65%)',
        animation: 'aurora-drift-d 13s ease-in-out infinite',
      }} />

      {/* Star field */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: STAR_FIELD }}
      />

      {/* Wheat silhouettes */}
      <div className="pointer-events-none absolute bottom-0 left-0 opacity-18">
        <WheatDecor size={220} color="#ffd600" rotate={-10} />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 opacity-18">
        <WheatDecor size={220} color="#ffd600" rotate={10} />
      </div>

      {/* Top gold accent line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,214,0,0.45) 25%, rgba(255,214,0,0.45) 75%, transparent)' }}
      />

      <div className="container-page relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.36em] text-gold/50">
            Under the Prairie Sky · WEC 2027
          </span>
          <div className="flex-1 h-px bg-gold/10" />
          <span className="font-display text-[9px] uppercase tracking-[0.24em] text-ivory/18">
            06 / 06
          </span>
        </div>

        {/* Giant mixed-fill heading with hard text shadow */}
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="heading-hero text-ivory leading-[0.85] tracking-[-0.04em] text-shadow-hard-lg">
            Bring your team.
          </div>
          <div className="heading-hero text-outline-gold leading-[0.85] tracking-[-0.04em] text-shadow-gold">
            Compete.
          </div>
        </motion.div>

        {/* Sub-line + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-end gap-8"
        >
          <p className="font-display text-ivory/45 text-[13px] max-w-xs leading-relaxed">
            Eight engineering competitions. Three days. One prairie city.
            Western Canada's top undergrads. Are you in?
          </p>
          <div className="flex items-center gap-3 sm:ml-auto">
            <Link to="/contact" className="btn-primary">
              Get in touch <ArrowRight size={14} />
            </Link>
            <Link to="/events" className="btn-gold-outline">
              Events
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE — Morning → Midday → Golden Hour → Dusk → Evening → Northern Lights
═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Hero />        {/* MORNING   — sky blue photo    */}
      <MissionVision />{/* MIDDAY    — deep navy grid    */}
      <GoldenHour /> {/* GOLDEN HR — amber photo       */}
      <Testimonial /> {/* DUSK      — warm → cool dark  */}
      <SponsorStrip />{/* EVENING   — cool dark         */}
      <CtaBand />    {/* N. LIGHTS — aurora + stars    */}
    </>
  );
}
