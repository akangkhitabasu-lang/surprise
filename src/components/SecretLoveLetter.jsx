import React, { useState, useRef, useEffect } from 'react';

const SecretLoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleOpen = () => {
    setEnvelopeOpened(true);
    setTimeout(() => setIsOpen(true), 1000);
  };

  return (
    <section className="secret-letter-section section-container" ref={sectionRef} id="secret-letter">
      <h2 className="section-title">A Secret Love Letter 💌</h2>

      {!isOpen && (
        <div className="envelope-container" style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <div className={`envelope ${envelopeOpened ? 'opened' : ''}`} onClick={handleOpen}>
            <div className="envelope-flap" />
            <div className="envelope-letter-peek" />
            <div className="envelope-body" />
          </div>

          {!envelopeOpened && (
            <button className="open-letter-btn" onClick={handleOpen}>
              OPEN SOMETHING SPECIAL 💌
            </button>
          )}
        </div>
      )}

      {isOpen && (
        <div className="secret-letter-content">
          <h3 className="letter-greeting">My dearest Bubu,</h3>
          
          <p>If I could give you one thing today, it would be the ability to see yourself through my eyes.</p>
          
          <p>Maybe then you'd understand just how precious you are to me.</p>
          
          <p>I don't expect you to be happy every second. I just want you to know that you have someone who wants to share the happy moments, the silly moments and even the difficult ones.</p>
          
          <p>I want to keep laughing with you, making memories with you, annoying you and loving you.</p>
          
          <p style={{ fontWeight: 600, color: '#6CB4EE' }}>You are my favourite boy.</p>
          
          <p>And I hope I get to call you my Bubu for a very, very long time.</p>
          
          <p style={{
            fontFamily: 'var(--font-handwritten)',
            fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
            color: '#6CB4EE',
            fontWeight: 700,
            textAlign: 'center',
            marginTop: '25px',
          }}>
            I LOVE YOUUUU! 💙
          </p>

          <div className="letter-closing">With all my love,</div>
          <div className="letter-signature">Your cutu baby. 💙</div>
        </div>
      )}
    </section>
  );
};

export default SecretLoveLetter;

