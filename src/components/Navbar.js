import React from "react";
import { StyleSheet, View } from "react-native";
import IconText from "../ui/IconText";

export default function Navbar() {
  const navbarData = [
    {
      icon: "home",
      name: "Home",
      path: "",
    },
    {
      icon: "search1",
      name: "Search",
      path: "",
    },

  ];
  return (
    <View style={styles.navbar}>
      {navbarData.map((item) => {
        return <IconText icon={item.icon} text={item.name} key={item.name}  />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 105,
    backgroundColor: "#212121",
  },
});
