import React from "react";
import aircraftImg from "../assets/aircraft.png";

const AircraftInfoCard = ({ data }) => {
  return (
    <div className="info-card">
      {/* IMAGE SIDE */}
      <div className="info-left">
        <img
          src={aircraftImg}
          alt="Aircraft"
          className="info-image"
        />
        <a href="#" className="update-link">
          ✏️ Update Image
        </a>
      </div>

      {/* INFO SIDE */}
      <div className="info-right">
        <div className="info-grid">
          {Object.entries(data).map(([label, value]) => (
            <div key={label} className="info-item">
              <p className="info-label">{label}</p>
              <p className="info-value">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AircraftInfoCard;