import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import PaletteGrid from './components/PaletteGrid';
import ColorSearch from './components/ColorSearch';
import Loader from './components/Loader';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [randomPalettes, setRandomPalettes] = useState([]);
  const [topPalettes, setTopPalettes] = useState([]);
  const [inspirationPalettes, setInspirationPalettes] = useState([]);
  const [loading, setLoading] = useState({
    random: false,
    top: false,
    inspiration: false
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Mock data generators
  const generateRandomPalette = () => {
    const palettes = [
      { colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'], title: 'Ocean Breeze', userName: 'ColorMaster' },
      { colors: ['#A8E6CF', '#DCEDC1', '#FFD3A5', '#FFA8A8', '#FF8A80'], title: 'Pastel Dreams', userName: 'SoftTones' },
      { colors: ['#667292', '#A4B0BE', '#F1F2F6', '#57606F', '#2F3542'], title: 'Modern Gray', userName: 'MinimalDesign' },
      { colors: ['#FF9FF3', '#F368E0', '#3742FA', '#2F3542', '#FF3838'], title: 'Neon Nights', userName: 'VibrantArt' },
      { colors: ['#26DE81', '#20BF6B', '#0FB9B1', '#45AAF2', '#2D98DA'], title: 'Fresh Mint', userName: 'NatureVibes' },
      { colors: ['#FD79A8', '#FDCB6E', '#6C5CE7', '#A29BFE', '#74B9FF'], title: 'Sunset Glow', userName: 'WarmColors' },
      { colors: ['#00B894', '#00CEC9', '#81ECEC', '#74B9FF', '#0984E3'], title: 'Tropical Waters', userName: 'BeachLife' },
      { colors: ['#E17055', '#FDCB6E', '#E84393', '#6C5CE7', '#74B9FF'], title: 'Vibrant Mix', userName: 'BoldChoice' }
    ];
    const palette = palettes[Math.floor(Math.random() * palettes.length)];
    return {
      id: Date.now(),
      title: palette.title,
      userName: palette.userName,
      numVotes: Math.floor(Math.random() * 1000) + 100,
      colors: palette.colors
    };
  };

  // Fetch random palette
  const fetchRandomPalette = async () => {
    setLoading(prev => ({ ...prev, random: true }));
    // Simulate API delay
    setTimeout(() => {
      setRandomPalettes([generateRandomPalette()]);
      setLoading(prev => ({ ...prev, random: false }));
    }, 500);
  };

  // Fetch top palettes
  const fetchTopPalettes = async () => {
    setLoading(prev => ({ ...prev, top: true }));
    setTimeout(() => {
      const topPalettes = [
        { id: 1, title: 'Ocean Breeze', userName: 'Designer1', numVotes: 1250, colors: ['#0077BE', '#00A8CC', '#7FB069', '#FFD23F', '#FF6B35'] },
        { id: 2, title: 'Sunset Vibes', userName: 'Designer2', numVotes: 980, colors: ['#FF6B6B', '#FF8E53', '#FF6B9D', '#C44569', '#F8B500'] },
        { id: 3, title: 'Forest Path', userName: 'Designer3', numVotes: 875, colors: ['#2D5016', '#61892F', '#86C232', '#C6E174', '#F0F3BD'] },
        { id: 4, title: 'Purple Dreams', userName: 'Designer4', numVotes: 720, colors: ['#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#E17055'] },
        { id: 5, title: 'Minimal Gray', userName: 'Designer5', numVotes: 650, colors: ['#2D3436', '#636E72', '#B2BEC3', '#DDD', '#FFF'] }
      ];
      setTopPalettes(topPalettes);
      setLoading(prev => ({ ...prev, top: false }));
    }, 300);
  };

  // Generate inspiration palettes
  const generateInspiration = async () => {
    setLoading(prev => ({ ...prev, inspiration: true }));
    setInspirationPalettes([]);
    
    setTimeout(() => {
      const palettes = Array(6).fill().map(() => generateRandomPalette());
      
      // Animate palettes appearing one by one
      palettes.forEach((palette, i) => {
        setTimeout(() => {
          setInspirationPalettes(prev => [...prev, palette]);
        }, i * 200);
      });
      
      setLoading(prev => ({ ...prev, inspiration: false }));
    }, 300);
  };

  // Load top palettes on component mount
  useEffect(() => {
    fetchTopPalettes();
  }, []);

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Random Palette Generator */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <button
              onClick={fetchRandomPalette}
              disabled={loading.random}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-medium transition-colors mr-4"
            >
              {loading.random ? 'Generating...' : 'Generate Random Palette'}
            </button>
            
            <button
              onClick={generateInspiration}
              disabled={loading.inspiration}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              {loading.inspiration ? 'Generating...' : 'Generate Inspiration'}
            </button>
          </div>

          {loading.random && <Loader />}
          
          {randomPalettes.length > 0 && (
            <PaletteGrid palettes={randomPalettes} title="Random Palette" />
          )}
        </div>

        {/* Color Search */}
        <ColorSearch />

        {/* Inspiration Palettes */}
        {(inspirationPalettes.length > 0 || loading.inspiration) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Inspiration Gallery
            </h2>
            
            {loading.inspiration && <Loader />}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {inspirationPalettes.map((palette, index) => (
                  <motion.div
                    key={`${palette.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex h-24">
                        {palette.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="flex-1"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {palette.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          by {palette.userName}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Top Palettes */}
        {loading.top && <Loader />}
        
        {topPalettes.length > 0 && (
          <PaletteGrid palettes={topPalettes} title="Top 5 Palettes" />
        )}
      </main>
    </div>
  );
}

export default App;
