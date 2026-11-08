import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { WEDDING } from '../weddingConfig';

const GOLD = '#C9A13B';

/* ------------------------------- SVG artwork ------------------------------- */

const GoldDefs: React.FC<{ id: string }> = ({ id }) => (
  <defs>
    <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#F7E7A9" />
      <stop offset="45%" stopColor="#D4AF37" />
      <stop offset="100%" stopColor="#9C7A1E" />
    </linearGradient>
    <linearGradient id={`${id}-inner`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#FFFDF7" />
      <stop offset="55%" stopColor="#F3F2E4" />
      <stop offset="100%" stopColor="#D9E6D3" />
    </linearGradient>
  </defs>
);

/** Ornate gold oval frame with filigree; children are centred inside. */
const OvalFrame: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const g = `url(#${id}-gold)`;
  const flourish = (
    <g fill="none" stroke={g} strokeWidth="1.6" strokeLinecap="round">
      <path d="M100 26 C90 18 80 20 76 12 C84 14 90 10 92 4" />
      <path d="M100 26 C110 18 120 20 124 12 C116 14 110 10 108 4" />
      <path d="M100 26 C94 22 88 26 84 22" />
      <path d="M100 26 C106 22 112 26 116 22" />
      <path d="M100 4 L104 12 L100 20 L96 12 Z" fill={g} />
    </g>
  );
  const sideCurl = (
    <g fill="none" stroke={g} strokeWidth="1.6" strokeLinecap="round">
      <path d="M22 130 C12 122 12 108 20 104 C26 101 30 108 25 111" />
      <path d="M22 130 C12 138 12 152 20 156 C26 159 30 152 25 149" />
      <circle cx="16" cy="130" r="2.4" fill={g} />
    </g>
  );

  return (
    <div className="relative w-full aspect-[200/260]">
      <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full drop-shadow-[0_8px_20px_rgba(156,122,30,0.25)]" aria-hidden>
        <GoldDefs id={id} />
        <ellipse cx="100" cy="130" rx="76" ry="102" fill={`url(#${id}-inner)`} />
        <ellipse cx="100" cy="130" rx="76" ry="102" fill="none" stroke={g} strokeWidth="5" />
        <ellipse cx="100" cy="130" rx="83" ry="109" fill="none" stroke={g} strokeWidth="1.4" />
        <ellipse cx="100" cy="130" rx="70" ry="96" fill="none" stroke={g} strokeWidth="0.8" opacity="0.6" />
        {flourish}
        <g transform="translate(200 260) rotate(180)">{flourish}</g>
        {sideCurl}
        <g transform="translate(200 0) scale(-1 1)">{sideCurl}</g>
        <circle cx="100" cy="26" r="3.2" fill="#FFFFFF" stroke={g} strokeWidth="1" />
        <circle cx="100" cy="234" r="3.2" fill="#FFFFFF" stroke={g} strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[56%]">{children}</div>
      </div>
    </div>
  );
};

const TuxedoIcon: React.FC = () => (
  <svg viewBox="0 0 120 150" className="w-full h-auto" aria-hidden>
    <GoldDefs id="tux" />
    <path d="M44 20 L76 20 L60 104 Z" fill="#FFFDF7" stroke="url(#tux-gold)" strokeWidth="1" />
    <path d="M16 22 L45 20 L60 104 L40 136 L18 132 Z" fill="url(#tux-gold)" />
    <path d="M104 22 L75 20 L60 104 L80 136 L102 132 Z" fill="url(#tux-gold)" />
    <path d="M45 20 L60 104 L50 70 Z" fill="#000" opacity="0.08" />
    <path d="M47 18 L60 25 L47 32 Z" fill="url(#tux-gold)" stroke="#9C7A1E" strokeWidth="0.6" />
    <path d="M73 18 L60 25 L73 32 Z" fill="url(#tux-gold)" stroke="#9C7A1E" strokeWidth="0.6" />
    <rect x="57" y="21.5" width="6" height="7" rx="1.5" fill="#B8912C" />
    {[46, 60, 74, 88].map((y) => (
      <circle key={y} cx="60" cy={y} r="1.8" fill="#9C7A1E" />
    ))}
    <path d="M82 66 L97 63 L97 69 L82 70 Z" fill="#FFFDF7" stroke="#9C7A1E" strokeWidth="0.8" />
  </svg>
);

const BrideIcon: React.FC = () => (
  <svg viewBox="0 0 120 150" className="w-full h-auto" aria-hidden>
    <GoldDefs id="bride" />
    <g fill="none" stroke="url(#bride-gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {/* bun */}
      <circle cx="74" cy="34" r="14" />
      <path d="M66 28 C72 24 80 28 78 36 C76 42 68 40 70 34" />
      {/* face profile (facing left) */}
      <path d="M62 40 C52 40 46 46 45 54 C44 58 40 60 38 63 C40 64 42 65 42 66 C41 68 42 69 43 70 C42 72 43 74 45 75 C46 79 49 82 55 82 L57 92" />
      {/* back of head and nape */}
      <path d="M62 40 C74 44 82 54 80 66 C79 74 74 80 72 86 L73 94" />
      <path d="M64 50 C70 54 72 62 70 70" opacity="0.7" />
      {/* shoulders */}
      <path d="M57 92 C50 102 34 110 20 118 C14 122 12 130 12 140" />
      <path d="M73 94 C82 104 96 110 106 116 C112 120 114 130 114 140" />
      {/* neckline & necklace */}
      <path d="M32 132 C48 142 78 142 96 130" />
      <path d="M55 96 C60 104 68 104 74 97" />
      <circle cx="64.5" cy="103.5" r="1.6" fill="url(#bride-gold)" />
      {/* lace detail */}
      <path d="M38 132 C42 128 46 132 50 128 C54 132 58 128 62 132 C66 128 70 132 74 128 C78 132 82 128 86 130" opacity="0.6" />
      {/* earring */}
      <circle cx="61" cy="72" r="1.4" fill="url(#bride-gold)" />
    </g>
    {/* hair flower */}
    <g fill="url(#bride-gold)">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="84" cy="22" rx="2.4" ry="5" transform={`rotate(${a} 84 27)`} />
      ))}
      <circle cx="84" cy="27" r="2.2" fill="#FFFDF7" />
    </g>
  </svg>
);

