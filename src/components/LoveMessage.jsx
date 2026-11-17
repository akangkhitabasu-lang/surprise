import React, { useState, useEffect, useRef } from 'react';

const LoveMessage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedLines, setTypedLines] = useState(0);
  const sectionRef = useRef(null);

  const paragraphs = [
    "I don't know how your day has been, but I just want you to know that you don't always have to be okay.",
    "You don't have to pretend to smile when you don't feel like it. You don't have to figure everything out today.",
    "I wish I could be right there with you, hug you really tightly, play with your hair and tell you that everything will be okay.",
    "You are so special to me, and I hope you never forget that.",
    "Even when you have a bad day, even when you're quiet, even when things don't go as planned, you will always be my favourite person.",
    "Take a deep breath, my baby. One thing at a time.",
    "I love you endlessly.",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let current = 0;
    const timer = setInterval(() => {
      current++;
      setTypedLines(current);
      if (current >= paragraphs.length + 2) clearInterval(timer);
    }, 600);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section className="love-message-section section-container" ref={sectionRef} id="message">
      <h2 className="section-title">A Message Just For You 💌</h2>

      <div className="letter-container">
        {isVisible && (
          <>
            <h3 className="letter-greeting" style={{
              opacity: typedLines >= 0 ? 1 : 0,
              animation: 'fadeInUp 0.8s ease forwards',
            }}>
              Hey my Bubu,
            </h3>

            <div className="letter-body">
              {paragraphs.map((text, i) => (
                <p
                  key={i}
                  style={{
                    opacity: typedLines > i ? 1 : 0,
                    animation: typedLines > i ? `fadeInUp 0.8s ease forwards` : 'none',
                    fontStyle: i === paragraphs.length - 1 ? 'italic' : 'normal',
                    fontWeight: i === paragraphs.length - 1 ? 600 : 400,
                    color: i === paragraphs.length - 1 ? '#6CB4EE' : undefined,
                    fontFamily: i === paragraphs.length - 1 ? 'var(--font-handwritten)' : undefined,
                    fontSize: i === paragraphs.length - 1 ? '1.5rem' : undefined,
                  }}
                >
                  {text}
                  {typedLines === i + 1 && <span className="typewriter-cursor" />}
                </p>
              ))}
            </div>

            {typedLines > paragraphs.length && (
              <>
                <div className="letter-closing">Yours,</div>
                <div className="letter-signature">Your cutu baby. 💙</div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LoveMessage;

