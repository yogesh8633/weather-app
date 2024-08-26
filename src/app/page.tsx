"use client";

import { useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from "../hooks/useAppSelector";
import LocalitySearch from '@/components/SearchBar';

export default function Home() {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state) => state.weather.weatherData);
  const weatherStatus = useAppSelector((state) => state.weather.status);
  const [localities, setLocalities] = useState([]);

  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        const response = await fetch('/api/parsePdf');
        const data = await response.json();
        setLocalities(data);
      } catch (error) {
        console.error('Failed to fetch localities:', error);
      }
    };

    fetchLocalities();
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-between bg-white text-black">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow">
        <img
          src="/google_logo.png" // Replace with the correct path to the Google logo
          alt="Google Logo"
          className="w-[272px] h-auto mt-16 mb-8"
        />

        <div className="w-full max-w-xl">
          <LocalitySearch localities={localities} />

          
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-4">
        <div className="flex justify-center space-x-4 text-gray-700 text-sm">
          <a href="#" className="hover:underline">Advertising</a>
          <a href="#" className="hover:underline">Business</a>
          <a href="#" className="hover:underline">How Search works</a>
        </div>
        <div className="flex justify-center mt-2 space-x-4 text-gray-700 text-sm">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Settings</a>
        </div>
      </footer>
    </div>
  );
}
