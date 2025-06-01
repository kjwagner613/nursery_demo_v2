import React from 'react';
import { motion } from 'framer-motion';

const SunMoon = () => {
  return (
    <motion.div
      initial={{ x: '-100%', y: '50%' }} // Start off-screen
      animate={{ x: '100%', y: '0%' }} // Move across the screen
      transition={{ duration: 5, ease: 'easeInOut' }} // Animation settings
      style={{
        position: 'absolute',
        top: '0%',
        left: '0%',
        width: '100px',
        height: '100px',
        background: 'yellow', // Change to an image for the sun or moon
        borderRadius: '50%',
      }}
    />
  );
};

export default SunMoon;