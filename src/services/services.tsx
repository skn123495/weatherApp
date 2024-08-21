import axiosRequest from "./AxiosRequest";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const getCoordinates = async (location: string) => {
  try {
    const response = await axiosRequest.get(`${GEO_API_URL}?name=${location}`, {
      params: { name: location },
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results;
    }

    throw new Error("Location not found");
  } catch (error) {
    throw error;
  }
};

export const getWeatherForecast = async (
  latitude: number,
  longitude: number
) => {
  try {
    const response = await axiosRequest.get(WEATHER_API_URL, {
      params: {
        latitude,
        longitude,
        daily: "temperature_2m_max,temperature_2m_min,weathercode",
        current_weather: true,
        timezone: "auto",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
