// src/components/WeatherDisplay.tsx
import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector';

const WeatherDisplay: React.FC = () => {
  const weatherData = useAppSelector((state) => state.weather.weatherData)

  if (!weatherData) {
    return null
  }

  return (
    <div className="mt-10 flex flex-col items-center">
      <h2 className="text-2xl">{weatherData.name}</h2>
      <p>{weatherData.weather[0].description}</p>
      <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
    </div>
  )
}

export default WeatherDisplay
