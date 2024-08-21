import { waitFor } from "@testing-library/react-native";
import { useWeather } from "../../src/hooks/useWeather";
import {
  getCoordinates,
  getWeatherForecast,
} from "../../src/services/services";

import { renderHook, act } from "@testing-library/react-hooks";

// Mock the services
jest.mock("../../src/services/services");

const mockedGetCoordinates = getCoordinates as jest.Mock;
const mockedGetWeatherForecast = getWeatherForecast as jest.Mock;

describe("useWeather", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return weather data successfully", async () => {
    const mockCoordinates = [{ latitude: 37.7749, longitude: -122.4194 }];
    const mockWeatherData = { temperature: 20, forecast: "Sunny" };

    // Mocking the API calls
    mockedGetCoordinates.mockResolvedValueOnce(mockCoordinates);
    mockedGetWeatherForecast.mockResolvedValueOnce(mockWeatherData);

    const { result } = renderHook(() => useWeather("San Francisco"));

    // Initially, the hook should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.weatherData).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for the hook to update after the async operations
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // After fetching data
    expect(result.current.weatherData).toEqual(mockWeatherData);
    expect(result.current.error).toBeNull();
  });

  it("should handle errors when fetching weather data", async () => {
    const mockError = new Error("Failed to fetch weather data");

    // Mocking the API calls to throw an error
    mockedGetCoordinates.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useWeather("Invalid Location"));

    // Initially, the hook should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.weatherData).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for the hook to update after the async operations
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // After error occurs
    expect(result.current.weatherData).toBeNull();
    expect(result.current.error).toBe(mockError.message);
  });
});
