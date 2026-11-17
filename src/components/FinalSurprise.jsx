import React, { useState, useEffect, useRef } from 'react';

const FinalSurprise = () => {
  const [hugSent, setHugSent] = useState(false);
  const [explosionHearts, setExplosionHearts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const sendHug = () => {
    setHugSent(true);

    // Create heart explosion
    const newHearts = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 25 + 15,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
      emoji: ['💙', '🩵', '🤍', '💎', '✨', '🫧', '☁️'][Math.floor(Math.random() * 7)],
    }));
    setExplosionHearts(newHearts);

    // Clear hearts after animation
    setTimeout(() => setExplosionHearts([]), 7000);
  };

  return (
    <>
      <section className="final-section" ref={sectionRef} id="final">
        <div style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1s ease',
          zIndex: 2,
          position: 'relative',
        }}>
          <h2 className="final-title">ONE LAST THING, BUBU... 💙</h2>

          <div className="final-message">
            <p>I hope this little corner made your day a little softer.</p>
            <br />
            <p>Remember, you don't have to have everything figured out. You don't have to be okay all the time.</p>
            <br />
            <p>Whatever happens, never forget how loved you are.</p>
            <br />
            <p style={{ fontWeight: 600, fontFamily: 'var(--font-casual)', fontSize: '1.3rem' }}>
              Now come here and let me give you the biggest hug ever. 🤗
            </p>
          </div>

          {!hugSent ? (
            <button className="final-hug-btn" onClick={sendHug}>
              SEND ME A HUG 🫂
            </button>
          ) : (
            <div className="final-hug-result">
              <span className="final-hug-emoji">🫂💙</span>
              <h3 className="final-hug-text">
                BIGGEST HUG SENT TO MY FAVOURITE HUMAN! 💙
              </h3>

              <div className="final-signature">
                FOREVER YOURS,
                <br />
                YOUR CUTU BABY
                <span className="final-heart">♡</span>
              </div>
            </div>
          )}
        </div>

        {/* Background decorations */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              fontSize: `${Math.random() * 20 + 20}px`,
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              opacity: 0.1,
              animation: `float ${3 + i}s ease-in-out infinite`,
              pointerEvents: 'none',
            }}
          >
            {['💙', '☁️', '✨'][i % 3]}
          </span>
        ))}
      </section>

      {/* Heart Explosion Overlay */}
      {explosionHearts.length > 0 && (
        <div className="heart-explosion">
          {explosionHearts.map(heart => (
            <span
              key={heart.id}
              className="explosion-heart"
              style={{
                left: `${heart.left}%`,
                bottom: '-30px',
                fontSize: `${heart.size}px`,
                animationDuration: `${heart.duration}s`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              {heart.emoji}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default FinalSurprise;

