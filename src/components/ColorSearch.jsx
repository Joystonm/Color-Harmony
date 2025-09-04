import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Loader from './Loader';

const ColorSearch = () => {
  const [hexInput, setHexInput] = useState('');
  const [colorData, setColorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchColor = async () => {
    if (!hexInput.trim()) return;
    
    // Remove # if present and validate hex
    const hex = hexInput.replace('#', '').toUpperCase();
    if (!/^[0-9A-F]{6}$/.test(hex)) {
      setError('Please enter a valid 6-digit hex code');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate API delay
    setTimeout(() => {
      // Calculate RGB values
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      // Calculate HSV values
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const diff = max - min;
      
      let hue = 0;
      if (diff !== 0) {
        if (max === r) hue = ((g - b) / diff) % 6;
        else if (max === g) hue = (b - r) / diff + 2;
        else hue = (r - g) / diff + 4;
      }
      hue = Math.round(hue * 60);
      if (hue < 0) hue += 360;
      
      const saturation = max === 0 ? 0 : Math.round((diff / max) * 100);
      const value = Math.round((max / 255) * 100);
      
      setColorData({
        title: `Color #${hex}`,
        hex: hex,
        rgb: { red: r, green: g, blue: b },
        hsv: { hue: hue, saturation: saturation, value: value }
      });
      
      setLoading(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchColor();
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Search Color
      </h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            placeholder="Enter hex code (e.g., FF5733)"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>
      )}

      {loading && <Loader />}

      {colorData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-lg shadow-md"
              style={{ backgroundColor: `#${colorData.hex}` }}
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {colorData.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                #{colorData.hex}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">RGB:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                {colorData.rgb.red}, {colorData.rgb.green}, {colorData.rgb.blue}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">HSV:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                {colorData.hsv.hue}°, {colorData.hsv.saturation}%, {colorData.hsv.value}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ColorSearch;
