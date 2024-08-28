"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LocalitySearch from "@/components/SearchBar";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import WeatherDetails from "@/components/WeatherDisplay";

export default function Home() {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.weather.weatherData);
  const weatherStatus = useAppSelector((state) => state.weather.status);
  const [localities, setLocalities] = useState([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedLocality, setSelectedLocality] = useState<string | null>(null);

  const handleLocalitySelected = (cityName: string, localityName: string) => {
    setSelectedCity(cityName);
    setSelectedLocality(localityName);
  };
  const handleClearWeather = () => {
    setSelectedCity(null);
    setSelectedLocality(null);
  };

  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        const response = await fetch("/api/parsePdf");
        const data = await response.json();
        setLocalities(data);
      } catch (error) {
        console.error("Failed to fetch localities:", error);
      }
    };

    fetchLocalities();
  }, []);

  return (
    <>
      <nav className="flex justify-end items-center mx-4 mt-14">
        <a href="#" className="text-base text-black mr-3">
          Gmail
        </a>
        <a href="#" className="text-base text-black mr-3">
          Images
        </a>
        <Image
          src="/menu.png"
          className="w-8 h-8 p-1 cursor-pointer hover:opacity-80"
          alt="Menu"
          width={20}
          height={20}
        />
        <button className="ml-3 py-2 px-4 border-2 border-blue-500 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none">
          Sign in
        </button>
      </nav>

      <section className="flex flex-col items-center justify-center flex-1 w-full px-4">
        <Image
          src="/google.png"
          className={`block w-40 mt-20 mb-10 ${weatherData ? "mt-10" : ""}`}
          alt="Google Logo"
          width={500}
          height={500}
        />

        <div className="w-full items-center flex flex-col">
          <LocalitySearch
            localities={localities}
            onLocalitySelected={handleLocalitySelected}
            onClearWeather={handleClearWeather}
          />
        </div>

        {/* Conditionally render WeatherDetails based on weatherData */}
        {weatherStatus === "loading" && (
          <div
            className="w-12 h-12  mt-8 rounded-full animate-spin
           border-y-2 border-solid border-blue-500 border-t-transparent"></div>
        )}
        {weatherStatus === "succeeded" && weatherData && selectedCity && selectedLocality && (
          <WeatherDetails
            city={selectedCity}
            locality={selectedLocality}
            temperature={weatherData.temperature}
            humidity={weatherData.humidity}
            wind_speed={weatherData.wind_speed}
            wind_direction={weatherData.wind_direction}
            rain_intensity={weatherData.rain_intensity}
            rain_accumulation={weatherData.rain_accumulation}
          />
        )}
        {weatherStatus === "failed" && <p>Error fetching weather data.</p>}

        {/* <div className="mt-8 text-sm text-gray-700">
          Google offered in:
          <a href="#" className="text-blue-600 ml-1 hover:underline">
            Nederlands
          </a>
          <a href="#" className="text-blue-600 ml-1 hover:underline">
            Frysk
          </a>
        </div> */}
      </section>

      <footer className="bg-gray-200 py-4">
        <h4 className="text-gray-600 text-base font-normal pl-4 border-l-4 border-gray-300 text-center">
          India
        </h4>
        <div className="flex w-100 flex-wrap">
          <div className="flex-1 pl-6">
            <a href="#" className="text-gray-700 text-sm hover:underline">
              Advertising
            </a>
            <a href="#" className="text-gray-700 text-sm ml-2 hover:underline">
              Business
            </a>
            <a href="#" className="text-gray-700 text-sm ml-2 hover:underline">
              About
            </a>
            <a href="#" className="text-gray-700 text-sm ml-2 hover:underline">
              How Search works
            </a>
          </div>
          <div className="flex-1 text-right pr-6 flex-wrap">
            <a href="#" className="text-gray-700 text-sm hover:underline">
              Privacy
            </a>
            <a href="#" className="text-gray-700 text-sm ml-2 hover:underline">
              Terms
            </a>
            <a href="#" className="text-gray-700 text-sm ml-2 hover:underline">
              Settings
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
