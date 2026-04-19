import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { X, Clock, Users, DollarSign, ChevronRight } from 'lucide-react';

import PageHero from '../components/ui/PageHero.jsx';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';
import ErrorState from '../components/ui/ErrorState.jsx';
import { useApi } from '../hooks/useApi.js';
import { api } from '../api.js';
import BoltDecor from '../components/decor/BoltDecor.jsx';
import WheatDecor from '../components/decor/WheatDecor.jsx';

// Placeholder events shown when API is unavailable
const PLACEHOLDER_EVENTS = [
  { _id:'pe1', name:'Junior Design',     category:'junior-design',     icon:'Pencil',       teamSize:'2-4',  duration:'4 hrs',  prizePool:500,
    tagline:'First and second-year teams tackle an open-ended design problem.',
    description:'Teams receive a design brief on arrival and must develop and present a solution within 4 hours. No prior knowledge of the problem is given.',
    rules:['Open to 1st and 2nd year students only','Brief revealed on arrival','Presentations capped at 10 minutes'],
    deliverables:['Technical drawing or sketch','Written design summary','Oral presentation'] },
  { _id:'pe2', name:'Senior Design',     category:'senior-design',     icon:'Settings',     teamSize:'4',    duration:'8 hrs',  prizePool:1000,
    tagline:'Upper-year engineers tackle a complex technical design challenge.',
    description:'Teams of 4 are given a complex open-ended engineering problem requiring depth of technical knowledge and clear communication.',
    rules:['Open to 3rd, 4th, and 5th year students','Problem statement provided on competition morning','Judging panel includes industry professionals'],
    deliverables:['Full technical report','Engineering drawings','15-minute presentation'] },
  { _id:'pe3', name:'Consulting',        category:'consulting',        icon:'Briefcase',    teamSize:'4',    duration:'4 hrs',  prizePool:750,
    tagline:'Solve a real-world client brief under time pressure.',
    description:'Teams act as consultants to a real (anonymized) client, analysing a business or engineering problem and presenting recommendations.',
    rules:['Client brief given on arrival','Final deliverable is a consulting deck','Q&A period from judges'],
    deliverables:['Slide presentation','Executive summary','Q&A response'] },
  { _id:'pe4', name:'Communications',    category:'communications',    icon:'MessageSquare',teamSize:'2',    duration:'2 hrs',  prizePool:500,
    tagline:'Communicate a technical concept to a non-technical audience.',
    description:'Teams must explain a technical engineering concept to a panel of non-technical judges in an engaging, accessible way.',
    rules:['Topic assigned on arrival','No jargon without explanation','Audience interaction required'],
    deliverables:['Presentation','Visual aids'] },
  { _id:'pe5', name:'Programming',       category:'programming',       icon:'Code',         teamSize:'2-3',  duration:'3 hrs',  prizePool:750,
    tagline:'Write efficient code to solve a set of algorithmic challenges.',
    description:'Teams compete to solve a series of programming challenges of increasing difficulty within the time limit.',
    rules:['Any programming language permitted','No internet access during competition','Score based on problems solved and efficiency'],
    deliverables:['Working code submissions'] },
  { _id:'pe6', name:'Innovative Design', category:'innovative-design', icon:'Zap',          teamSize:'4',    duration:'24 hrs', prizePool:2000,
    tagline:'Prototype a device that solves a prairie community problem.',
    description:'The flagship event. Teams conceptualize, design, and partially prototype a device addressing a real problem in rural Western Canada.',
    rules:['24-hour build period with overnight workshop access','Budget cap of $100 in materials','Prototype must be demonstrable'],
    deliverables:['Working prototype','Technical poster','Live demonstration'] },
  { _id:'pe7', name:'Debate',            category:'debate',            icon:'Users',        teamSize:'2',    duration:'3 hrs',  prizePool:500,
    tagline:'Argue engineering policy positions in parliamentary format.',
    description:'Teams debate engineering-related resolutions in formal parliamentary style. Topics relate to engineering ethics, policy, and the environment.',
    rules:['Topics assigned 15 minutes before each round','Parliamentary rules of order apply','Four preliminary rounds plus elimination bracket'],
    deliverables:['Oral debate performance'] },
  { _id:'pe8', name:'Re-Engineering',    category:'re-engineering',    icon:'Wrench',       teamSize:'3-4',  duration:'4 hrs',  prizePool:750,
    tagline:'Identify and fix a flaw in an existing engineered system.',
    description:'Teams are given documentation of an existing (fictional) engineered system containing a known flaw. Diagnose the issue and propose a corrected design.',
    rules:['System documentation provided on arrival','Written diagnosis and redesign required','Judged on accuracy and elegance of solution'],
    deliverables:['Written report','Redesign sketches','Brief presentation'] },
];

