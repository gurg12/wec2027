import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';

import PageHero from '../components/ui/PageHero.jsx';
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx';
import { useApi } from '../hooks/useApi.js';
import { api } from '../api.js';
import WheatDecor from '../components/decor/WheatDecor.jsx';

// Placeholder schedule shown when API is unavailable
const PLACEHOLDER_SCHEDULE = [
  { day: 1, dayLabel: 'Friday — Arrival', items: [
    { _id:'s01', title:'Delegate Check-In',    category:'social',      startTime:'14:00', endTime:'18:00', location:'DoubleTree Hotel Lobby',  description:'Pick up your welcome package and meet delegates from across Western Canada.' },
    { _id:'s02', title:'Opening Ceremonies',   category:'ceremony',    startTime:'19:00', endTime:'20:30', location:'Conexus Arts Centre',     description:'Keynote address, introduction of competitions, and welcome from the University of Regina.' },
    { _id:'s03', title:'Welcome Social',       category:'social',      startTime:'20:30', endTime:'23:00', location:'Hotel Atrium',            description:'Network with fellow engineers from every Western Canadian school.' },
  ]},
  { day: 2, dayLabel: 'Saturday — Competition Day', items: [
    { _id:'s04', title:'Breakfast',            category:'meal',        startTime:'07:30', endTime:'08:30', location:'Hotel Dining Room',        description:'' },
    { _id:'s05', title:'Competition Block 1',  category:'competition', startTime:'09:00', endTime:'13:00', location:'Engineering Building',     description:'Junior Design, Senior Design, Consulting, Communications.' },
    { _id:'s06', title:'Lunch',                category:'meal',        startTime:'13:00', endTime:'14:00', location:'Hotel Dining Room',        description:'' },
    { _id:'s07', title:'Keynote: Prairie Engineering', category:'keynote', startTime:'14:15', endTime:'15:00', location:'Main Auditorium',     description:'Guest speaker on the future of rural infrastructure in Western Canada.' },
    { _id:'s08', title:'Competition Block 2',  category:'competition', startTime:'15:15', endTime:'19:00', location:'Engineering Building',     description:'Programming, Debate, Re-Engineering, Innovative Design (ongoing).' },
    { _id:'s09', title:'Dinner',               category:'meal',        startTime:'19:00', endTime:'20:00', location:'Hotel Dining Room',        description:'' },
    { _id:'s10', title:'Night Social',         category:'social',      startTime:'20:30', endTime:'24:00', location:'TBD',                     description:'Annual WEC social night.' },
  ]},
  { day: 3, dayLabel: 'Sunday — Gala Day', items: [
    { _id:'s11', title:'Brunch',               category:'meal',        startTime:'09:00', endTime:'10:30', location:'Hotel Dining Room',        description:'' },
    { _id:'s12', title:'Innovative Design Presentations', category:'competition', startTime:'10:30', endTime:'13:00', location:'Engineering Atrium', description:'Teams present their 24-hour prototypes to judges and delegates.' },
    { _id:'s13', title:'Awards Gala',          category:'gala',        startTime:'18:00', endTime:'22:00', location:'Conexus Arts Centre',      description:'Formal dinner, competition results, and the closing ceremony of WEC 2027.' },
  ]},
];

const CATEGORY_META = {
  competition: { chip:'chip-gold',    dot:'bg-gold'  },
  social:      { chip:'chip-sky',     dot:'bg-sky'   },
  ceremony:    { chip:'chip-navy',    dot:'bg-navy'  },
  meal:        { chip:'chip-ghost',   dot:'bg-navy/30' },
  keynote:     { chip:'chip-navy',    dot:'bg-navy'  },
  gala:        { chip:'chip-gold',    dot:'bg-gold'  },
};

