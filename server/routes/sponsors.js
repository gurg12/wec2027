import { Router } from 'express';
import Sponsor, { SPONSOR_TIERS } from '../models/Sponsor.js';
import { dbReady } from '../db.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  if (!dbReady()) return res.status(503).json({ error: 'Database not connected' });
  try {
    const sponsors = await Sponsor.find({ isActive: true })
      .sort({ displayOrder: 1 })
      .lean();

    const grouped = SPONSOR_TIERS.map((tier) => ({
      tier,
      sponsors: sponsors.filter((s) => s.tier === tier),
    })).filter((g) => g.sponsors.length > 0);

    res.json({ sponsors: grouped });
  } catch (err) {
    next(err);
  }
});

export default router;
