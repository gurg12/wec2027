import { motion } from 'framer-motion';
import { Handshake, TrendingUp, Users, Mail, ArrowRight } from 'lucide-react';

import PageHero from '../components/ui/PageHero.jsx';
import Button from '../components/ui/Button.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import { useApi } from '../hooks/useApi.js';
import { api } from '../api.js';
import BoltDecor from '../components/decor/BoltDecor.jsx';
import WheatDecor from '../components/decor/WheatDecor.jsx';

const TIER_META = {
  platinum:{ label:'Platinum', grid:'md:grid-cols-2',               height:'h-36', accent:'bg-gold   text-navy', ring:'ring-gold/50'         },
  gold:    { label:'Gold',     grid:'md:grid-cols-3',               height:'h-28', accent:'bg-navy   text-gold', ring:'ring-navy/30'         },
  silver:  { label:'Silver',   grid:'sm:grid-cols-2 md:grid-cols-4',height:'h-24', accent:'bg-sky    text-navy', ring:'ring-sky/40'          },
  bronze:  { label:'Bronze',   grid:'sm:grid-cols-2 md:grid-cols-4',height:'h-20', accent:'bg-navy/80 text-ivory',ring:'ring-navy/20'        },
  partner: { label:'Partners', grid:'sm:grid-cols-2 md:grid-cols-4',height:'h-18', accent:'bg-ivory  text-navy', ring:'ring-navy/15'        },
};

function SponsorTile({ sponsor, tier }) {
  const { height } = TIER_META[tier];
  return (
    <motion.a
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      href={sponsor.websiteUrl || '#'}
      target="_blank" rel="noreferrer"
      className="group block card-tilt card-tilt-gold"
      title={sponsor.name}
    >
      <div className={`${height} border border-gold/10 flex items-center justify-center px-6
                       group-hover:border-gold/35 transition-colors duration-300`}
           style={{ background: '#030a20' }}>
        {sponsor.logoUrl ? (
          <img src={sponsor.logoUrl} alt={sponsor.name}
               className="max-h-full max-w-full object-contain opacity-55 group-hover:opacity-90 transition-opacity duration-300" loading="lazy" />
        ) : (
          <div className="font-display font-extrabold text-ivory/30 text-sm tracking-tight
                          text-center leading-tight">
            {sponsor.name}
          </div>
        )}
      </div>
      {tier === 'platinum' && sponsor.blurb && (
        <p className="mt-3 font-display text-ivory/45 text-[13px] leading-relaxed text-pretty">{sponsor.blurb}</p>
      )}
    </motion.a>
  );
}

function TierSection({ group }) {
  const meta = TIER_META[group.tier];
  if (!meta) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="mb-16 last:mb-0"
    >
      <div className="flex items-center gap-4 mb-8">
        <span className={`chip ${meta.accent}`}>{meta.label}</span>
        <div className="flex-1 h-px bg-gold/12" />
        <span className="font-display text-[10px] text-ivory/30 uppercase tracking-[0.22em]">
          {group.sponsors.length} {group.sponsors.length===1?'partner':'partners'}
        </span>
      </div>
      <div className={`grid grid-cols-1 ${meta.grid} gap-5`}>
        {group.sponsors.map(s => (
          <SponsorTile key={s._id||s.name} sponsor={s} tier={group.tier} />
        ))}
      </div>
    </motion.div>
  );
}

function Pitch() {
  const pillars = [
    { Icon:Users,      n:'200+', title:'Direct access',    body:'Three days of in-person connection with the next wave of prairie engineers.' },
    { Icon:TrendingUp, n:'8',    title:'Brand alignment',  body:'Associate with a rural-innovation theme that resonates across Western Canada.' },
    { Icon:Handshake,  n:'∞',    title:'Pipeline impact',  body:'From casual socials to recruiter booths: a full spectrum of touchpoints.' },
  ];
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#020c2a' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,214,0,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(255,214,0,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="container-page relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.36em] text-gold/55">
            Why Sponsor
          </span>
          <div className="flex-1 h-px bg-gold/12" />
        </div>
        <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ivory
                       leading-[1.0] tracking-[-0.02em] mb-14 max-w-2xl">
          Invest in the engineers building the prairies.
        </h2>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: 'rgba(255,214,0,0.08)' }}>
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-8 md:p-10 overflow-hidden transition-colors duration-300 hover:bg-white/4"
              style={{ background: '#020c2a' }}
            >
              <div
                className="absolute top-4 right-4 font-display font-extrabold leading-none select-none pointer-events-none"
                style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.03)' }}
              >
                {p.n}
              </div>
              <div className="w-10 h-10 bg-gold/10 text-gold flex items-center justify-center mb-6">
                <p.Icon size={20} />
              </div>
              <h3 className="font-display font-extrabold text-xl text-ivory leading-tight mb-3">{p.title}</h3>
              <p className="font-display text-ivory/50 text-[13px] leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="relative overflow-hidden text-ivory clip-diagonal-top py-24 md:py-32">
      {/* Golden-hour photo backdrop */}
      <div className="absolute inset-0 -z-0">
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
              'linear-gradient(180deg, rgba(0,11,58,0.88) 0%, rgba(0,11,58,0.55) 35%, rgba(210,135,40,0.35) 70%, rgba(0,11,58,0.92) 100%)',
          }}
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 opacity-60 z-0">
        <WheatDecor size={200} color="#ffd600" rotate={-12} />
      </div>
      <div className="container-page relative z-10 text-center">
        <SectionHeading
          kicker="Become a Sponsor"
          title="Ready to partner with WEC 2027?"
          subtitle="Packages range from Bronze to title Platinum, all tailored to your recruiting and brand goals."
          align="center"
          light
        />
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="mailto:sponsorships@wec27.ca" variant="primary">
            <Mail size={16} /> sponsorships@wec27.ca
          </Button>
          <Button to="/contact" variant="ghost-light">
            Ask a question
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Sponsors() {
  const { data, loading, error, refetch } = useApi(() => api.getSponsors(), []);
  return (
    <>
      <PageHero
        kicker="Sponsors"
        title="Partners powering the prairies"
        subtitle="WEC 2027 is made possible by companies investing in Western Canada's next generation of engineers."
      />
      <Pitch />

      <section className="py-20 md:py-28 relative overflow-hidden border-t border-gold/8"
               style={{ background: '#030a20' }}>
        <div className="container-page relative z-10">
          <SectionHeading kicker="Our Partners" title="The 2027 roster"
            subtitle="A growing list of Western Canada's most active engineering employers." />
          <div className="mt-12">
            {loading && <LoadingSpinner label="Loading sponsors…" />}
            {error   && <ErrorState title="Couldn't load sponsors" message={error.message} onRetry={refetch} />}
            {!loading && !error && !data?.sponsors?.length && (
              <ErrorState title="Sponsors coming soon"
                message="Confirmed partners will be announced shortly." />
            )}
            {!loading && !error && data?.sponsors?.length > 0 && (
              <div>{data.sponsors.map(g => <TierSection key={g.tier} group={g} />)}</div>
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
