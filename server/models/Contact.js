import mongoose from 'mongoose';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: { validator: (v) => EMAIL_RE.test(v), message: 'Invalid email' },
    },
    subject: { type: String, default: '', maxlength: 200 },
    message: { type: String, required: true, maxlength: 2000 },
    handled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Contact', ContactSchema);
