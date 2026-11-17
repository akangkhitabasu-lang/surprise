# 💙 HEY BUBUUU! THIS LITTLE WORLD IS ALL YOURS 💙

A beautiful, interactive romantic surprise website made with love.

## Running the Website

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The website will open at **http://localhost:5173**

## Adding / Replacing Photos

1. Place your photos in the `public/photos/` folder
2. Open `src/components/MemoryLane.jsx`
3. Update the `photos` array at the top of the file:

```js
const photos = [
  { src: '/photos/photo1.jpg', caption: 'My favourite human 💙' },
  { src: '/photos/photo2.jpg', caption: 'This is my happy place 🤍' },
  { src: '/photos/photo3.jpg', caption: 'Us being our silly selves 😄' },
  // Add as many as you want:
  { src: '/photos/photo4.jpg', caption: 'Your caption here ✨' },
];
```

## Project Structure

```
surprise/
├── public/
│   └── photos/           # Your couple photos go here
├── src/
│   ├── components/
│   │   ├── OpeningSurprise.jsx      # Gift box opening screen
│   │   ├── LoveMessage.jsx          # Animated love letter
│   │   ├── MemoryLane.jsx           # Photo gallery (edit photos here!)
│   │   ├── EmergencyLoveButtons.jsx # Hug, Smile & Nice buttons
│   │   ├── ReasonsCards.jsx         # 10 flip cards
│   │   ├── CatchLoveGame.jsx       # Heart-catching game
│   │   ├── SecretLoveLetter.jsx     # Secret envelope letter
│   │   ├── FinalSurprise.jsx       # Final hug animation
│   │   ├── FloatingHeartsBackground.jsx
│   │   ├── MusicPlayer.jsx          # Dreamy music player
│   │   ├── ScrollProgress.jsx
│   │   ├── BackToTop.jsx
│   │   └── SectionDivider.jsx
│   ├── styles/
│   │   └── global.css    # All styles & animations
│   ├── App.jsx           # Main app
│   └── main.jsx          # Entry point
├── package.json
└── vite.config.js
```

## Made with 💙

# surprise
