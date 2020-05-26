import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import io from "socket.io-client";
let socket;
export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(["message 1", "message 2"]);
  const user = "Susan";
  useEffect(() => {
    socket = io("http://10.3.13.6:3000");
    socket.on("chat message", (msg) => {
      setMessages((messages) => [...messages, user + ": " + msg]);
    });
    socket.emit("joinRoom", user);
  }, []);

  const submitChatMessage = () => {
    socket.emit("chat message", message);
    setMessage("");
  };

  const chatMessages = messages.map((chatMessage) => (
    <Text key={chatMessage + Date.now()}>{chatMessage}</Text>
  ));

  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, borderWidth: 2 }}
        value={message}
        onSubmitEditing={() => submitChatMessage()}
        autoCorrect={false}
        onChangeText={(chatMessage) => setMessage(chatMessage)}
      ></TextInput>
      <Text>{`Chat about ${user}'s groceries`}</Text>
      {chatMessages}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
});
