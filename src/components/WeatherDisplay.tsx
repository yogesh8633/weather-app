import React from "react";

interface WeatherDisplayProps {
  city: string | null;
  locality: string | null;
  temperature: number | null;
  humidity: number | null;
  wind_speed: number | null;
  wind_direction: number | null;
  rain_intensity: number | null;
  rain_accumulation: number | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  city,
  locality,
  temperature,
  humidity,
  wind_speed,
  wind_direction,
  rain_intensity,
  rain_accumulation,
}) => {
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg max-w-lg mx-auto mt-8 shadow-lg mb-5">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold">{city}</h1>
        <p className="text-xl">{locality}</p>
      </div>
      <div className="text-center mb-6">
        <div className="flex justify-center items-center my-4">
          {/* <img src={icon} alt="weather icon" className="w-24 h-24" /> */}
          <p className="text-5xl ml-4">{temperature}&#176;</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center bg-gray-700 p-4 rounded-lg">
          <i className="fas fa-tint text-2xl mr-4"></i>
          <div>
            <p className="text-xs">Humidity</p>
            <p>{humidity !== null ? `${humidity}%` : "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-700 p-4 rounded-lg">
          <i className="fas fa-wind text-2xl mr-4"></i>
          <div>
            <p className="text-xs">Wind Speed</p>
            <p>{wind_speed !== null ? `${wind_speed} m/s` : "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-700 p-4 rounded-lg">
          <i className="fas fa-compass text-2xl mr-4"></i>
          <div>
            <p className="text-xs">Wind Direction</p>
            <p>{wind_direction !== null ? `${wind_direction}°` : "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-700 p-4 rounded-lg">
          <i className="fas fa-cloud-rain text-2xl mr-4"></i>
          <div>
            <p className="text-xs">Rain Intensity</p>
            <p>{rain_intensity !== null ? `${rain_intensity} mm/h` : "N/A"}</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-700 p-4 rounded-lg">
          <i className="fas fa-water text-2xl mr-4"></i>
          <div>
            <p className="text-xs">Rain Accumulation</p>
            <p>
              {rain_accumulation !== null ? `${rain_accumulation} mm` : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
