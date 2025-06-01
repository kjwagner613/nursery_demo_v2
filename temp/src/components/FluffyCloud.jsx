import React from 'react';
import { motion } from 'framer-motion';

const FluffyCloud = ({ style }) => {
  const baseStyle = {
    position: 'absolute',
    top: '20%', // Default vertical position
    left: '0%',
    width: '100px',
    height: '60px',
    background: 'white',
    borderRadius: '40% / 60%', // Change to more cloud-like shape
    boxShadow: '0 0 20px rgba(153, 145, 145, 0.5)', // Soft shadow for fluffiness
  };

  // Merge base style with passed style prop
  const combinedStyle = { ...baseStyle, ...style };

  return (
    <motion.div
      initial={{ x: '-100%', y: '20%' }} // Start off-screen
      animate={{ x: '1400%', y: '-50%' }} // Move across the screen
      transition={{ duration: 50, ease: 'linear', repeat: Infinity }} // Animation settings
      style={combinedStyle}
    />
  );
};

export default FluffyCloud;


// Usage in a component
// import FluffyCloud from './FluffyCloud';