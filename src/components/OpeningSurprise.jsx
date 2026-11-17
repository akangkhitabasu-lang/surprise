import React, { useState, useEffect } from 'react';

const OpeningSurprise = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Create sparkles
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setSparkles(newSparkles);
  }, []);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className={`opening-screen ${isOpening ? 'hidden' : ''}`}>
      {/* Background sparkles */}
      {sparkles.map(s => (
        <span
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: `${s.size}px`,
            animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          ✨
        </span>
      ))}

      {/* Floating clouds */}
      {[...Array(5)].map((_, i) => (
        <span
          key={`cloud-${i}`}
          style={{
            position: 'absolute',
            left: `${i * 22 + 5}%`,
            top: `${Math.random() * 30 + 5}%`,
            fontSize: `${Math.random() * 20 + 25}px`,
            opacity: 0.2,
            animation: `floatSlow ${Math.random() * 5 + 8}s ease-in-out ${i}s infinite`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          ☁️
        </span>
      ))}

      <div className="opening-content">
        <h1 className="opening-title">HEYYYY MY BUBUUU! 💙</h1>
        <p className="opening-subtitle">Your cutu baby has made something just for you.</p>
        <p className="opening-message">Having a bad day? Come here. I've got something for you.</p>

        <div className={`gift-box-container ${isOpening ? 'opening' : ''}`}>
          <div className="gift-lid" />
          <div className="gift-box" />
        </div>

        <button className="open-btn" onClick={handleOpen}>
          OPEN YOUR SURPRISE, BABY 🥹
        </button>
      </div>

      {/* Floating hearts */}
      {[...Array(8)].map((_, i) => (
        <span
          key={`heart-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 90 + 5}%`,
            bottom: '-30px',
            fontSize: `${Math.random() * 15 + 15}px`,
            animation: `heartFloat ${Math.random() * 10 + 12}s linear ${Math.random() * 8}s infinite`,
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          💙
        </span>
      ))}
    </div>
  );
};

export default OpeningSurprise;

