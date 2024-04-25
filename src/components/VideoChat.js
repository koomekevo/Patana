import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "react-native-paper";
import axios from "axios";

const VideoChat = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      // Fetch a new room ID from the backend
      const response = await axios.post(
        "http://your-backend-url/api/chat/initiate"
      );
      setRoomId(response.data.roomId);
    } catch (error) {
      console.error("Error initiating video chat:", error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Requesting camera permission...</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={Camera.Constants.Type.front} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={initiateVideoChat}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Start Video Chat</Text>
              )}
            </TouchableOpacity>
            {roomId ? (
              <Text style={styles.roomIdText}>Room ID: {roomId}</Text>
            ) : null}
          </View>
        </View>
      )}
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
  cameraContainer: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  roomIdText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VideoChat;
