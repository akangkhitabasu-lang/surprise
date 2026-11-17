import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);
  const intervalRef = useRef(null);

  // Simple dreamy melody using Web Audio API
  const playMelody = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.08;
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Dreamy chord progression in C major / Am
    const chords = [
      [261.63, 329.63, 392.00], // C major
      [220.00, 329.63, 440.00], // Am
      [246.94, 311.13, 369.99], // B dim (soft)
      [261.63, 329.63, 392.00], // C major
      [293.66, 349.23, 440.00], // Dm
      [261.63, 329.63, 392.00], // C
      [220.00, 277.18, 329.63], // Am
      [246.94, 329.63, 392.00], // G/B
    ];

    let noteIndex = 0;

    const playChord = () => {
      // Clear previous oscillators
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch(e) {}
      });
      oscillatorsRef.current = [];

      const chord = chords[noteIndex % chords.length];
      
      chord.forEach(freq => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        noteGain.gain.setValueAtTime(0, ctx.currentTime);
        noteGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);
        noteGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);
        noteGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.8);
        
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 3);
        
        oscillatorsRef.current.push(osc);
      });

      // Add a high sparkle note
      const sparkle = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      sparkle.type = 'sine';
      sparkle.frequency.value = chord[2] * 2;
      sparkleGain.gain.setValueAtTime(0, ctx.currentTime);
      sparkleGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
      sparkleGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
      sparkle.connect(sparkleGain);
      sparkleGain.connect(masterGain);
      sparkle.start();
      sparkle.stop(ctx.currentTime + 2);
      oscillatorsRef.current.push(sparkle);

      noteIndex++;
    };

    playChord();
    intervalRef.current = setInterval(playChord, 3000);
  };

  const stopMelody = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch(e) {}
    });
    oscillatorsRef.current = [];
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMelody();
    } else {
      playMelody();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => stopMelody();
  }, []);

  return (
    <div className="music-player">
      <button
        className={`music-btn ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? <Pause size={20} /> : <Music size={20} />}
      </button>
      <span className="music-label">
        {isPlaying ? '♪ Playing...' : '♪ Play music'}
      </span>
    </div>
  );
};

export default MusicPlayer;

