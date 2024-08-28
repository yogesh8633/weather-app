# Weather App

This project is a simple weather application built using Next.js, Tailwind CSS, and TypeScript. The application allows users to search for weather information by locality name, with weather data being fetched from the WeatherUnion API.

## Features

- **Search Locality**: Users can search for a locality, and the app will provide auto-suggestions as they type.
- **Weather Display**: Once a locality is selected, the weather details for that locality are displayed.
- **Responsive Design**: The app is fully responsive and works on all device sizes.
- **Material Design Icons**: The app uses Material Design Icons for a clean and modern look.

## Technologies Used

- **Next.js**: A React framework for production.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Redux**: For state management.
- **AutoSuggest**: For providing search suggestions as the user types.
- **Material Design Icons (MDI)**: For the weather icons and UI elements.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yogesh8633/weather-app.git

2. Navigate into the project directory:
  
    ```bash
    cd weather-app

3. Install the dependencies:

    ```bash
    npm install

4. Run the development server:
    
    ```bash
    npm run dev

### Project Structure

```plaintext
weather-app/
├── public/                # Static assets like images, icons, and PDFs
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout component with global styles
│   │   ├── page.tsx           # Main page (Home) of the application
│   │   ├── provider.tsx       # Redux Provider setup
│   ├── components/
│   │   ├── SearchBar.tsx      # Search bar component with auto-suggestions
│   │   ├── WeatherDisplay.tsx # Component to display weather details
│   ├── features/
│   │   ├── weather/           # Redux slice for managing weather state
│   │   │   ├── WeatherSlice.ts  # Weather slice with async thunks
│   ├── hooks/
│   │   ├── useAppDispatch.ts  # Custom hook to use Redux dispatch
│   │   ├── useAppSelector.ts  # Custom hook to use Redux selector
│   ├── pages/
│   │   ├── api/
│   │   │   ├── parsePdf.ts    # API route to parse PDF data
│   ├── store/
│   │   ├── index.ts           # Redux store setup
│   ├── utils/
│   │   ├── fetchWeather.ts    # Utility functions for fetching weather data
├── README.md                # Project documentation
├── package.json             # NPM package configuration
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
```

### API Usage

The application fetches weather data from the WeatherUnion API. Below are the main API functions used in the project.

#### Fetch Weather Data by Locality ID

```typescript
import { fetchWeatherByLocalityId } from '@/utils/fetchWeather';

// Fetch weather data by locality ID
const data = await fetchWeatherByLocalityId(localityId);

//This function takes a localityId as a parameter and returns the weather data for that specific locality.
```

