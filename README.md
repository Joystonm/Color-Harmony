# Color Harmony

A beautiful React.js website that fetches and displays color palettes using the COLOURlovers API.

## Features

- **Random Palette Generator**: Generate random color palettes with smooth animations
- **Top Palettes**: Display the top 5 most popular palettes
- **Color Search**: Search for specific colors by hex code
- **Inspiration Gallery**: Generate multiple random palettes with staggered animations
- **Copy to Clipboard**: Click any color swatch to copy hex code, or copy entire palettes
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works perfectly on desktop and mobile

## Tech Stack

- React.js with functional components and hooks
- TailwindCSS for styling
- Framer Motion for animations
- COLOURlovers API for color data

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify

## API Usage

This app uses the COLOURlovers API:
- Random palettes: `https://www.colourlovers.com/api/palettes/random?format=json`
- Top palettes: `https://www.colourlovers.com/api/palettes/top?format=json`
- Color search: `https://www.colourlovers.com/api/color/{HEX}?format=json`

## Components

- `App.jsx`: Main application component
- `Header.jsx`: Header with title and dark mode toggle
- `PaletteCard.jsx`: Individual palette display with color swatches
- `PaletteGrid.jsx`: Grid layout for multiple palettes
- `ColorSearch.jsx`: Color search functionality
- `Loader.jsx`: Loading spinner component
