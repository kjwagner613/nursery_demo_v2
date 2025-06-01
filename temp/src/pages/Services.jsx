import React from "react";
import "../index.css";
import planting1 from "../assets/images/planting1.jpg";
import landscape2 from "../assets/images/landscape2.jpg";

const Services = () => {
  return (
    <>     
      <h1 style={{ fontFamily: 'var(--font-main)', fontSize: 'var(--font-size-titles)' }} className="my-8">
        Services
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col justify-center items-center">
          <img src={planting1} alt="First Image" className="w-full h-auto rounded-lg mt-2" />
          <div className="service-item mt-4">
            <h3 className="text-gray-700 text-2xl" style={{ fontFamily: "Playfair Display" }}>Planting</h3>
            <p className="text-gray-700 text-lg">
              Our experienced team will expertly plant trees and shrubs sourced directly from our nursery.
              With over 1000 trees planted in recent years, we guarantee a high-quality planting service.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h3 className="text-gray-700 text-2xl my-3 mt-6" style={{ fontFamily: "Playfair Display" }}>
            Landscaping and Maintenance
          </h3>
          <p className="text-gray-700 text-lg mt-1 my-3">
            Our comprehensive landscape maintenance program encompasses weekly mowing and bi-weekly maintenance visits.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <h3 className="text-gray-700 text-2xl my-1 mt-0" style={{ fontFamily: "Playfair Display" }}>Irrigation</h3>
          <div className="service-item mt-8">
            <p className="text-gray-700 text-lg">
              Want a vibrant, healthy landscape? A great irrigation system is the key!
            </p>
            <img src={landscape2} alt="Second Image" className="w-full h-auto rounded-lg my-10" />
          </div>
        </div>
      </div>  
    </>
  );
};

export default Services; // ✅ No createRoot() needed here!