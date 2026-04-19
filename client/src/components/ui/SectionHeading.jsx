import { motion } from 'framer-motion';

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : '';
  const maxW = align === 'center' ? 'max-w-2xl' : 'max-w-3xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`${alignCls} ${maxW} ${className}`}
    >
      {kicker && (
        <div className={`kicker ${light ? 'text-gold' : ''}`}>{kicker}</div>
      )}
      <h2
        className={`heading-lg mt-3 ${light ? 'text-ivory' : 'text-navy'} text-balance`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 body-lg ${
            light ? 'text-ivory/80' : 'text-navy/70'
          } text-pretty`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
