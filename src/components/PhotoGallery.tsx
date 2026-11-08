import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
  url: string;
  alt: string;
}

/** Horizontal, swipeable photo strip with snap scrolling and arrow buttons. */
export function PhotoGallery({ photos }: { photos: Photo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const arrowClass =
    'hidden sm:flex absolute top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-brand-beige/50 shadow-lg items-center justify-center text-brand-beige-deep hover:scale-105 transition-transform';

  return (
    <div className="relative">
      <button type="button" aria-label="Previous photo" onClick={() => scrollBy(-1)} className={`${arrowClass} -left-2 lg:-left-6`}>
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.url + index}
            data-card
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.12 }}
            className="relative shrink-0 snap-center w-[78%] sm:w-[340px] lg:w-[360px] aspect-[2/3] overflow-hidden rounded-2xl group shadow-lg border-4 border-white"
          >
            <img
              src={photo.url}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <p className="absolute bottom-4 left-5 right-5 text-white font-serif text-lg tracking-wide uppercase drop-shadow">
              {photo.alt}
            </p>
          </motion.div>
        ))}
      </div>

      <button type="button" aria-label="Next photo" onClick={() => scrollBy(1)} className={`${arrowClass} -right-2 lg:-right-6`}>
        <ChevronRight className="w-5 h-5" />
      </button>

      <p className="sm:hidden text-center text-[10px] uppercase tracking-[0.3em] text-stone-400 mt-2">Swipe to see more</p>
    </div>
  );
}
