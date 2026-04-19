import mongoose from 'mongoose';

const TIERS = ['platinum', 'gold', 'silver', 'bronze', 'partner'];

const SponsorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    tier: { type: String, enum: TIERS, required: true },
    logoUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    blurb: { type: String, default: '' },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

SponsorSchema.index({ tier: 1, displayOrder: 1 });

export const SPONSOR_TIERS = TIERS;
export default mongoose.model('Sponsor', SponsorSchema);
