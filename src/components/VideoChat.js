import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";
import axios from "axios";

const VideoChat = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    // Request camera permission on component mount
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const initiateVideoChat = async () => {
    try {
      // Fetch a new room ID from the backend
      const response = await axios.post(
        "http://your-backend-url/api/chat/initiate"
      );
      setRoomId(response.data.roomId);
    } catch (error) {
      console.error("Error initiating video chat:", error);
      Alert.alert("Error", "Failed to initiate video chat");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {hasPermission === null ? (
        <Text>Requesting camera permission...</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Camera
            style={{ width: 300, height: 200 }}
            type={Camera.Constants.Type.front}
          />
          <Button
            mode="contained"
            onPress={initiateVideoChat}
            style={{ marginTop: 20 }}
          >
            Start Video Chat
          </Button>
          {roomId ? <Text>Room ID: {roomId}</Text> : null}
        </View>
      )}
    </View>
  );
};

export default VideoChat;