// Distinct accent per category
const ACCENT = {
  'junior-design':     { bg: 'bg-sky',   text: 'text-navy', bar: '#7eb9ef' },
  'senior-design':     { bg: 'bg-navy',  text: 'text-ivory',bar: '#000b3a' },
  'consulting':        { bg: 'bg-gold',  text: 'text-navy', bar: '#ffd600' },
  'communications':    { bg: 'bg-sky',   text: 'text-navy', bar: '#7eb9ef' },
  'programming':       { bg: 'bg-navy',  text: 'text-ivory',bar: '#000b3a' },
  'innovative-design': { bg: 'bg-gold',  text: 'text-navy', bar: '#ffd600' },
  'debate':            { bg: 'bg-sky',   text: 'text-navy', bar: '#7eb9ef' },
  're-engineering':    { bg: 'bg-navy',  text: 'text-ivory',bar: '#000b3a' },
};

function EventIcon({ name, ...props }) {
  const Icon = LucideIcons[name] || LucideIcons.Cog;
  return <Icon {...props} />;
}

function EventCard({ event, onOpen, i }) {
  const accent = ACCENT[event.category] || ACCENT['senior-design'];
  return (
    <motion.button
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: i * 0.06, duration: 0.55, ease: [0.16,1,0.3,1] }}
      onClick={() => onOpen(event)}
      className="text-left group w-full relative overflow-hidden flex flex-col
                 transition-colors duration-300 hover:bg-white/4"
      style={{ background: '#020c2a', borderLeft: `2px solid ${accent.bar}` }}
    >
      <div className="p-7 flex flex-col flex-1">
        {/* Category label */}
        <div className="font-display font-extrabold text-[9px] uppercase tracking-[0.28em]
                        text-ivory/30 mb-5">
          {event.category.replace(/-/g, ' ')}
        </div>

        {/* Icon — sharp square */}
        <div className="w-10 h-10 flex items-center justify-center mb-5 shrink-0"
             style={{ background: accent.bar, color: '#000b3a' }}>
          <EventIcon name={event.icon} size={18} />
        </div>

        <h3 className="font-display font-extrabold text-xl text-ivory leading-tight mb-3">{event.name}</h3>
        <p className="font-display text-ivory/45 text-[13px] leading-relaxed line-clamp-2 flex-1">{event.tagline}</p>

        <div className="mt-6 pt-5 border-t border-ivory/8 flex items-center justify-between">
          <div className="flex gap-4 text-[10px] font-display uppercase tracking-[0.18em] text-ivory/35">
            <span className="flex items-center gap-1"><Users size={11} /> {event.teamSize}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {event.duration}</span>
          </div>
          <div className="w-7 h-7 bg-gold/10 text-gold flex items-center justify-center
                          group-hover:bg-gold group-hover:text-navy transition-colors duration-200">
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function EventModal({ event, onClose }) {
  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 z-[60] bg-navy/80 backdrop-blur-sm
                     flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={e => e.stopPropagation()}
            className="bg-ivory rounded-3xl max-w-2xl w-full max-h-[88vh]
                       overflow-y-auto shadow-[0_32px_80px_-16px_rgba(0,11,58,0.6)]
                       relative"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 32, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16,1,0.3,1] }}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 w-10 h-10 rounded-full z-10
                         bg-ivory border border-navy/15 text-navy
                         flex items-center justify-center
                         hover:bg-navy hover:text-ivory transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal header */}
            <div className="rounded-t-3xl p-8 md:p-10 relative overflow-hidden bg-navy text-ivory">
              <img
                src="/assets/photo-prairie-sunset.webp"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,11,58,0.85) 0%, rgba(0,11,58,0.55) 55%, rgba(0,11,58,0.9) 100%)',
                }}
              />
              <div className="relative">
                <div className="chip-ghost-light text-[10px] mb-4">
                  {event.category.replace(/-/g, ' ')}
                </div>
                <h2 className="heading-xl text-ivory">{event.name}</h2>
                <p className="mt-3 body-lg text-ivory/75">{event.tagline}</p>
              </div>
            </div>

            <div className="p-8 md:p-10 space-y-8">
              <p className="body text-navy/80">{event.description}</p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { Icon: Clock, label: 'Duration', val: event.duration, bg: 'bg-sky/20' },
                  { Icon: Users, label: 'Team size', val: event.teamSize, bg: 'bg-sky/20' },
                  { Icon: DollarSign, label: 'Prize pool',
                    val: `$${event.prizePool?.toLocaleString()} CAD`, bg: 'bg-gold/25' },
                ].map(({ Icon, label, val, bg }) => (
                  <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
                    <Icon className="mx-auto text-navy/60" size={18} />
                    <div className="kicker mt-2">{label}</div>
                    <div className="mt-1 font-display font-bold text-navy text-sm leading-tight">
                      {val}
                    </div>
                  </div>
                ))}
              </div>

              {event.rules?.length > 0 && (
                <div>
                  <div className="section-header mb-3">Rules</div>
                  <ul className="space-y-2">
                    {event.rules.map((r, i) => (
                      <li key={i} className="flex gap-3 body text-navy/75">
                        <span className="text-gold font-bold mt-0.5">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.deliverables?.length > 0 && (
                <div>
                  <div className="section-header mb-3">Deliverables</div>
                  <ul className="space-y-2">
                    {event.deliverables.map((r, i) => (
                      <li key={i} className="flex gap-3 body text-navy/75">
                        <span className="text-sky-600 font-bold mt-0.5">✓</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Events() {
  const { data, loading, error, refetch } = useApi(() => api.getEvents(), []);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PageHero
        kicker="Competitions"
        title="Eight ways to compete"
        subtitle="From rapid design sprints to parliamentary debate: a category for every kind of engineer."
      />

      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: '#020c2a' }}>
        {/* Gold grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,214,0,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(255,214,0,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="pointer-events-none absolute bottom-20 -right-10 opacity-20">
          <WheatDecor size={180} color="#ffd600" rotate={8} />
        </div>

        <div className="container-page relative z-10">
          {loading && <LoadingSpinner label="Loading competitions…" />}

          {!loading && (
            <>
              {/* Use API data if available, otherwise show placeholder */}
              {(data?.events?.length > 0 || error) && (
                <div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px"
                  style={{ background: 'rgba(255,214,0,0.08)' }}
                >
                  {(data?.events?.length > 0 ? data.events : PLACEHOLDER_EVENTS).map((e, i) => (
                    <EventCard key={e._id} event={e} i={i} onOpen={setSelected} />
                  ))}
                </div>
              )}
              {!data?.events?.length && !error && (
                <div
                  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px"
                  style={{ background: 'rgba(255,214,0,0.08)' }}
                >
                  {PLACEHOLDER_EVENTS.map((e, i) => (
                    <EventCard key={e._id} event={e} i={i} onOpen={setSelected} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <EventModal event={selected} onClose={() => setSelected(null)} />
    </>
  );
}
