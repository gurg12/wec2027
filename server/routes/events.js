import { Router } from 'express';
import Event from '../models/Event.js';
import { dbReady } from '../db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  if (!dbReady()) return res.status(503).json({ error: 'Database not connected' });
  try {
    const events = await Event.find({ isActive: true }).sort({ order: 1 }).lean();
    res.json({ events });
  } catch (err) {
    next(err);
  }
});

router.get('/:slug', async (req, res, next) => {
  if (!dbReady()) return res.status(503).json({ error: 'Database not connected' });
  try {
    const event = await Event.findOne({ slug: req.params.slug, isActive: true }).lean();
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ event });
  } catch (err) {
    next(err);
  }
});

export default router;
