import React from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>HNAHSH APPP </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: "#dddd",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
  },
  text: {
    color: "#00dd",
    fontSize: 20,
    margin: 20,
    paddingTop: 20,
    alignItems: "flex-end",
  },
});
export default Header;
