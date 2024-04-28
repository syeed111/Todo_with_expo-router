import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React, { useReducer } from "react";

interface AddTodoProps {
  add: (text: string) => void;
  textInput: string;
}

interface State {
  text: string;
}

type Action = { type: "UPDATE_TEXT"; payload: string } | { type: "RESET_TEXT" };

const initialState: State = {
  text: "",
};

// Define the reducer function with types
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_TEXT":
      return { ...state, text: action.payload };
    case "RESET_TEXT":
      return { ...state, text: "" };
    default:
      return state;
  }
};

const AddTodo: React.FC<AddTodoProps> = ({ add, textInput }) => {
  // Use useReducer instead of useState with types
  const [state, dispatch] = useReducer(reducer, { text: textInput });

  const changeHandler = (val: string) => {
    dispatch({ type: "UPDATE_TEXT", payload: val });
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        multiline
        placeholder="new todo..."
        onChangeText={changeHandler}
        value={state.text}
      />
      <Button
        title="Add todo"
        color="coral"
        onPress={() => {
          add(state.text);
          dispatch({ type: "RESET_TEXT" }); // Reset text after adding
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default AddTodo;
