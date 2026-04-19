import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Instagram, Linkedin, MapPin, Send, ChevronDown } from 'lucide-react';

import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Button from '../components/ui/Button.jsx';
import { api } from '../api.js';
import WheatDecor from '../components/decor/WheatDecor.jsx';

const FAQS = [
  { q:'Who can compete at WEC 2027?',
    a:'Undergraduate engineering students from any school across Western Canada (BC, AB, SK, MB). Some categories restrict to first/second-year (Junior Design) or upper-years (Senior Design).' },
  { q:'How do teams register?',
    a:"Registration opens through your school's engineering student society. Each society receives a delegate cap. Contact your VP External or Competitions Chair to get on the list." },
  { q:'Do winners qualify for CEC?',
    a:'Yes. Top-placing teams in each category are invited to represent Western Canada at the Canadian Engineering Competition.' },
  { q:'What does registration cover?',
    a:'Three days of competition, all meals from Friday dinner through Sunday brunch, the closing Awards Gala, and sponsor-networking events.' },
  { q:'Is travel / accommodation included?',
    a:'Accommodation is covered for out-of-province delegates. Travel is coordinated by your home society. Contact them for rideshare or flight details.' },
  { q:'How do companies sponsor?',
    a:'Email sponsorships@wec27.ca or visit the Sponsors page. Tiered packages from Bronze through Platinum, plus non-monetary partnership tracks.' },
];

