import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { localityId } = req.query;

  if (!localityId) {
    res.status(400).json({ error: 'Locality ID is required' });
    return;
  }

  try {
    const response = await fetch(
      `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`,
      {
        headers: {
          'X-Zomato-Api-Key': process.env.NEXT_PUBLIC_ZOMATO_API_KEY!,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();
    res.status(200).json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}
