import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Sharp photographic page hero — morning sky with parallax.
 * Dark editorial aesthetic: no rounded corners, gold hairlines, ghost type.
 */
export default function PageHero({ kicker, title, subtitle, children, photo = 'photo-sun-halo.webp' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section ref={ref} className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden bg-navy">
      {/* Parallax photo */}
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <img
          src={`/assets/${photo}`}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        {/* Morning tint → deep navy at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(15,40,100,0.60) 0%, rgba(126,185,239,0.12) 30%, rgba(0,11,58,0.75) 60%, rgba(0,11,58,0.98) 100%)',
          }}
        />
      </motion.div>

      {/* Top gold hairline */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none z-20"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,214,0,0.55) 30%, rgba(255,214,0,0.55) 70%, transparent)' }}
      />

      {/* Diagonal bottom exit into next section */}
      <div
        className="absolute bottom-0 inset-x-0 pointer-events-none"
        style={{
          height: '5vw',
          background: 'linear-gradient(to bottom right, transparent 50%, #020c2a 50%)',
        }}
      />

      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          {kicker && (
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="kicker text-gold">{kicker}</span>
            </div>
          )}
          <h1 className="heading-display text-ivory leading-[0.9] tracking-[-0.03em]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 font-display text-ivory/60 text-[14px] leading-relaxed max-w-2xl
                          border-l-2 border-ivory/20 pl-5 text-pretty">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
