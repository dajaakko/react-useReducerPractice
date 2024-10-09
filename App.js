import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useReducer } from "react";
import { TextInput } from "react-native";
import { useState } from "react";
import { Button } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

const toDoList = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, {text: action.payload }];
    case "DELETE": 
      return state.filter((item) => item.text !== action.payload);

  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, toDoList);
  const [text, setText] = useState("");
  console.log(state);
  return (
    <View style={styles.container}>
      <Text>Todo list</Text>

      <View style={styles.textinput}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a task"
        />
        <Button
          title="Save"
          onPress={() => {
            dispatch({ type: "ADD", payload: text });
            setText("");
          }}
        />
      </View>
      <View style={styles.flatlist}>
        <FlatList
          data={state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => dispatch({ type: "DELETE", payload: item.text })}>
            <Text style={styles.item}>{item.text}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    marginTop: 10,
    height: 300,
    width: "100%",
  },
  textinput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  item: {
    margin: 20,
  },
});
