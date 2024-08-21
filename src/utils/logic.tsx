import { getCoordinates } from "../services/services";
import { debounce } from "lodash";

// Function to handle API response
export const handleApiResponse = async (
  search: string,
  setLocations: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const data = await getCoordinates(search);
    setLocations(data);

    if (data.length === 0) {
      alert("Location does not exist");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    alert("Failed to fetch location data");
  }
};

// Debounced search function
export const debouncedSearch = (
  search: string,
  setLocations: React.Dispatch<React.SetStateAction<any[]>>
) => {
  debounce(async () => {
    if (search.length > 2) {
      await handleApiResponse(search, setLocations);
    }
  }, 500)();
};
