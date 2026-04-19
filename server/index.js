import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB, dbReady } from './db.js';
import eventsRouter from './routes/events.js';
import scheduleRouter from './routes/schedule.js';
import sponsorsRouter from './routes/sponsors.js';
import contactsRouter from './routes/contacts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ----- Core middleware -----
app.use(
  helmet({
    // Allow inline SVG backgrounds + Google Fonts
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());
app.use(express.json({ limit: '100kb' }));

const origins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim());
app.use(cors({ origin: origins, credentials: false }));

if (NODE_ENV !== 'test') app.use(morgan('tiny'));

// ----- Health -----
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    db: dbReady() ? 'connected' : 'disconnected',
    env: NODE_ENV,
  });
});

// ----- API routes -----
app.use('/api/events', eventsRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/sponsors', sponsorsRouter);
app.use('/api/contacts', contactsRouter);

// ----- Static frontend (production) -----
if (NODE_ENV === 'production') {
  const clientDist = path.resolve(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// ----- Error handler -----
app.use((err, _req, res, _next) => {
  console.error('[error]', err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

// ----- Boot -----
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`[server] listening on :${PORT} (${NODE_ENV})`);
  });
})();
