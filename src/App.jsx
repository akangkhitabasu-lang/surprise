import React, { useState } from 'react';
import OpeningSurprise from './components/OpeningSurprise';
import LoveMessage from './components/LoveMessage';
import MemoryLane from './components/MemoryLane';
import EmergencyLoveButtons from './components/EmergencyLoveButtons';
import ReasonsCards from './components/ReasonsCards';
import CatchLoveGame from './components/CatchLoveGame';
import SecretLoveLetter from './components/SecretLoveLetter';
import FinalSurprise from './components/FinalSurprise';
import FloatingHeartsBackground from './components/FloatingHeartsBackground';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import MusicPlayer from './components/MusicPlayer';
import SectionDivider from './components/SectionDivider';

function App() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
  };

  return (
    <>
      {/* Opening Surprise Screen */}
      {!isOpened && <OpeningSurprise onOpen={handleOpen} />}

      {/* Main Content */}
      {isOpened && (
        <>
          <FloatingHeartsBackground />
          <ScrollProgress />
          <BackToTop />
          <MusicPlayer />

          <main style={{ position: 'relative', zIndex: 1 }}>
            {/* Page Title */}
            <header style={{
              textAlign: 'center',
              padding: '60px 20px 20px',
              animation: 'fadeInUp 1s ease forwards',
            }}>
              <h1 style={{
                fontFamily: 'var(--font-handwritten)',
                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                color: 'var(--text-dark)',
                lineHeight: 1.4,
              }}>
                HEY BUBUUU! THIS LITTLE WORLD IS ALL YOURS 💙
              </h1>
            </header>

            <SectionDivider />
            <LoveMessage />
            <SectionDivider />
            <MemoryLane />
            <SectionDivider />
            <EmergencyLoveButtons />
            <SectionDivider />
            <ReasonsCards />
            <SectionDivider />
            <CatchLoveGame />
            <SectionDivider />
            <SecretLoveLetter />
            <SectionDivider />
            <FinalSurprise />
          </main>
        </>
      )}
    </>
  );
}

export default App;

