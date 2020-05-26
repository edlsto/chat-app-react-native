import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import io from "socket.io-client";
let socket;
export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [type, setType] = useState("");
  const [team, setTeam] = useState("");
  const [teamForm, setTeamForm] = useState("");

  useEffect(() => {
    socket = io("http://10.3.13.6:3000");
    socket.on("chat message", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });
    socket.emit("joinRoom", team);
  }, [team]);

  const submitChatMessage = () => {
    socket.emit("chat message", user + ": " + message);
    setMessage("");
  };

  const chatMessages = messages.map((chatMessage) => (
    <Text key={chatMessage + Date.now()}>{chatMessage}</Text>
  ));

  const handleSubmitName = () => {
    setUser(name);
    setTeam(name);
  };

  const handleSubmitTeamName = () => {
    setTeam(teamForm);
  };

  const handleVolName = () => {
    setUser(name);
  };

  const handlePress = (type) => {
    setType(type);
  };

  return (
    <View style={styles.container}>
      {!type && (
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("senior")}
            className="senior"
          >
            <Text>Senior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePress("volunteer")}
            className="volunteer"
          >
            <Text>Volunteer</Text>
          </TouchableOpacity>
        </View>
      )}
      {type === "senior" && (
        <View>
          <Text>Hello, {type}</Text>
          {!user && (
            <View>
              <View>
                <Text>What is your name?</Text>
              </View>

              <TextInput
                style={{ height: 40, borderWidth: 2, marginBottom: 50 }}
                onSubmitEditing={handleSubmitName}
                onChangeText={(name) => setName(name)}
                value={name}
              ></TextInput>
            </View>
          )}
          {!!user && <Text>Hi, {user}</Text>}
          <TextInput
            style={{ height: 40, borderWidth: 2 }}
            value={message}
            onSubmitEditing={() => submitChatMessage()}
            autoCorrect={false}
            onChangeText={(chatMessage) => setMessage(chatMessage)}
          ></TextInput>
          {!!user && <Text>{`Chat about ${user}'s groceries`}</Text>}
          {chatMessages}
        </View>
      )}
      {type === "volunteer" && (
        <View>
          <Text>Hello, {type}</Text>
          {!user && (
            <View>
              <View>
                <Text>What is your name?</Text>
              </View>

              <TextInput
                style={{ height: 40, borderWidth: 2, marginBottom: 50 }}
                onSubmitEditing={handleVolName}
                onChangeText={(name) => setName(name)}
                value={name}
              ></TextInput>
            </View>
          )}
          {!team && (
            <View>
              <View>
                <Text>Who is your senior?</Text>
              </View>
              <TextInput
                style={{ height: 40, borderWidth: 2, marginBottom: 50 }}
                onSubmitEditing={handleSubmitTeamName}
                onChangeText={(name) => setTeamForm(name)}
                value={teamForm}
              ></TextInput>
            </View>
          )}
          {!!team && <Text>Hi, {user}</Text>}
          <TextInput
            style={{ height: 40, borderWidth: 2 }}
            value={message}
            onSubmitEditing={() => submitChatMessage()}
            autoCorrect={false}
            onChangeText={(chatMessage) => setMessage(chatMessage)}
          ></TextInput>
          {!!user && <Text>{`Chat about ${team}'s groceries`}</Text>}
          {chatMessages}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
  button: {
    backgroundColor: "lightgray",
    marginBottom: 30,
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
