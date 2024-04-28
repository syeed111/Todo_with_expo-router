import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "../../components/header";
import TodoItem from "../../components/todoItem";
import AddTodo from "../../components/addTodo";

interface Todo {
  item: string;
  id: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const pressHandler = (key: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((item) => item.id != key);
    });
  };

  const updateHandler = (key: string, value: string) => {
    setTextInput(value);
    setTodos((prevTodos) => {
      return prevTodos.filter((item) => item.id != key);
    });
  };

  const addTodo = (text: string) => {
    if (text.length > 2) {
      setTodos((prevTodos) => {
        return [{ item: text, id: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("Empty todo", "There must be some text", [
        { text: "Okey", onPress: () => console.log("Alert dismissed") },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Header />

        <View style={styles.content}>
          <AddTodo add={addTodo} textInput={textInput} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TodoItem
                  item={item}
                  pressHandler={pressHandler}
                  updateHandler={updateHandler}
                />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
