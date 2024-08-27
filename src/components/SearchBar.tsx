"use client"; // Ensure this is at the very top

import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { useAppDispatch } from "../hooks/useAppDispatch";
import Image from "next/image";
import { getWeatherByLocalityId } from "@/features/weather/WeatherSlice";

interface Locality {
  cityName: string;
  localityName: string;
  localityId: string;
  latitude: number;
  longitude: number;
  device_type: string;
}
interface SearchBarProps {
  localities: Locality[];
  onLocalitySelected: (cityName: string, localityName: string) => void; // Add this prop
}

const SearchBar: React.FC<SearchBarProps> = ({ localities, onLocalitySelected }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<Locality[]>([]);
  const dispatch = useAppDispatch(); // Initialize dispatch

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : localities
          .filter((locality) =>
            locality.localityName.toLowerCase().includes(inputValue)
          )
          .slice(0, 10); // Limit to 10 suggestions
  };

  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: Locality) => suggestion.localityName;

  const renderSuggestion = (suggestion: Locality) => (
    <div className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
      {suggestion.localityName}, {suggestion.cityName}
    </div>
  );

  const onChange = (event: any, { newValue }: any) => {
    setValue(newValue);
  };

  const onSuggestionSelected = (event: any, { suggestion }: any) => {
    const localityId = suggestion.localityId;
    dispatch(getWeatherByLocalityId(localityId)); // Fetch the weather data for the selected locality

    // Pass the city and locality names to the parent component
    onLocalitySelected(suggestion.cityName, suggestion.localityName);
  };

  const handleSearch = () => {
    if (suggestions.length > 0) {
      const firstSuggestion = suggestions[0];
      dispatch(getWeatherByLocalityId(firstSuggestion.localityId)); // Trigger search for the first suggestion

      // Pass the city and locality names to the parent component
      onLocalitySelected(firstSuggestion.cityName, firstSuggestion.localityName);
    }
  };

  const clearInput = () => {
    setValue("");
    setSuggestions([]);
    
  };

  const inputProps = {
    placeholder: "Search for a locality",
    value,
    onChange,
    className:
      "w-full px-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400",
  };

  return (
    <>
      <div className="relative w-full max-w-xl mt-2">
        <Image
          src="/search.svg"
          className="absolute left-4 top-4 w-5 opacity-40"
          alt="Search icon"
          width={20}
          height={20}
        />
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={inputProps}
          theme={{
            container: "relative w-full",
            suggestionsContainer:
              "absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto", // Scrollable container with max height
            suggestionsList: "list-none p-0 m-0",
            suggestion: "py-2 px-4 hover:bg-gray-200 cursor-pointer",
            suggestionHighlighted: "bg-gray-200",
          }}
        />
        {value && (
          <Image
            src="/close.png" // Replace with your actual clear icon path
            className="absolute right-6 top-4 w-3 cursor-pointer"
            alt="Clear icon"
            width={20}
            height={20}
            onClick={clearInput}
          />
        )}
        <Image
          src="/vs.png"
          className="absolute right-12 top-4 w-3"
          alt="Voice search icon"
          width={20}
          height={20}
        />
      </div>
      <div className="flex justify-center mt-6 space-x-2">
        <button
          type="submit"
          onClick={handleSearch}
          className="s-btn mr-2 px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-gray-600 bg-slate-100 hover:border-gray-400 hover:text-gray-800 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 cursor-pointer"
        >
          Google Search
        </button>
        <button
          type="button"
          className="s-btn px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-gray-600 bg-slate-100 hover:border-gray-400 hover:text-gray-800 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 cursor-pointer"
        >
          I&apos;m Feeling Lucky
        </button>
      </div>
    </>
  );
};

export default SearchBar;
