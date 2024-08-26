import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const pdfPath = path.resolve('./public/weather.pdf');
    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text;
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);

    const localities = [];

    for (let line of lines) {
      if (
        line.startsWith('cityNamelocalityNamelocalityId') || 
        line === 'Live Weather - A Zomato Giveback' || 
        line === 'The list of cities and localities where live weather information is available' ||
        line === '1'
      ) {
        continue;
      }

      // Regex pattern to extract the required fields
      const match = line.match(/^(.+?)([A-Z]{3}\d{6})(\d{2}\.\d{6})(\d{2}\.\d{6})(.+)$/);

      if (match) {
        const [_, fullLocation, localityId, latitude, longitude, device_type] = match;

        // Split fullLocation into cityName and localityName
        const cityNameMatch = fullLocation.match(/^[A-Za-z\s]+?(?=[A-Z])/);  // Matches up to the last uppercase letter before the locality ID
        const cityName = cityNameMatch ? cityNameMatch[0] : '';
        const localityName = fullLocation.slice(cityName.length).trim();

        // Validate and format latitude and longitude
        const formattedLatitude = parseFloat(latitude).toFixed(6);
        const formattedLongitude = parseFloat(longitude).toFixed(6);

        // Add to the localities array
        localities.push({
          cityName: cityName.trim(),
          localityName: localityName.trim(),
          localityId: localityId.trim(),
          latitude: parseFloat(formattedLatitude),
          longitude: parseFloat(formattedLongitude),
          device_type: device_type.trim(),
        });
      }
    }

    res.status(200).json(localities);
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).json({ error: 'Failed to parse PDF' });
  }
}
