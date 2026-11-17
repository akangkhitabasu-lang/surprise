import React, { useState, useRef, useEffect } from 'react';

const reasons = [
  "Because you're my Bubu. 💙",
  "Because your smile makes my day. 😊",
  "Because I love talking to you. 💬",
  "Because even boring moments become special with you. ✨",
  "Because you're my favourite notification. 📱",
  "Because I love annoying you. 😝",
  "Because you're my cutu baby. 🤍",
  "Because I feel lucky to have you. 🍀",
  "Because I want a million more memories with you. 📸",
  "Simply because you're YOU. 💙",
];

const ReasonsCards = () => {
  const [flippedCards, setFlippedCards] = useState(new Set());
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger card appearance
          reasons.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards(prev => new Set([...prev, i]));
            }, i * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleCard = (index) => {
    setFlippedCards(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <section className="reasons-section section-container" ref={sectionRef} id="reasons">
      <h2 className="section-title">10 Reasons Why You're My Favourite Person 💗</h2>

      <div className="reasons-grid">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`flip-card ${flippedCards.has(index) ? 'flipped' : ''}`}
            onClick={() => toggleCard(index)}
            style={{
              opacity: visibleCards.has(index) ? 1 : 0,
              transform: visibleCards.has(index) ? 'none' : 'translateY(30px)',
              transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
            }}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <span className="flip-card-number">#{index + 1}</span>
                <span className="flip-card-hint">tap to reveal 💙</span>
              </div>
              <div className="flip-card-back">
                <span className="flip-card-message">{reason}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReasonsCards;

