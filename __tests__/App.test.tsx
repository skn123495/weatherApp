import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import * as useWeather from "../src/hooks/useWeather";
import App from "../App";

jest.mock("../src/hooks/useWeather");

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders initial weather information for the default location", async () => {
    (useWeather.useWeather as jest.Mock).mockReturnValue({
      weatherData: {
        current_weather: { temperature: 25, weathercode: 0 },
        daily: {
          temperature_2m_max: [30, 28],
          temperature_2m_min: [20, 18],
        },
      },
      loading: false,
      error: null,
    });

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText("Delhi")).toBeTruthy();
      expect(getByText("Current Temperature: 25°C")).toBeTruthy();
      expect(getByText("Average Temperature: 25°C")).toBeTruthy();
    });
  });

  test("displays an error message when the weather data cannot be fetched", async () => {
    (useWeather.useWeather as jest.Mock).mockReturnValue({
      weatherData: null,
      loading: false,
      error: "Location not found",
    });

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText("Error: Location not found")).toBeTruthy();
    });
  });
});
