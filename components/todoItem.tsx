import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

interface TodoItemProps {
  item: {
    item: string;
    id: string;
  };
  pressHandler: (id: string) => void;
  updateHandler: (id: string, value: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  item,
  pressHandler,
  updateHandler,
}) => {
  return (
    <TouchableOpacity onPress={() => updateHandler(item.id, item.item)}>
      <View style={styles.item}>
        <AntDesign
          name="delete"
          size={24}
          color="black"
          onPress={() => pressHandler(item.id)}
        />
        <Text style={{ paddingLeft: 10 }}>{item.item}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "solid",
    fontWeight: "bold",
    fontSize: 17,
    borderRadius: 5,
  },
});

export default TodoItem;
