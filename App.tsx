import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import WeatherInfo from "./src/components/WeatherInfo";
import SearchCitySection from "./src/components/SearchCitySection";
import { debouncedSearch } from "./src/utils/logic";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "lightgrey" },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: "center",
  },
  locationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    width: "80%",
    alignItems: "center",
  },
  mTop: {
    marginTop: Platform.OS === "android" && 40,
  }, // for android
});

const App = () => {
  const [location, setLocation] = useState("Delhi");
  const [searchLocation, setSearchLocation] = useState("");
  const [locations, setLocations] = useState<any[]>([]);

  // Handler for text input change
  const handleChange = (text: string) => {
    setSearchLocation(text);
    debouncedSearch(text, setLocations);
  };

  // Handle location selection
  const handleLocationSelect = (loc: any) => {
    setLocation(loc.name);
    setSearchLocation("");
    setLocations([]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.mTop}>
        <TextInput
          value={searchLocation}
          onChangeText={handleChange}
          placeholder="Search for a location"
          style={styles.input}
        />
      </View>
      <SearchCitySection
        handleLocation={handleLocationSelect}
        locations={locations}
      />
      <View style={{ marginTop: "20%", alignSelf: "center" }}>
        <WeatherInfo location={location} />
      </View>
    </SafeAreaView>
  );
};

export default App;
