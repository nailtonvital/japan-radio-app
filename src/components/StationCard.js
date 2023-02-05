import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import ImageError from "../assets/error-picture.png";

export default function StationCard({
  stationTitle,
  stationUrl,
  stationImage,
  setPlayStatus,
  setAudioName,
  playRadio
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        playRadio(stationUrl, stationTitle, setPlayStatus, setAudioName);
      }}
    >
      {stationImage !== "" ? (
        <Image
          source={{ uri: stationImage }}
          style={styles.cardImage}
          loading="lazy"
        />
      ) : (
        <Image
          source={ImageError}
          style={styles.cardImage}
        />
      )}

      <Text style={styles.cardTitle}>{stationTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#212121",
    minWidth: 180,
    maxWidth: 180,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  cardTitle: {
    backgroundColor: "#3C3C3E",
    padding: 12,
    paddingBottom: 20,
    borderRadius: 8,
    color: "white",
    height: 80,
    fontSize: 17,
    fontFamily: "Poppins-Regular",
  },
  cardImage: {
    width: "auto",
    height: 90,
    resizeMode: "contain",
    justifyContent: "center",
    marginVertical: 15,
  },
});
