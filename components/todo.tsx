"use client";

import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Props = {};

export default function ToDo({}: Props) {
  const [autoAnimate] = useAutoAnimate();
  const [todos, setTodos] = useState([
    { id: 1, text: "Task One" },
    { id: 2, text: "Task Two" },
    { id: 3, text: "Task Three" },
  ]);

  const [inputText, setInputText] = useState("");
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  function addTodo() {
    if (inputText.trim() !== "") {
      const isExistingToDo = todos.some((todo) => todo.text === inputText);
      if (isExistingToDo) {
        alert("ToDo already exists");
        setInputText("");
        return;
      }
      const newTodo = {
        id: todos.length + 1,
        text: inputText,
      };

      setTodos([...todos, newTodo]);
      setInputText("");
    }
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addTodo();
    }
  }

  function deleteTodo(id: number) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function editTodo(id: number) {
    setEditMode(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditedText(todoToEdit ? todoToEdit.text : "");
  }

  function saveTodo() {
    const updatedTodos = todos.map((todo) =>
      todo.id === editMode ? { ...todo, text: editedText } : todo
    );
    setTodos(updatedTodos);
    setEditMode(null);
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb4">ToDo App</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Add a task..."
          className="border-gray-300 border rounded-l px-4 py-2"
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          value={inputText}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r addNew"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul ref={autoAnimate}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border-b py-2"
          >
            {editMode === todo.id ? (
              <>
                <input
                  type="text"
                  className="border-gray-300 border rounded-l px-4 py-2"
                  onChange={(e) => setEditedText(e.target.value)}
                  value={editedText}
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-r"
                  onClick={saveTodo}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div>
                  <button
                    className="text-yellow-500"
                    onClick={() => editTodo(todo.id)}
                  >
                    Edit
                  </button>
                  &nbsp; &nbsp;
                  <button
                    className="text-red-500"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
