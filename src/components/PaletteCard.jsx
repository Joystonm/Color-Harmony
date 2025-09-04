import React from 'react';
import { motion } from 'framer-motion';

const PaletteCard = ({ palette }) => {
  // Copy single hex code to clipboard
  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
  };

  // Copy all hex codes to clipboard
  const copyAllHex = () => {
    const allHex = palette.colors.join(', ');
    navigator.clipboard.writeText(allHex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Color swatches */}
      <div className="flex h-32">
        {palette.colors.map((color, index) => (
          <button
            key={index}
            onClick={() => copyToClipboard(color)}
            className="flex-1 hover:scale-105 transition-transform cursor-pointer group relative"
            style={{ backgroundColor: color }}
            title={`Click to copy ${color}`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-medium">
                {color}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Palette info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
          {palette.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          by {palette.userName} • {palette.numVotes} votes
        </p>
        
        {/* Hex codes */}
        <div className="flex flex-wrap gap-1 mb-3">
          {palette.colors.map((color, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300"
            >
              {color}
            </span>
          ))}
        </div>

        {/* Copy all button */}
        <button
          onClick={copyAllHex}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
        >
          Copy All Hex
        </button>
      </div>
    </motion.div>
  );
};

export default PaletteCard;
