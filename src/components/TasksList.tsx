import React from "react";
import { FlatList, StyleSheet } from "react-native";

import { ItemWrapper } from "./ItemWrapper";
import { TaskItem } from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
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

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
              editTask={editTask}
              task={item}
              index={index}
            />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
