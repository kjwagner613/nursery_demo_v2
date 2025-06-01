// CloudGroup.js
import React from 'react';
import FluffyCloud from './FluffyCloud';

const CloudGroup = () => {
  return (
    <div style={{ position: 'relative', width: '250px', height: '120px' }}>
      <FluffyCloud style={{ top: '50%', left: '10%', width: '80px', height: '50px' }} /> {/* First cloud */}
      <FluffyCloud style={{ top: '65%', left: '40%', width: '90px', height: '55px' }} /> {/* Second cloud, right and lower */}
      <FluffyCloud style={{ top: '30%', left: '25%', width: '100px', height: '60px' }} /> {/* Third cloud, on top */}
    </div>
  );
};

export default CloudGroup;
