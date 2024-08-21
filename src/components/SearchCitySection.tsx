import React from "react";
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SearchCitySection(props: any) {
  const { locations, handleLocation, showSearch = true } = props || {};
  return (
    <>
      {locations?.length > 2 && showSearch && (
        <ScrollView style={styles.container}>
          {locations?.map((loc, index) => {
            const showBorder = index + 1 !== locations.length;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleLocation(loc)}
                style={[
                  styles.locationButton,
                  showBorder && styles.borderBottom,
                ]}
              >
                <Text style={styles.locationText}>
                  {loc.name}, {loc.country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "18%",
    width: "78%",
    backgroundColor: "#fff",
    top: Platform.OS === "android" ? "16%" : "13%",
    borderRadius: 8,
    alignSelf: "center",
    borderWidth: 0.4,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    padding: 12,
    paddingHorizontal: 1,
    marginBottom: 4,
    borderRadius: 5,
    borderColor: "#c2c2c2",
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: "#9CA3AF",
  },
  locationText: {
    color: "black",
    fontSize: 18,
    marginLeft: 8,
  },
});
