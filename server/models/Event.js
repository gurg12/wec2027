import mongoose from 'mongoose';

const CATEGORIES = [
  'junior-design',
  'senior-design',
  'consulting',
  'communications',
  'programming',
  'innovative-design',
  'debate',
  're-engineering',
];

const EventSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, enum: CATEGORIES, required: true },
    tagline: { type: String, default: '' },
    description: { type: String, default: '' },
    rules: { type: [String], default: [] },
    deliverables: { type: [String], default: [] },
    duration: { type: String, default: '' },
    teamSize: { type: String, default: '' },
    prizePool: { type: Number, default: 0 },
    icon: { type: String, default: 'Wrench' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

EventSchema.index({ order: 1 });

export const EVENT_CATEGORIES = CATEGORIES;
export default mongoose.model('Event', EventSchema);
