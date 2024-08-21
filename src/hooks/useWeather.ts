import { useState, useEffect } from "react";
import { getCoordinates, getWeatherForecast } from "../services/services";

export const useWeather = (location: string) => {

  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const locations = await getCoordinates(location);
        const { latitude, longitude } = locations[0];
        const weather = await getWeatherForecast(latitude, longitude);
        setWeatherData(weather);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { weatherData, loading, error };
};
