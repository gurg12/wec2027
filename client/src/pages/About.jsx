import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Sparkles, Trophy } from 'lucide-react';

import PageHero from '../components/ui/PageHero.jsx';
import { MissionVision } from './Home.jsx';
import WheatDecor from '../components/decor/WheatDecor.jsx';

const TEAM = [
  { initials: 'CC', role: 'Conference Co-Chair' },
  { initials: 'CC', role: 'Conference Co-Chair' },
  { initials: 'VL', role: 'VP Logistics'        },
  { initials: 'VC', role: 'VP Competitions'     },
  { initials: 'VS', role: 'VP Sponsorship'      },
  { initials: 'VM', role: 'VP Marketing'        },
  { initials: 'VF', role: 'VP Finance'          },
  { initials: 'VD', role: 'VP Delegate Exp.'    },
];

/* Stats + History — dark editorial */
function HistoryBlock() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#020c2a' }}>
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,214,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container-page relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.36em] text-gold/55">
            Our History
          </span>
          <div className="flex-1 h-px bg-gold/12" />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Stat stack — sharp bordered cards */}
          <div className="lg:col-span-4 space-y-px" style={{ background: 'rgba(255,214,0,0.08)' }}>
            {[
              { n: '30+',  l: 'Years of WEC',               Icon: Trophy   },
              { n: '8',    l: 'Schools across Western Canada', Icon: MapPin  },
              { n: '200+', l: 'Expected delegates 2027',     Icon: Sparkles },
            ].map(({ n, l, Icon }, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-5 p-7 transition-colors duration-200
                           hover:bg-white/4"
                style={{ background: '#020c2a', borderLeft: '2px solid rgba(255,214,0,0.5)' }}
              >
                <div className="w-11 h-11 bg-gold/10 text-gold flex items-center
                                justify-center shrink-0">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-display font-extrabold text-4xl text-ivory leading-none">{n}</div>
                  <div className="font-display text-[10px] uppercase tracking-[0.22em] text-gold/55 mt-1">{l}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Text */}
          <div className="lg:col-span-8">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-ivory
                           leading-[1.05] tracking-[-0.02em] text-pretty">
              Three decades of Western Canadian engineering talent.
            </h2>

            <div className="mt-8 space-y-5 text-ivory/55 font-display text-[14px] leading-relaxed max-w-2xl">
              <p>
                WEC has travelled between Western schools for over thirty years,
                building the community of engineers who keep the prairies running.
                Teams who place qualify to represent Western Canada at the
                Canadian Engineering Competition.
              </p>
              <p>
                For 2027 we're hosting in{' '}
                <strong className="text-ivory font-extrabold">Regina</strong>,
                Saskatchewan, a conference rooted in the prairie identity that
                defines this province and the communities it serves.
              </p>
            </div>

            {/* Pull-quote */}
            <div className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-display font-extrabold text-xl text-ivory leading-snug">
                "Rural Innovation: Inspiring growth in small communities."
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="h-px w-5 bg-gold" />
                <span className="font-display text-[9px] uppercase tracking-[0.26em] text-gold/60">
                  WEC 2027 Theme
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Theme section — golden-hour photo, angular diagonal, sharp cards */
function ThemeExplainer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-36 md:py-48 text-ivory"
      style={{
        clipPath: 'polygon(0 5%, 100% 0%, 100% 95%, 0 100%)',
        marginTop: '-4vw',
        marginBottom: '-4vw',
        paddingTop: 'calc(4vw + 5rem)',
        paddingBottom: 'calc(4vw + 5rem)',
      }}
    >
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src="/assets/photo-prairie-sunset.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,11,58,0.93) 0%, rgba(0,11,58,0.48) 25%, rgba(145,70,5,0.58) 58%, rgba(0,11,58,0.93) 92%)',
          }}
        />
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-0 opacity-20 z-0">
        <WheatDecor size={200} color="#ffd600" rotate={-12} />
      </div>

      <div className="container-page relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.36em] text-gold">
            Brand Voice
          </span>
          <div className="flex-1 h-px bg-gold/30" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ivory
                           leading-[1.0] tracking-[-0.02em]">
              Clever.{' '}
              <span className="text-outline-ivory">Collaborative.</span>{' '}
              Approachable.
            </h2>
            <p className="mt-6 font-display text-ivory/60 text-[14px] leading-relaxed max-w-lg text-pretty
                          border-l-2 border-ivory/20 pl-5">
              Every event, keynote, and panel is tied to one question: how do
              we engineer a better future for prairie communities?
            </p>
          </div>

          <div className="space-y-px" style={{ background: 'rgba(255,214,0,0.12)' }}>
            {[
              { k: 'Clever',        b: 'Smart solutions, plainly explained. Sharp, never complicated.' },
              { k: 'Collaborative', b: 'Students, sponsors, and schools on the same team. Never above them.' },
              { k: 'Approachable',  b: 'We listen first, then create with care. A conference that greets newcomers warmly.' },
            ].map((item, i) => (
              <motion.div
                key={item.k}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-7 transition-colors duration-300"
                style={{ background: 'rgba(0,11,58,0.55)', backdropFilter: 'blur(16px)', borderLeft: '2px solid rgba(255,214,0,0.5)' }}
              >
                <div className="kicker text-gold mb-2">{item.k}</div>
                <p className="font-display text-ivory/65 text-[13px] leading-relaxed">{item.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Team grid — dark editorial */
function TeamGrid() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#020c2a' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,214,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container-page relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.36em] text-gold/55">
            The Team
          </span>
          <div className="flex-1 h-px bg-gold/12" />
        </div>

        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ivory
                       leading-[1.0] tracking-[-0.02em] mb-3">
          The people building WEC 2027.
        </h2>
        <p className="font-display text-ivory/40 text-[13px] mb-14 border-l-2 border-ivory/20 pl-5">
          Student organisers making it happen. Bios coming soon.
        </p>

        {/* Card grid — gap-px hairlines */}
        <div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(255,214,0,0.08)' }}
        >
          {TEAM.map((t, i) => (
            <motion.div
              key={`${t.role}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 flex flex-col items-center text-center transition-colors duration-200
                         hover:bg-white/4"
              style={{ background: '#020c2a' }}
            >
              {/* Avatar — sharp square */}
              <div
                className="w-16 h-16 flex items-center justify-center mb-5
                           border border-gold/25"
                style={{ background: 'rgba(255,214,0,0.06)' }}
              >
                <span className="font-display font-extrabold text-2xl text-gold/50">
                  {t.initials}
                </span>
              </div>
              <div className="kicker text-gold/70 mb-1">{t.role}</div>
              <div className="font-display text-[10px] uppercase tracking-[0.18em] text-ivory/30">
                U of Regina
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <PageHero
        kicker="About WEC"
        title="A prairie engineering tradition"
        subtitle="Western Canada's premier student engineering conference. Hosted in Regina, SK for 2027."
      />
      <HistoryBlock />
      <MissionVision />
      <ThemeExplainer />
      <TeamGrid />
    </>
  );
}
