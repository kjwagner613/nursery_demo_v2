import { useState } from "react";
import "../styles/AirQualityFull.css"; // ✅ Optional styling

const AirQualityFull = ({ text, description }) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="AirQualityFull-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {text}
      {visible && <span className="AirQualityFull">{description}</span>}
    </span>
  );
};

export default AirQualityFull;