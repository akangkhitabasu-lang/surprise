import React, { useState, useRef, useEffect, useCallback } from 'react';

const CatchLoveGame = () => {
  const [gameState, setGameState] = useState('idle'); // idle, playing, victory
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState([]);
  const gameAreaRef = useRef(null);
  const animationRef = useRef(null);
  const heartIdRef = useRef(0);

  const spawnHeart = useCallback(() => {
    if (!gameAreaRef.current) return;
    
    const area = gameAreaRef.current.getBoundingClientRect();
    const heartEmojis = ['💙', '🩵', '💎', '🤍', '🫧'];
    
    const newHeart = {
      id: heartIdRef.current++,
      x: Math.random() * (area.width - 50) + 10,
      y: -40,
      speed: Math.random() * 1.5 + 0.8,
      size: Math.random() * 15 + 25,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      wobble: Math.random() * 2 - 1,
      collected: false,
    };

    setHearts(prev => [...prev, newHeart]);
  }, []);

  const gameLoop = useCallback(() => {
    setHearts(prev => {
      const areaHeight = gameAreaRef.current?.getBoundingClientRect().height || 450;
      
      return prev
        .map(heart => ({
          ...heart,
          y: heart.y + heart.speed,
          x: heart.x + Math.sin(heart.y / 30) * heart.wobble,
        }))
        .filter(heart => heart.y < areaHeight + 50 && !heart.collected);
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setHearts([]);
    heartIdRef.current = 0;
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    animationRef.current = requestAnimationFrame(gameLoop);
    
    const spawnInterval = setInterval(spawnHeart, 800);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearInterval(spawnInterval);
    };
  }, [gameState, gameLoop, spawnHeart]);

  const collectHeart = (heartId) => {
    setHearts(prev => prev.map(h =>
      h.id === heartId ? { ...h, collected: true } : h
    ));

    setScore(prev => {
      const newScore = prev + 1;
      if (newScore >= 10) {
        setGameState('victory');
        cancelAnimationFrame(animationRef.current);
      }
      return newScore;
    });
  };

  const replay = () => {
    setGameState('idle');
    setScore(0);
    setHearts([]);
  };

  return (
    <section className="game-section section-container" id="game">
      <h2 className="section-title">Catch Your Cutu's Love 🎮</h2>

      <div className="game-container">
        <div className="game-score">
          Hearts collected: <span>{score}</span> / 10
        </div>
        <p className="game-instruction">
          {gameState === 'idle' && 'Click play to start catching hearts! 💙'}
          {gameState === 'playing' && 'Tap the hearts to catch them! 💙'}
          {gameState === 'victory' && ''}
        </p>

        <div className="game-area" ref={gameAreaRef}>
          {gameState === 'idle' && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: '20px',
            }}>
              <span style={{ fontSize: '4rem', animation: 'float 2s ease-in-out infinite' }}>
                💙
              </span>
              <button className="game-start-btn" onClick={startGame}>
                START PLAYING 🎮
              </button>
            </div>
          )}

          {gameState === 'playing' && hearts.map(heart => (
            !heart.collected && (
              <span
                key={heart.id}
                className="floating-heart"
                onClick={() => collectHeart(heart.id)}
                style={{
                  left: `${heart.x}px`,
                  top: `${heart.y}px`,
                  fontSize: `${heart.size}px`,
                }}
              >
                {heart.emoji}
              </span>
            )
          ))}

          {gameState === 'victory' && (
            <div className="game-victory">
              <span style={{ fontSize: '3rem', marginBottom: '15px', animation: 'heartbeat 1.5s infinite' }}>
                🎉💙🎉
              </span>
              <h3 className="game-victory-title">YAYYYYY BUBUUU! YOU DID IT! 💙</h3>
              <p className="game-victory-text">
                You collected 10 hearts, but guess what?
                <br /><br />
                Your cutu has INFINITE more for you. 💙💙💙
              </p>
              <button className="game-replay-btn" onClick={replay}>
                PLAY AGAIN 🔄
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatchLoveGame;

