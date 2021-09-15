import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import editPen from "../assets/icons/editPen/PenEdit.png";
import { Task } from "./TasksList";

interface TaskItemProps {
  task: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({
    id,
    taskNewTitle,
  }: {
    id: number;
    taskNewTitle: string;
  }) => void;
}

export function TaskItem({
  task,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTaskNewTitleValue(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({ id: task.id, taskNewTitle: taskNewTitleValue });
    setIsEditing(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            //TODO - use style prop
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={taskNewTitleValue}
            editable={isEditing}
            onChangeText={setTaskNewTitleValue}
            onSubmitEditing={handleSubmitEditing}
            //TODO - use style prop
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity
            testID={`trash-${index}`}
            onPress={handleCancelEditing}
            style={{ paddingHorizontal: 12 }}
            //TODO - use onPress (remove task) prop
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 12 }}
            onPress={handleStartEditing}
            //TODO - use onPress (remove task) prop
          >
            <Image source={editPen} />
          </TouchableOpacity>
        )}
        <View style={styles.separator} />
        <TouchableOpacity
          testID={`trash-${index}`}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
          style={{ opacity: isEditing ? 0.2 : 1, paddingHorizontal: 24 }}
          //TODO - use onPress (remove task) prop
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "#b2b2b2",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
