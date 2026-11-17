import React, { useState } from 'react';

const smileMessages = [
  "Your cutu is literally obsessed with you. 🥰",
  "Handsome alert! My Bubu is too cute. 😍",
  "You have a girlfriend who thinks about you approximately 24/7. 💭",
  "Sending 1000 forehead kisses right now. 😘",
  "Smile a little, baby. I love that smile. 😊",
  "Fun fact: You're the cutest Bubu in the whole world. 💙",
  "Missing you level: 999999. 🫠",
  "You deserve the biggest hug in the world. 🤗",
];

const niceMessages = [
  "You are enough. Always have been. 💙",
  "You are doing better than you think. 🌟",
  "I am so proud of you, my baby. 🫶",
  "You deserve all the beautiful things in life. ✨",
  "You don't need to be perfect to be loved. 💙",
  "The world is brighter because you're in it. 🌈",
  "It's okay to rest. You've been so strong. 🤍",
  "You make everything better just by being you. 💫",
];

const EmergencyLoveButtons = () => {
  const [modal, setModal] = useState(null);
  const [currentMessage, setCurrentMessage] = useState('');

  const openHug = () => {
    setModal('hug');
  };

  const openSmile = () => {
    const msg = smileMessages[Math.floor(Math.random() * smileMessages.length)];
    setCurrentMessage(msg);
    setModal('smile');
  };

  const openNice = () => {
    const msg = niceMessages[Math.floor(Math.random() * niceMessages.length)];
    setCurrentMessage(msg);
    setModal('nice');
  };

  const closeModal = () => {
    setModal(null);
    setCurrentMessage('');
  };

  return (
    <section className="emergency-section section-container" id="emergency">
      <h2 className="section-title">Emergency Love Buttons 🧸</h2>

      <div className="emergency-buttons-grid">
        <button className="emergency-btn" onClick={openHug}>
          <span className="emergency-btn-icon">🫂</span>
          <span className="emergency-btn-title">I NEED A HUG</span>
        </button>

        <button className="emergency-btn" onClick={openSmile}>
          <span className="emergency-btn-icon">🥺</span>
          <span className="emergency-btn-title">MAKE ME SMILE</span>
        </button>

        <button className="emergency-btn" onClick={openNice}>
          <span className="emergency-btn-icon">💙</span>
          <span className="emergency-btn-title">TELL ME SOMETHING NICE</span>
        </button>
      </div>

      {/* Modals */}
      {modal && (
        <div className="emergency-modal-overlay" onClick={closeModal}>
          <div className="emergency-modal" onClick={(e) => e.stopPropagation()}>
            {modal === 'hug' && (
              <>
                <span className="emergency-modal-emoji">🫂</span>
                <p className="emergency-modal-text">
                  COME HEREEEEE! BIGGEST HUG EVER.<br />
                  HOLDING YOU UNTIL YOU FEEL BETTER. 💙
                </p>
                {/* Animated hearts around the modal */}
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      position: 'absolute',
                      fontSize: '20px',
                      left: `${10 + i * 15}%`,
                      top: `${Math.random() * 20}%`,
                      animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
                      opacity: 0.6,
                    }}
                  >
                    💙
                  </span>
                ))}
              </>
            )}

            {modal === 'smile' && (
              <>
                <span className="emergency-modal-emoji">😊</span>
                <p className="emergency-modal-text">{currentMessage}</p>
              </>
            )}

            {modal === 'nice' && (
              <>
                <span className="emergency-modal-emoji">🌟</span>
                <p className="emergency-modal-text">{currentMessage}</p>
              </>
            )}

            <button className="emergency-modal-close" onClick={closeModal}>
              Close 💙
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmergencyLoveButtons;

