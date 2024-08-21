import React from "react";
import { render } from "@testing-library/react-native";
import WeatherInfo from "../../src/components/WeatherInfo";
// import WeatherInfo from '../src/components/WeatherInfo';

jest.mock("../../src/hooks/useWeather", () => ({
  useWeather: (location: string) => ({
    weatherData: {
      current_weather: { temperature: 25, weathercode: 0 },
      daily: { temperature_2m_max: [30, 28], temperature_2m_min: [20, 18] },
    },
    loading: false,
    error: null,
  }),
}));

test("renders weather information correctly", () => {
  const { getByText } = render(<WeatherInfo location="Delhi" />);

  expect(getByText("Delhi")).toBeTruthy();
  expect(getByText("Current Temperature: 25°C")).toBeTruthy();
  expect(getByText("Average Temperature: 25°C")).toBeTruthy();
  expect(getByText("Day 1: Max 30°C")).toBeTruthy();
});
