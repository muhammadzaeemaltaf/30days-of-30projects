"use client";

import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}
const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);

    let savedTask = localStorage.getItem("tasks");

    if (savedTask) {
      setTasks(JSON.parse(savedTask));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, isMounted]);

  if (!isMounted) {
    return null;
  }
  const addTask = (): void => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    }
    setNewTask("");
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditingTask = (id: number, taskName: string) => {
    setEditingTaskId(id);
    setEditedTaskText(taskName);
  };

  const updateTask = () => {
    if (editedTaskText.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: editedTaskText } : task
        )
      );
      setEditingTaskId(null);
      setEditedTaskText("");
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="w-full max-w-md bg-white text-black p-8 rounded-2xl">
      <div className="flex flex-col justify-center gap-3">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <div className="grid grid-cols-[80%_auto] gap-2">
          <Input
            type="text"
            className="rounded-2xl"
            placeholder="Add your task"
            value={newTask}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTask(e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <Button className="rounded-2xl" onClick={addTask}>
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-2xl bg-slate-100"
          >
            <div className="flex w-full items-center p-3">
              <Checkbox
                checked={task.completed}
                className="mr-2"
                onCheckedChange={() => toggleTaskCompletion(task.id)}
              />
              {editingTaskId === task.id ? (
                <Input
                  type="text"
                  value={editedTaskText}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEditedTaskText(e.target.value)
                  }
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      updateTask();
                    }
                  }}
                  className="px-3 py-2 rounded-2xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                />
              ) : (
                <span
                  className={`flex-1 text-gray-800 ${
                    task.completed
                      ? "line-through text-gray-500 font-semibold"
                      : ""
                  }`}
                >
                  {task.text}
                </span>
              )}
            </div>
            <div className="flex items-center">
              {editingTaskId === task.id ? (
                <Button
                  onClick={updateTask}
                  className="bg-black hover:bg-slate-800 text-white font-medium py-1 px-2 rounded-xl mr-2"
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => startEditingTask(task.id, task.text)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-xl mr-2"
                >
                  Edit
                </Button>
              )}
              <Button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-xl"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
