import React from 'react';
import '../index.css';
import workersImg from '../assets/images/workers.png';
import workersImg2 from '../assets/images/worker2.webp';
import workersImg3 from '../assets/images/worker3.webp';
import FluffyCloud from '../components/FluffyCloud';
import CloudGroup from '../components/CloudGroup';

import { motion } from 'framer-motion';

const SunMoon = () => {
  return (
    <motion.div
      initial={{ x: '-100%', y: '50%' }} // Start off-screen
      animate={{ x: '1000%', y: '-250%' }} // Move across the screen
      transition={{ duration: 25, ease: 'easeInOut' }} // Animation settings
      style={{
        position: 'absolute',
        top: '30%',
        left: '0%',
        width: '100px',
        height: '100px',
        background: 'yellow', // Change to an image for the sun or moon
        borderRadius: '50%',
      }}
    />
  );
};

// export SunMoon as a named export
export { SunMoon };




const CloudAnim = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: 'skyblue' }}>
      <CloudGroup />
      <FluffyCloud style={{ top: '30%', left: '5%' }} /> {/* Add more clouds with different positions */}
      <FluffyCloud style={{ top: '40%', left: '5%' }} />
    </div>
  );
};

export { CloudAnim };

function About() {
  return (
    <div>
<FluffyCloud />
<h1
  style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-titles)' }}
  className="my-8"
>
  Company Description
</h1>
<SunMoon />
<div className="about-company">
        <p className="self-stretc text-justify">
          At Sierra-Cascade Nursery, Inc. (SCN), our core purpose is to provide meaningful livelihoods for talented and hardworking individuals and their families. We are dedicated to serving our customers with high-quality products while stewarding the land in a way that is both beautiful and sustainable.
          SCN is built on three fundamental values:
          - Work & Life Balance – Supporting our employees as they strive for both professional excellence and personal well-being.
          - Mutual Respect & Community – Fostering a collaborative environment that values fairness, teamwork, and shared success.
          - Passion & Excellence – Committing to doing our best, always pushing forward with integrity and innovation.
          Our continued success is driven by a strategic focus on:
          - Advancing innovation in materials, processes, and scientific practices.
          - Cultivating a culture of service, both within our team and among our partners.
          - Staying true to our growing business, ensuring sustainability and long-term impact.
          - Acting with responsibility and integrity, always striving to do what’s right.
        </p>
   
      </div>
      <FluffyCloud />
      <div className="about-images mt-15">
        <FluffyCloud />
        <FluffyCloud />
        <FluffyCloud />
        <FluffyCloud />
        <img className="worker2"  style={{ marginTop: '60px' }} src={workersImg2} alt="Worker2" />
        <img className="workers" style={{ marginTop: '30px' }} src={workersImg} alt="Workers" />
        <img className="worker3"  style={{ marginTop: '60px' }}  src={workersImg3} alt="Worker3" />
      </div>
      <FluffyCloud />
      <FluffyCloud />
      <FluffyCloud />
    </div>
  );
}

export default About;