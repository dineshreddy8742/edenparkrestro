import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Play, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'gardens' | 'night' | 'videos'>('all');
  const [lightboxMedia, setLightboxMedia] = useState<{ type: 'image' | 'video'; src: string; title: string } | null>(null);

  const mediaItems = [
    {
      type: 'video' as const,
      src: '/assets/videos/video-1.mp4',
      thumbnail: '/assets/images/ambiance-8.jpg',
      title: 'Grand Twilight Lawn Tour',
      category: 'videos',
      tag: '4K Video'
    },
    {
      type: 'image' as const,
      src: '/assets/images/ambiance-8.jpg',
      title: 'Lush Green Dining Lawn at Night',
      category: 'night',
      tag: 'Night Ambiance'
    },
    {
      type: 'image' as const,
      src: '/assets/images/ambiance-9.jpg',
      title: 'Celebration Lawn & Fairy Lights Arch',
      category: 'night',
      tag: 'Event Lawn'
    },
    {
      type: 'video' as const,
      src: '/assets/videos/video-2.mp4',
      thumbnail: '/assets/images/ambiance-1.jpg',
      title: 'Garden Gazebo Ambiance Reel',
      category: 'videos',
      tag: 'Ambiance Reel'
    },
    {
      type: 'image' as const,
      src: '/assets/images/ambiance-1.jpg',
      title: 'Daylight Open Courtyard & Veranda',
      category: 'gardens',
      tag: 'Garden Seating'
    },
    {
      type: 'image' as const,
      src: '/assets/images/ambiance-4.jpg',
      title: 'Opulent AC Dining Pavilion',
      category: 'gardens',
      tag: 'AC Dining Hall'
    },
    {
      type: 'video' as const,
      src: '/assets/videos/video-4.mp4',
      thumbnail: '/assets/images/ambiance-10.jpg',
      title: 'Festive Illumination Walkthrough',
      category: 'videos',
      tag: 'Video Tour'
    },
    {
      type: 'image' as const,
      src: '/assets/images/ambiance-10.jpg',
      title: 'Main Entrance & Grand Signboard Glow',
      category: 'night',
      tag: 'Night Illumination'
    },
    {
      type: 'image' as const,
      src: '/assets/images/ambiance-3.jpg',
      title: 'Expansive Grounds & Highway Parking',
      category: 'gardens',
      tag: 'Highway Oasis'
    },
  ];

  const filteredMedia = mediaItems.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="gallery" className="py-14 sm:py-16 relative bg-[#FAF5EC] border-t border-[#E8DCB8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-400 bg-[#FAF3E0] text-gold-900 text-[11px] font-bold uppercase tracking-wider mb-2.5 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-gold-700" />
            <span>Photo &amp; Video Gallery</span>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-leela-heading mb-2 leading-tight">
            Explore <span className="text-gold-gradient italic font-serif">The Eden Park Grounds</span>
          </h2>

          <p className="text-leela-body text-sm sm:text-base font-normal leading-relaxed">
            Real photos and videos of our open gardens, night lighting, family AC dining hall, and spacious grounds.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 overflow-x-auto pb-2">
            {[
              { key: 'all', label: 'All Photos & Videos' },
              { key: 'night', label: 'Night Ambiance' },
              { key: 'gardens', label: 'Daylight Lawns & AC Hall' },
              { key: 'videos', label: 'Videos' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === tab.key
                    ? 'bg-gradient-to-r from-gold-600 to-gold-700 text-white shadow-sm'
                    : 'bg-white text-leela-heading border border-[#DFCDAB] hover:border-gold-500 shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid with Fast Responsive Loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredMedia.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ 
                duration: 0.25, 
                ease: "easeOut" 
              }}
              onClick={() => setLightboxMedia({ type: item.type, src: item.src, title: item.title })}
              className="group relative h-60 sm:h-72 rounded-3xl overflow-hidden bg-white border border-[#E8DCB8] hover:border-gold-500 cursor-pointer shadow-palace-card hover:shadow-palace-hover transition-all duration-300 hover:-translate-y-1"
            >
              {item.type === 'video' ? (
                <>
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                  />
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gold-400 flex items-center justify-center text-gold-700 shadow-md">
                    <Play className="w-4 h-4 fill-gold-600 text-gold-600 ml-0.5" />
                  </div>
                </>
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              )}

                {/* Gradient overlay and details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5D061] font-mono mb-1">
                    {item.tag}
                  </span>
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setLightboxMedia(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-white border border-[#E8DCB8] p-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxMedia(null)}
                className="absolute top-5 right-5 z-10 p-2 rounded-full bg-black/70 text-white hover:text-gold-300 border border-white/20 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {lightboxMedia.type === 'video' ? (
                <video
                  src={lightboxMedia.src}
                  controls
                  autoPlay
                  className="w-full max-h-[80vh] rounded-2xl object-contain bg-black"
                />
              ) : (
                <img
                  src={lightboxMedia.src}
                  alt={lightboxMedia.title}
                  className="w-full max-h-[80vh] rounded-2xl object-contain"
                />
              )}

              <div className="p-4 text-center">
                <h3 className="font-serif font-bold text-lg text-leela-heading">
                  {lightboxMedia.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
