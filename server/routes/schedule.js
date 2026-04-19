import { Router } from 'express';
import ScheduleItem from '../models/ScheduleItem.js';
import { dbReady } from '../db.js';

const router = Router();

router.get('/', async (req, res, next) => {
  if (!dbReady()) return res.status(503).json({ error: 'Database not connected' });
  try {
    const filter = {};
    if (req.query.day) {
      const day = Number(req.query.day);
      if (!Number.isInteger(day) || day < 1 || day > 3) {
        return res.status(400).json({ error: 'day must be 1, 2, or 3' });
      }
      filter.day = day;
    }

    const items = await ScheduleItem.find(filter)
      .sort({ day: 1, order: 1, startTime: 1 })
      .lean();

    // Group by day
    const map = new Map();
    for (const item of items) {
      if (!map.has(item.day)) {
        map.set(item.day, { day: item.day, dayLabel: item.dayLabel, items: [] });
      }
      map.get(item.day).items.push(item);
    }

    res.json({ schedule: [...map.values()].sort((a, b) => a.day - b.day) });
  } catch (err) {
    next(err);
  }
});

export default router;