function FaqAccordion() {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}
               className={`border transition-all duration-200
                           ${isOpen
                             ? 'border-gold'
                             : 'border-ivory/8 hover:border-ivory/20'}`}
               style={{ background: isOpen ? 'rgba(255,214,0,0.05)' : '#020c2a' }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display font-extrabold text-ivory text-base md:text-lg">
                {f.q}
              </span>
              <ChevronDown size={18}
                className={`shrink-0 transition-transform duration-300
                            ${isOpen ? 'rotate-180 text-gold' : 'text-ivory/30'}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height:0, opacity:0 }}
                  animate={{ height:'auto', opacity:1 }}
                  exit={{    height:0, opacity:0 }}
                  transition={{ duration:0.25, ease:'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6 font-display text-ivory/55 text-[13px] leading-relaxed">
                    {f.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function ContactForm() {
  const [state, setState]     = useState({ name:'', email:'', subject:'', message:'', website:'' });
  const [submitting, setSub]  = useState(false);
  const [sent, setSent]       = useState(false);
  const [err,  setErr]        = useState(null);

  const onChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setErr(null);
    if (!state.name || !state.email || !state.message) {
      setErr('Please fill in your name, email, and message.'); return;
    }
    setSub(true);
    try {
      await api.postContact(state);
      setSent(true);
      toast.success("Message sent. We'll be in touch!");
      setState({ name:'', email:'', subject:'', message:'', website:'' });
    } catch (error) {
      setErr(error.message || 'Something went wrong.');
      toast.error('Could not send message.');
    } finally { setSub(false); }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gold/20 p-12 text-center"
        style={{ background: 'rgba(255,214,0,0.04)' }}
      >
        <div className="w-14 h-14 bg-gold text-navy mx-auto flex items-center justify-center mb-6">
          <Send size={22} />
        </div>
        <h3 className="font-display font-extrabold text-2xl text-ivory mb-3">Message received.</h3>
        <p className="font-display text-ivory/50 text-[13px] leading-relaxed">
          A WEC organiser will reply within a few business days.
        </p>
        <button className="mt-7 btn-gold-outline" onClick={() => setSent(false)}>
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot */}
      <input type="text" name="website" value={state.website} onChange={onChange}
             tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid md:grid-cols-2 gap-5">
        <label className="block">
          <span className="font-display font-extrabold text-[10px] uppercase tracking-[0.22em] text-ivory/50">Name</span>
          <input type="text" name="name" required value={state.name} onChange={onChange}
                 className="mt-2 w-full rounded-xl border-navy/20 bg-white
                            focus:border-gold focus:ring-gold/30 bg-[#020c2a] border-ivory/15 text-ivory placeholder:text-ivory/30"
                 placeholder="Jane Smith" />
        </label>
        <label className="block">
          <span className="font-display font-extrabold text-[10px] uppercase tracking-[0.22em] text-ivory/50">Email</span>
          <input type="email" name="email" required value={state.email} onChange={onChange}
                 className="mt-2 w-full rounded-xl border-navy/20 bg-white
                            focus:border-gold focus:ring-gold/30 bg-[#020c2a] border-ivory/15 text-ivory placeholder:text-ivory/30"
                 placeholder="you@uni.ca" />
        </label>
      </div>

      <label className="block">
        <span className="font-display font-extrabold text-[10px] uppercase tracking-[0.22em] text-ivory/50">Subject</span>
        <input type="text" name="subject" value={state.subject} onChange={onChange}
               className="mt-2 w-full rounded-xl border-navy/20 bg-white
                          focus:border-gold focus:ring-gold/30 bg-[#020c2a] border-ivory/15 text-ivory placeholder:text-ivory/30"
               placeholder="Sponsorship inquiry" />
      </label>

      <label className="block">
        <span className="font-display font-extrabold text-[10px] uppercase tracking-[0.22em] text-ivory/50">Message</span>
        <textarea name="message" required rows={6} maxLength={2000}
                  value={state.message} onChange={onChange}
                  className="mt-2 w-full rounded-xl border-navy/20 bg-white
                             focus:border-navy focus:ring-navy resize-y"
                  placeholder="Tell us what's on your mind…" />
      </label>

      {err && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200
                        rounded-xl p-3">{err}</div>
      )}

      <Button type="submit" disabled={submitting} variant="primary">
        {submitting ? 'Sending…' : <><Send size={15} /> Send message</>}
      </Button>
    </form>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Say hello"
        subtitle="Delegate questions, sponsor inquiries, media requests. We read every message."
      />

      {/* Main contact section */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: '#020c2a' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,214,0,0.03) 1px, transparent 1px), linear-gradient(90deg,rgba(255,214,0,0.03) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="container-page relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-8 bg-gold" />
                <span className="kicker text-gold">Get in touch</span>
              </div>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ivory
                             leading-[1.0] tracking-[-0.02em] mb-3">
                Drop us a line.
              </h2>
              <p className="font-display text-ivory/40 text-[13px] border-l-2 border-ivory/15 pl-4 mb-10">
                Expect a reply within a few business days.
              </p>
              <div>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-5 bg-gold" />
                  <span className="kicker text-gold">Find us</span>
                </div>
                <ul className="space-y-3">
                  {[
                    { Icon:Mail,      l:'Email',     h:'mailto:chair@wec27.ca',                       v:'chair@wec27.ca' },
                    { Icon:Instagram, l:'Instagram', h:'https://instagram.com/wec2027',                  v:'@wec2027' },
                    { Icon:Linkedin,  l:'LinkedIn',  h:'https://linkedin.com/company/wec2027',            v:'WEC 2027' },
                    { Icon:MapPin,    l:'Location',  h:'https://maps.google.com/?q=University+of+Regina', v:'University of Regina' },
                  ].map(it => (
                    <li key={it.l}>
                      <a href={it.h} target="_blank" rel="noreferrer"
                         className="flex items-center gap-4 p-5 border border-gold/12
                                    transition-colors duration-300 hover:border-gold/40"
                         style={{ background: '#020c2a' }}>
                        <div className="w-10 h-10 bg-gold/10 text-gold
                                        flex items-center justify-center shrink-0">
                          <it.Icon size={17} />
                        </div>
                        <div>
                          <div className="kicker text-gold/65">{it.l}</div>
                          <div className="mt-0.5 font-display font-extrabold text-ivory text-sm">{it.v}</div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pull-quote — dark with gold accent */}
              <div className="relative overflow-hidden border-l-2 border-gold p-7"
                   style={{ background: 'rgba(255,214,0,0.05)' }}>
                <p className="font-display font-extrabold text-xl text-ivory leading-snug">
                  "Rural Innovation: Inspiring growth in small communities."
                </p>
                <div className="flex items-center gap-3 mt-4">
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

      {/* FAQ */}
      <section className="py-20 md:py-24 relative overflow-hidden border-t border-gold/8"
               style={{ background: '#030a20' }}>
        <div className="container-page relative z-10">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-display font-extrabold text-[9px] uppercase tracking-[0.36em] text-gold/55">FAQ</span>
            <div className="flex-1 h-px bg-gold/8" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-ivory
                         leading-[1.0] tracking-[-0.02em] mb-12">
            Frequently asked.
          </h2>
          <div className="max-w-3xl">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
