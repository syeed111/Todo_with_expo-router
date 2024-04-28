import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>To-do App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
    marginTop: 25,
    paddingTop: 25,
    backgroundColor: "coral",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
