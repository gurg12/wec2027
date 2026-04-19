import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Contact from '../models/Contact.js';
import { dbReady } from '../db.js';

const router = Router();

// 5 submissions per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions, please slow down.' },
});

router.post('/', limiter, async (req, res, next) => {
  if (!dbReady()) return res.status(503).json({ error: 'Database not connected' });
  try {
    const { name, email, subject = '', message, website } = req.body || {};

    // Honeypot: bots fill this hidden field, humans don't
    if (website) return res.status(201).json({ ok: true });

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' });
    }

    await Contact.create({ name, email, subject, message });
    res.status(201).json({ ok: true });
  } catch (err) {
    if (err?.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

export default router;