const Laurel: React.FC<{ flip?: boolean }> = ({ flip }) => (
  <svg viewBox="0 0 60 40" className={`hidden sm:block w-16 h-auto ${flip ? '-scale-x-100' : ''}`} aria-hidden>
    <g fill={GOLD} opacity="0.85">
      <path d="M8 34 C22 30 34 20 46 6" fill="none" stroke={GOLD} strokeWidth="1.4" />
      {[[14, 30, -30], [22, 25, -40], [30, 19, -50], [38, 12, -60]].map(([x, y, r], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y - 5} rx="2.6" ry="6" transform={`rotate(${r} ${x} ${y - 5})`} />
          <ellipse cx={x + 5} cy={y + 2} rx="2.6" ry="6" transform={`rotate(${r + 70} ${x + 5} ${y + 2})`} />
        </g>
      ))}
    </g>
  </svg>
);

const RoleLabel: React.FC<{ children: React.ReactNode; align: 'left' | 'right' }> = ({ children, align }) => (
  <div className="flex items-center justify-center gap-3 my-3" data-align={align}>
    <span className="h-px w-4 sm:w-14 shrink-0 bg-gradient-to-r from-transparent to-brand-gold" />
    <span className="font-serif text-[10px] sm:text-base tracking-[0.25em] sm:tracking-[0.35em] whitespace-nowrap text-stone-700 uppercase">{children}</span>
    <span className="h-px w-4 sm:w-14 shrink-0 bg-gradient-to-l from-transparent to-brand-gold" />
  </div>
);

const Divider: React.FC = () => (
  <div className="flex items-center justify-center gap-3 my-8 sm:my-12">
    <span className="h-px flex-1 max-w-[220px] bg-gradient-to-r from-transparent to-brand-gold/70" />
    <span className="w-2 h-2 rotate-45 border border-brand-gold" />
    <span className="h-px flex-1 max-w-[220px] bg-gradient-to-l from-transparent to-brand-gold/70" />
  </div>
);

/* --------------------------------- Section --------------------------------- */

export const CoupleDetails: React.FC = () => {
  const person = (
    role: string,
    name: string,
    parents: string,
    align: 'left' | 'right',
  ) => (
    <div className="text-center">
      <h3 className="font-serif font-semibold text-xl sm:text-4xl lg:text-5xl tracking-[0.06em] sm:tracking-[0.12em] break-words uppercase bg-gradient-to-b from-[#E4C66A] via-[#C9A13B] to-[#9C7A1E] bg-clip-text text-transparent">
        {name}
      </h3>
      <RoleLabel align={align}>{role}</RoleLabel>
      <p className="font-serif text-[13px] sm:text-lg text-stone-600 leading-snug sm:leading-relaxed">{parents}</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.10),transparent_70%)] pointer-events-none" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center relative z-10"
      >
        <div className="flex items-end justify-center gap-2 sm:gap-4">
          <Laurel />
          <h2 className="font-display text-6xl sm:text-8xl leading-[1.05] bg-gradient-to-b from-[#E9CF7A] via-[#C9A13B] to-[#9C7A1E] bg-clip-text text-transparent drop-shadow-sm px-2">
            The Happy
            <br />
            Couple
          </h2>
          <Laurel flip />
        </div>
        <p className="mt-6 font-serif text-lg sm:text-2xl text-stone-700 leading-snug">
          What began as a moment
          <br />
          became our forever
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent to-brand-gold" />
          <Heart className="w-3.5 h-3.5 text-brand-gold" />
          <span className="h-px w-20 sm:w-32 bg-gradient-to-l from-transparent to-brand-gold" />
        </div>
      </motion.div>

      {/* Groom: frame left, text right */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 mt-12 sm:mt-16 grid grid-cols-[38%_minmax(0,1fr)] sm:grid-cols-[minmax(0,280px)_minmax(0,1fr)] items-center gap-4 sm:gap-12"
      >
        <OvalFrame id="groom-frame">
          <TuxedoIcon />
        </OvalFrame>
        {person('The Groom', WEDDING.groom.firstName, WEDDING.groom.parents, 'left')}
      </motion.div>

      <Divider />

      {/* Bride: text left, frame right */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 grid grid-cols-[minmax(0,1fr)_38%] sm:grid-cols-[minmax(0,1fr)_minmax(0,280px)] items-center gap-4 sm:gap-12"
      >
        {person('The Bride', WEDDING.bride.firstName, WEDDING.bride.parents, 'right')}
        <OvalFrame id="bride-frame">
          <BrideIcon />
        </OvalFrame>
      </motion.div>
    </div>
  );
};
