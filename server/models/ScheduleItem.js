import mongoose from 'mongoose';

const ScheduleItemSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true, min: 1, max: 3 },
    dayLabel: { type: String, required: true },
    startTime: { type: String, required: true }, // "09:00"
    endTime: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
    category: {
      type: String,
      enum: ['competition', 'social', 'ceremony', 'meal', 'keynote', 'gala'],
      required: true,
    },
    relatedEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', default: null },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ScheduleItemSchema.index({ day: 1, order: 1 });

export default mongoose.model('ScheduleItem', ScheduleItemSchema);
