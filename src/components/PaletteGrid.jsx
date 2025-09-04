import React from 'react';
import PaletteCard from './PaletteCard';

const PaletteGrid = ({ palettes, title }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {palettes.map((palette) => (
          <PaletteCard key={palette.id} palette={palette} />
        ))}
      </div>
    </div>
  );
};

export default PaletteGrid;
