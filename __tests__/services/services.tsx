import axiosRequest from "../../src/services/AxiosRequest";
import {
  getCoordinates,
  getWeatherForecast,
} from "../../src/services/services";

jest.mock("../../src/services/AxiosRequest");

const mockedAxiosRequest = axiosRequest as jest.Mocked<typeof axiosRequest>;

describe("Weather and Geocoding Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCoordinates", () => {
    it("should return location coordinates when the location is found", async () => {
      const mockResponse = {
        data: {
          results: [{ latitude: 37.7749, longitude: -122.4194 }],
        },
      };

      mockedAxiosRequest.get.mockResolvedValueOnce(mockResponse);

      const location = "San Francisco";
      const result = await getCoordinates(location);

      expect(result).toEqual(mockResponse.data.results);
      expect(mockedAxiosRequest.get).toHaveBeenCalledWith(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
        { params: { name: location } }
      );
    });

    it("should throw an error if the location is not found", async () => {
      const mockResponse = {
        data: {
          results: [],
        },
      };

      mockedAxiosRequest.get.mockResolvedValueOnce(mockResponse);

      await expect(getCoordinates("Unknown Location")).rejects.toThrow(
        "Location not found"
      );
    });

    it("should throw an error if the API call fails", async () => {
      const mockError = new Error("Network Error");

      mockedAxiosRequest.get.mockRejectedValueOnce(mockError);

      await expect(getCoordinates("San Francisco")).rejects.toThrow(
        "Network Error"
      );
    });
  });

  describe("getWeatherForecast", () => {
    it("should return weather data for valid coordinates", async () => {
      const mockResponse = {
        data: {
          daily: {
            temperature_2m_max: [22],
            temperature_2m_min: [15],
            weathercode: [0],
          },
          current_weather: {
            temperature: 20,
          },
        },
      };

      const latitude = 37.7749;
      const longitude = -122.4194;

      mockedAxiosRequest.get.mockResolvedValueOnce(mockResponse);

      const result = await getWeatherForecast(latitude, longitude);

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxiosRequest.get).toHaveBeenCalledWith(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude,
            longitude,
            daily: "temperature_2m_max,temperature_2m_min,weathercode",
            current_weather: true,
            timezone: "auto",
          },
        }
      );
    });

    it("should throw an error if the API call fails", async () => {
      const mockError = new Error("Network Error");

      mockedAxiosRequest.get.mockRejectedValueOnce(mockError);

      await expect(getWeatherForecast(37.7749, -122.4194)).rejects.toThrow(
        "Network Error"
      );
    });
  });
});
