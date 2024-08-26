import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { useAppDispatch } from "../hooks/useAppDispatch"; // Import your dispatch hook
import { getWeatherByLocalityId } from "../features/weather/WeatherSlice"; // Import the Redux action

interface Locality {
  cityName: string;
  localityName: string;
  localityId: string;
  latitude: number;
  longitude: number;
  device_type: string;
}

const SearchBar: React.FC<{ localities: Locality[] }> = ({ localities }) => {
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
    dispatch(getWeatherByLocalityId(localityId)); // Dispatch the action to fetch weather data
  };

  const handleSearch = () => {
    if (suggestions.length > 0) {
      const firstSuggestion = suggestions[0];
      dispatch(getWeatherByLocalityId(firstSuggestion.localityId));
    }
  };

  const inputProps = {
    placeholder: "Search for a locality",
    value,
    onChange,
    className:
      "w-full px-4 py-2 border-none rounded-l-full focus:outline-none text-gray-800",
  };

  return (
    <>
    <div className="w-full flex items-center bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 max-w-xl">
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
            "absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10",
          suggestionsList: "list-none p-0 m-0",
          suggestion: "py-2 px-4 hover:bg-gray-200 cursor-pointer",
          suggestionHighlighted: "bg-gray-200",
        }}
      />
    </div>
      <div className="flex mt-8 space-x-2 justify-center">
        <button
          type="submit"
          onClick={handleSearch}
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 border border-gray-200 rounded hover:bg-gray-300">
          Google Search
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 border border-gray-200 rounded hover:bg-gray-300">
          I'm Feeling Lucky
        </button>
      </div>
      </>
  );
};

export default SearchBar;
