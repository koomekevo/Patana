import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const handleVideoChat = () => {
    // Navigate to the video chat screen
    navigation.navigate("VideoChat");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Home Screen</Text>
      <Button mode="contained" onPress={handleVideoChat} style={styles.button}>
        Start Video Chat
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: "80%",
  },
});

export default HomeScreen;
