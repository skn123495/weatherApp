import React from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { useWeather } from "../hooks/useWeather";
import getWeatherImage from "../helpers/getWeatherImage";

type WeatherInfoProps = {
  location: string;
};

const WeatherInfo: React.FC<WeatherInfoProps> = ({ location }) => {
  const { weatherData, loading, error } = useWeather(location);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!weatherData) {
    return <Text>No weather data available.</Text>;
  }

  const { current_weather, daily } = weatherData;
  const averageTemp = Math.round(
    (daily.temperature_2m_max[0] + daily.temperature_2m_min[0]) / 2
  );
  const weatherImage = getWeatherImage(current_weather.weathercode);

  return (
    <View style={{marginTop:"20%"}}>
      <Text>{location}</Text>
      <Text>{`Current Temperature: ${current_weather.temperature}°C`}</Text>
      <Image
        source={{ uri: weatherImage }}
        style={{ width: 100, height: 100 }}
      />
      <Text>{`Average Temperature: ${averageTemp}°C`}</Text>
      <Text>Weekly Forecast:</Text>
      {daily?.temperature_2m_max?.map((maxTemp: number, index: number) => (
        <Text key={index}>{`Day ${index + 1}: Max ${maxTemp}°C`}</Text>
      ))}
    </View>
  );
};

export default WeatherInfo;
