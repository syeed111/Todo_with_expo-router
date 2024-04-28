import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React, { useState } from "react";

interface AddTodoProps {
  add: (text: string) => void;
  textInput: string;
}

const AddTodo: React.FC<AddTodoProps> = ({ add, textInput }) => {
  const [text, setText] = useState<string>(textInput);
  const changeHandler = (val: string) => {
    setText(val);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        multiline
        placeholder="new todo..."
        onChangeText={changeHandler}
        value={text}
      />
      <Button title="Add todo" color="coral" onPress={() => add(text)} />
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
