import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

/*
 * ===========================================
 *   HOW TO ADD / REPLACE PHOTOS
 * ===========================================
 *
 * 1. Place your photos in the /public/photos/ folder
 * 2. Update the 'photos' array below with the filename and caption
 * 3. That's it! The website will display your new photos
 *
 * Example:
 *   { src: '/photos/your-photo.jpg', caption: 'Your caption here' }
 */

const photos = [
  { src: '/photos/photo1.jpg', caption: 'My favourite human 💙' },
  { src: '/photos/photo2.jpg', caption: 'This is my happy place 🤍' },
  { src: '/photos/photo3.jpg', caption: 'Us being our silly selves 😄' },
  // Add more photos here:
  // { src: '/photos/photo4.jpg', caption: 'A memory I would relive a thousand times ✨' },
  // { src: '/photos/photo5.jpg', caption: 'My forever favourite person 💙' },
];

const MemoryLane = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const openLightbox = (src) => {
    setLightboxImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = '';
  };

  return (
    <section className="memory-lane-section section-container" id="memories">
      <h2 className="section-title">Our Little Memory Lane 📸</h2>

      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="polaroid-card"
            ref={el => cardRefs.current[index] = el}
            data-index={index}
            onClick={() => openLightbox(photo.src)}
            style={{
              opacity: visibleCards.has(index) ? 1 : 0,
              transform: visibleCards.has(index)
                ? `rotate(${index % 2 === 0 ? '-1' : '1.5'}deg)`
                : 'translateY(40px)',
              transition: `all 0.6s ease ${index * 0.15}s`,
            }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              className="polaroid-image"
              loading="lazy"
            />
            <p className="polaroid-caption">{photo.caption}</p>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <X size={24} />
          </button>
          <img
            src={lightboxImage}
            alt="Memory"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default MemoryLane;