function TimelineItem({ item, i }) {
  const meta = CATEGORY_META[item.category] || CATEGORY_META.meal;
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: i * 0.04, ease: [0.16,1,0.3,1] }}
      className="group grid grid-cols-[auto_1fr] gap-6 py-6 px-6
                 border-b border-ivory/8 last:border-0 relative"
    >
      {/* Timeline spine dot */}
      <div className="flex flex-col items-center gap-2 pt-1 w-20 shrink-0">
        <div className={`w-2 h-2 ${meta.dot}`} />
        <div className="font-display font-extrabold text-ivory text-base leading-none">
          {item.startTime}
        </div>
        <div className="text-[10px] text-ivory/35 font-display tracking-wide">→ {item.endTime}</div>
      </div>

      <div className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={meta.chip}>{item.category}</span>
        </div>
        <h3 className="font-display font-extrabold text-ivory text-lg md:text-2xl leading-tight">{item.title}</h3>
        {item.description && (
          <p className="mt-2 font-display text-ivory/50 text-[13px] leading-relaxed text-pretty max-w-xl">{item.description}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-5 font-display text-[10px] uppercase tracking-[0.18em] text-ivory/30">
          {item.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={11} /> {item.location}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock size={11} /> {item.startTime}–{item.endTime}
          </span>
        </div>
      </div>
    </motion.li>
  );
}

function DayTab({ day, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative font-display font-extrabold uppercase text-xs
                  tracking-[0.22em] px-6 py-3 transition-all duration-200
                  ${active
                    ? 'bg-gold text-navy'
                    : 'text-ivory/50 hover:text-ivory border border-ivory/15 hover:border-ivory/35'}`}
    >
      {day === 'all' ? 'All' : `Day ${day}`}
      {active && day !== 'all' && (
        <motion.div
          layoutId="day-tab-indicator"
          className="absolute inset-0 rounded-full bg-navy -z-10"
        />
      )}
    </button>
  );
}

export default function Schedule() {
  const { data, loading, error } = useApi(() => api.getSchedule(), []);
  const [active, setActive] = useState('all');

  // Use API data when available, otherwise fall back to placeholder
  const days = data?.schedule?.length > 0 ? data.schedule : (!loading ? PLACEHOLDER_SCHEDULE : []);

  const filtered = useMemo(
    () => active === 'all' ? days : days.filter(d => d.day === active),
    [days, active]
  );

  return (
    <>
      <PageHero
        kicker="Schedule"
        title="Three prairie days"
        subtitle="Opening ceremonies, competitions, social nights, and the closing Awards Gala."
      />

      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: '#020c2a' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,214,0,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(255,214,0,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="pointer-events-none absolute top-20 -right-10 opacity-15 hidden md:block">
          <WheatDecor size={220} color="#ffd600" rotate={8} />
        </div>
        <div className="container-page relative z-10">
          {loading && <LoadingSpinner label="Loading schedule…" />}

          {!loading && days.length > 0 && (
            <>
              {/* Day filter tabs */}
              <div className="flex flex-wrap gap-3 mb-14">
                <DayTab day="all" active={active==='all'} onClick={() => setActive('all')} />
                {days.map(d => (
                  <DayTab key={d.day} day={d.day} active={active===d.day}
                          onClick={() => setActive(d.day)} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0  }}
                  exit={{    opacity: 0, y:-12  }}
                  transition={{ duration: 0.22 }}
                  className="space-y-10"
                >
                  {filtered.map(d => (
                    <div key={d.day} className="relative">
                      {/* Day header */}
                      <div className="flex items-center gap-5 mb-8 relative">
                        <span className="font-display font-extrabold leading-none select-none
                                         absolute -top-4 left-0 pointer-events-none"
                              style={{ fontSize: '8rem', color: 'rgba(255,255,255,0.025)' }}>
                          {d.day}
                        </span>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="h-px w-5 bg-gold" />
                            <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.3em] text-gold/70">
                              Day {d.day}
                            </span>
                          </div>
                          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ivory leading-tight">
                            {d.dayLabel}
                          </h2>
                        </div>
                        <div className="flex-1 h-px bg-gold/15 ml-4 hidden sm:block" />
                        <div className="font-display text-[10px] uppercase tracking-[0.2em] text-ivory/25 hidden sm:block">
                          {d.items.length} events
                        </div>
                      </div>

                      <div className="border border-gold/10" style={{ background: '#020c2a' }}>
                        <ol>{d.items.map((item, i) => (
                          <TimelineItem key={item._id} item={item} i={i} />
                        ))}</ol>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </div>
      </section>
    </>
  );
}
