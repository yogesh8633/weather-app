// src/utils/getWeatherData.ts

const API_URL = 'https://www.weatherunion.com/gw/weather/external/v0';
const API_KEY = "0bdb5d005a12ff21d67b212bf647abc8";

export const fetchWeatherByCoordinates = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `${API_URL}/get_weather_data?latitude=${latitude}&longitude=${longitude}`,
      {
        headers: {
          'X-Zomato-Api-Key': API_KEY!,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data.locality_weather_data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchWeatherByLocalityId = async (localityId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/get_locality_weather_data?locality_id=${localityId}`,
      {
        headers: {
          'X-Zomato-Api-Key': API_KEY!,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return data.locality_weather_data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
