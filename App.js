import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import io from "socket.io-client";
let socket;
export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(["message 1", "message 2"]);
  useEffect(() => {
    console.log("hi");
    socket = io("http://10.3.13.6:3000", {
      jsonp: false,
      agent: "-",
      pfx: "-",
      cert: "-",
      ca: "-",
      ciphers: "-",
      rejectUnauthorized: "-",
      perMessageDeflate: "-",
    });
    socket.on("chat message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
  }, []);

  const submitChatMessage = () => {
    socket.emit("chat message", message);
    setMessage("");
  };

  console.log(messages);
  console.log(message);
  const chatMessages = messages.map((chatMessage) => (
    <Text key={chatMessage}>{chatMessage}</Text>
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
