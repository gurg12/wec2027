/**
 * Seeds the WEC 2027 database with realistic placeholder data.
 * Run with:  npm run seed   (from /server)   or   npm run seed  (from root)
 *
 * Safe to re-run — it drops only the collections it manages.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../db.js';
import Event from '../models/Event.js';
import ScheduleItem from '../models/ScheduleItem.js';
import Sponsor from '../models/Sponsor.js';

// ---------------- Competition categories ----------------
const events = [
  {
    slug: 'junior-design',
    name: 'Junior Design',
    category: 'junior-design',
    tagline: 'First-and-second-year teams tackle a hands-on design sprint.',
    description:
      'Junior Design challenges first- and second-year engineering students to rapidly prototype a working solution to a real prairie problem — from grain-silo sensors to off-grid water filtration. Teams plan, build, and present in under six hours.',
    rules: [
      'Teams of 2–4, all members in first or second year',
      'No electronics prepared in advance beyond supplied kit',
      'Final pitch capped at 5 minutes + 3 minutes Q&A',
    ],
    deliverables: ['Working prototype', 'One-page design brief', 'Live 5-minute pitch'],
    duration: '6 hours',
    teamSize: '2–4 students',
    prizePool: 1500,
    icon: 'Wrench',
    order: 1,
  },
  {
    slug: 'senior-design',
    name: 'Senior Design',
    category: 'senior-design',
    tagline: 'Upper-year students engineer a deep-technical solution end to end.',
    description:
      'Senior Design is the conference flagship: third- and fourth-year students deliver a full-depth technical design against a complex open problem, judged on engineering rigour, feasibility, and prairie-community impact.',
    rules: [
      'Teams of 2–4, at least one member in third year or above',
      'Teams may bring tools and laptops; fabrication kit supplied',
      'Deliverables submitted before the pitch window',
    ],
    deliverables: [
      'Technical design report',
      'Physical or software prototype',
      '10-minute pitch + 5 minutes Q&A',
    ],
    duration: '8 hours',
    teamSize: '2–4 students',
    prizePool: 2500,
    icon: 'Cog',
    order: 2,
  },
  {
    slug: 'consulting',
    name: 'Consulting',
    category: 'consulting',
    tagline: 'Engineering-minded case competition with a real prairie client.',
    description:
      'Teams receive a live client brief from a rural Saskatchewan business and have four hours to scope, analyse, and recommend a path forward. Communication and commercial judgement matter as much as the technical answer.',
    rules: [
      'Teams of 3–4',
      'Blind case release at the start window',
      'Presentation deck and executive summary required',
    ],
    deliverables: ['Slide deck', 'One-page executive summary', '10-minute client pitch'],
    duration: '4 hours',
    teamSize: '3–4 students',
    prizePool: 2000,
    icon: 'Briefcase',
    order: 3,
  },
  {
    slug: 'communications',
    name: 'Communications',
    category: 'communications',
    tagline: 'Make a hard engineering idea land with a general audience.',
    description:
      'Individuals are given a technical paper and two hours to distil it into a compelling, accessible talk. Judged on clarity, accuracy, and presence.',
    rules: [
      'Individual competition',
      'Topic assigned at the start window',
      'No slides — voice + one whiteboard only',
    ],
    deliverables: ['8-minute talk', '2-minute Q&A'],
    duration: '2 hours prep + live delivery',
    teamSize: 'Individual',
    prizePool: 1200,
    icon: 'Mic',
    order: 4,
  },
  {
    slug: 'programming',
    name: 'Programming',
    category: 'programming',
    tagline: 'Algorithmic problems, judged on correctness and speed.',
    description:
      'A 4-hour algorithmic contest on a curated set of problems ranging from graph traversal to ML-lite heuristics. Language-agnostic; solutions judged by automated test harness.',
    rules: [
      'Teams of 2',
      'One laptop per team, internet disabled',
      'Standard libraries only',
    ],
    deliverables: ['Accepted solutions against the judge'],
    duration: '4 hours',
    teamSize: '2 students',
    prizePool: 1500,
    icon: 'Cpu',
    order: 5,
  },
  {
    slug: 'innovative-design',
    name: 'Innovative Design',
    category: 'innovative-design',
    tagline: 'Blue-sky engineering — the most original idea wins.',
    description:
      'Teams pitch a novel engineering concept tied to the Rural Innovation theme. Feasibility matters, but originality and potential community impact are the headline criteria.',
    rules: [
      'Teams of 2–5',
      'Idea must have been developed within the last 8 months',
      'No prototype required — concept pitch only',
    ],
    deliverables: ['Concept pitch', 'Feasibility one-pager'],
    duration: '2 hours + live pitch',
    teamSize: '2–5 students',
    prizePool: 2000,
    icon: 'Lightbulb',
    order: 6,
  },
  {
    slug: 'debate',
    name: 'Debate',
    category: 'debate',
    tagline: 'Engineering ethics and policy, argued under pressure.',
    description:
      'Parliamentary-style debate on resolutions drawn from engineering ethics, climate policy, and rural development. Teams receive side assignments 30 minutes before each round.',
    rules: [
      'Teams of 2',
      'Three preliminary rounds + knockout finals',
      'British Parliamentary format',
    ],
    deliverables: ['Live rounds — no written submission'],
    duration: 'Full conference day',
    teamSize: '2 students',
    prizePool: 1200,
    icon: 'MessagesSquare',
    order: 7,
  },
  {
    slug: 're-engineering',
    name: 'Re-Engineering',
    category: 're-engineering',
    tagline: 'Take something broken, make it better.',
    description:
      'Teams receive an existing product with documented flaws and have six hours to redesign, prototype, and justify the improvements. Heavy emphasis on root-cause thinking and cost-aware design.',
    rules: [
      'Teams of 2–4',
      'Supplied product kit, provided materials only',
      'Design justification must reference original failure modes',
    ],
    deliverables: ['Re-engineered prototype', 'Before/after design memo', 'Live demo'],
    duration: '6 hours',
    teamSize: '2–4 students',
    prizePool: 1800,
    icon: 'Settings',
    order: 8,
  },
];

// ---------------- Schedule (3-day conference, Jan 2027) ----------------
const DAY_LABELS = {
  1: 'Friday, January 22 2027',
  2: 'Saturday, January 23 2027',
  3: 'Sunday, January 24 2027',
};

const schedule = [
  // --- Day 1 ---
  { day: 1, startTime: '14:00', endTime: '17:00', title: 'Delegate Check-in & Registration', location: 'Riddell Centre Atrium', category: 'ceremony', description: 'Pick up your delegate package, swag, and competition briefings.' },
  { day: 1, startTime: '17:30', endTime: '19:00', title: 'Opening Ceremonies', location: 'Education Auditorium', category: 'ceremony', description: 'Welcome, land acknowledgement, and the Rural Innovation keynote.' },
  { day: 1, startTime: '19:00', endTime: '20:30', title: 'Welcome Dinner', location: 'Riddell Centre Ballroom', category: 'meal', description: 'Prairie-inspired menu and first chance to meet your competitors.' },
  { day: 1, startTime: '20:30', endTime: '23:00', title: 'Industry Mixer', location: 'Owl Pub', category: 'social', description: 'Meet sponsor engineers over drinks and networking games.' },

  // --- Day 2 ---
  { day: 2, startTime: '07:30', endTime: '08:30', title: 'Breakfast', location: 'Riddell Ballroom', category: 'meal' },
  { day: 2, startTime: '09:00', endTime: '15:00', title: 'Senior Design — Build Window', location: 'ED 191', category: 'competition', description: 'Eight hours on the clock for the flagship competition.' },
  { day: 2, startTime: '09:00', endTime: '15:00', title: 'Junior Design — Build Window', location: 'ED 514', category: 'competition' },
  { day: 2, startTime: '09:00', endTime: '13:00', title: 'Consulting — Case Window', location: 'ED 620', category: 'competition' },
  { day: 2, startTime: '09:00', endTime: '13:00', title: 'Programming Contest', location: 'CL 435', category: 'competition' },
  { day: 2, startTime: '12:00', endTime: '13:00', title: 'Lunch (grab-and-go for competitors)', location: 'Riddell Atrium', category: 'meal' },
  { day: 2, startTime: '13:30', endTime: '15:30', title: 'Keynote: Engineering for Rural Resilience', location: 'Education Auditorium', category: 'keynote', description: 'A joint session featuring engineers working on prairie infrastructure.' },
  { day: 2, startTime: '16:00', endTime: '19:00', title: 'Pitch Rounds — All Competitions', location: 'ED Building (multiple rooms)', category: 'competition' },
  { day: 2, startTime: '19:30', endTime: '22:00', title: 'Social Night: Curling + Bonfire', location: 'Callie Curling Club', category: 'social', description: 'A very Saskatchewan evening. Transport provided.' },

  // --- Day 3 ---
  { day: 3, startTime: '08:00', endTime: '09:30', title: 'Breakfast & Sponsor Fair', location: 'Riddell Ballroom', category: 'meal' },
  { day: 3, startTime: '09:30', endTime: '12:00', title: 'Finals — Senior Design, Consulting, Innovative Design', location: 'Education Auditorium', category: 'competition' },
  { day: 3, startTime: '12:00', endTime: '13:30', title: 'Delegate Lunch', location: 'Riddell Atrium', category: 'meal' },
  { day: 3, startTime: '13:30', endTime: '15:30', title: 'Panel: Careers in Prairie Engineering', location: 'ED Auditorium', category: 'keynote' },
  { day: 3, startTime: '18:00', endTime: '23:00', title: 'Awards Gala', location: 'Hotel Saskatchewan — Adam Ballroom', category: 'gala', description: 'Dinner, awards, and closing remarks. Formal attire.' },
];

// ---------------- Sponsors (placeholder) ----------------
const sponsors = [
  // Platinum
  { name: 'Nutrien',                  tier: 'platinum', websiteUrl: 'https://www.nutrien.com', blurb: 'Global agricultural solutions; proud prairie roots.', displayOrder: 1 },
  { name: 'SaskPower',                tier: 'platinum', websiteUrl: 'https://www.saskpower.com', blurb: 'Powering Saskatchewan communities since 1929.', displayOrder: 2 },

  // Gold
  { name: 'SaskTel',                  tier: 'gold', websiteUrl: 'https://www.sasktel.com', displayOrder: 1 },
  { name: 'Cameco',                   tier: 'gold', websiteUrl: 'https://www.cameco.com', displayOrder: 2 },
  { name: 'Federated Co-operatives',  tier: 'gold', websiteUrl: 'https://www.fcl.crs', displayOrder: 3 },

  // Silver
  { name: 'Graham Construction',      tier: 'silver', websiteUrl: 'https://www.grahambuilds.com', displayOrder: 1 },
  { name: 'Mosaic Company',           tier: 'silver', websiteUrl: 'https://www.mosaicco.com', displayOrder: 2 },
  { name: 'PCL Construction',         tier: 'silver', websiteUrl: 'https://www.pcl.com', displayOrder: 3 },
  { name: 'ISM Canada',               tier: 'silver', websiteUrl: 'https://www.ismcanada.com', displayOrder: 4 },

  // Bronze
  { name: 'Vendasta',                 tier: 'bronze', websiteUrl: 'https://www.vendasta.com', displayOrder: 1 },
  { name: '7shifts',                  tier: 'bronze', websiteUrl: 'https://www.7shifts.com', displayOrder: 2 },
  { name: 'Coconut Software',         tier: 'bronze', websiteUrl: 'https://www.coconutsoftware.com', displayOrder: 3 },
  { name: 'SED Systems',              tier: 'bronze', websiteUrl: 'https://www.sedsystems.ca', displayOrder: 4 },

  // Partners (non-monetary)
  { name: 'University of Regina',     tier: 'partner', websiteUrl: 'https://www.uregina.ca', displayOrder: 1 },
  { name: 'Engineers Canada',         tier: 'partner', websiteUrl: 'https://engineerscanada.ca', displayOrder: 2 },
];

async function seed() {
  const ok = await connectDB();
  if (!ok) {
    console.error('[seed] cannot seed: MongoDB not reachable. Check MONGODB_URI.');
    process.exit(1);
  }

  console.log('[seed] clearing existing collections…');
  await Promise.all([
    Event.deleteMany({}),
    ScheduleItem.deleteMany({}),
    Sponsor.deleteMany({}),
  ]);

  console.log('[seed] inserting events…');
  const eventDocs = await Event.insertMany(events);
  const bySlug = new Map(eventDocs.map((e) => [e.slug, e]));

  console.log('[seed] inserting schedule…');
  const scheduleDocs = schedule.map((s, i) => {
    const relatedEvent =
      s.category === 'competition' && bySlug.get(s.title.toLowerCase().split(' — ')[0].replace(/\s+/g, '-'))
        ? bySlug.get(s.title.toLowerCase().split(' — ')[0].replace(/\s+/g, '-'))._id
        : null;
    return {
      ...s,
      dayLabel: DAY_LABELS[s.day],
      order: i,
      relatedEvent,
    };
  });
  await ScheduleItem.insertMany(scheduleDocs);

  console.log('[seed] inserting sponsors…');
  await Sponsor.insertMany(sponsors);

  console.log('[seed] done ✔');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(async (err) => {
  console.error('[seed] failed:', err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
