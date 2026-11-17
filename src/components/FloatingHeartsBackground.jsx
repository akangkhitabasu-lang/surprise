import React, { useEffect, useState, useRef } from 'react';

const FloatingHeartsBackground = () => {
  const [hearts, setHearts] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now() + Math.random();
      const heart = {
        id,
        left: Math.random() * 100,
        size: Math.random() * 20 + 12,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 5,
        emoji: ['💙', '🤍', '☁️', '✨', '💎'][Math.floor(Math.random() * 5)],
      };
      setHearts(prev => [...prev.slice(-15), heart]);
    };

    createHeart();
    intervalRef.current = setInterval(createHeart, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="floating-hearts-bg">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="bg-heart"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHeartsBackground;

