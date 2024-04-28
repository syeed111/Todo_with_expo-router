import React, { useReducer } from "react";
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

interface State {
  todos: Todo[];
  textInput: string;
}

type Action =
  | { type: "ADD_TODO"; text: string }
  | { type: "REMOVE_TODO"; key: string }
  | { type: "UPDATE_TEXT_INPUT"; value: string };

const initialState = {
  todos: [] as Todo[],
  textInput: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          { item: action.text, id: Math.random().toString() },
          ...state.todos,
        ],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.key),
      };
    case "UPDATE_TEXT_INPUT":
      return {
        ...state,
        textInput: action.value,
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const pressHandler = (key: string) => {
    dispatch({ type: "REMOVE_TODO", key });
  };

  const updateHandler = (key: string, value: string) => {
    dispatch({ type: "UPDATE_TEXT_INPUT", value });
    dispatch({ type: "REMOVE_TODO", key });
  };

  const addTodo = (text: string) => {
    if (text.length > 2) {
      dispatch({ type: "ADD_TODO", text });
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
          <AddTodo add={addTodo} textInput={state.textInput} />
          <View style={styles.list}>
            <FlatList
              data={state.todos}
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
