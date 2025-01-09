# CRUD_React

import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    const newTodo = [...todos, todo];
    setTodos(newTodo);
  };
  const deleteTodo = (id) => {
    const newTodo = todos.filter((e) => {
      return e.id !== id;
    });
    setTodos(newTodo);
  };

  const editTodo = (id, todo) => {
    const newTodo = todos.map((e) => {
      return e.id === id ? { ...e, content: todo } : e;
    });
    setTodos(newTodo);
  };

  const toggleTodo = (id) => {
    const newTodo = todos.map((e) => {
      return e.id === id ? { ...e, complete: !e.complete } : e;
    });
    setTodos(newTodo);
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, addTodo, deleteTodo, editTodo, toggleTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};


import { useEffect, useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoList() {
  const { todos, deleteTodo, editTodo, toggleTodo, setTodos } = useTodo();
  const [editMode, setEditMode] = useState(null); // Tracks the id of the todo being edited
  const [newContent, setNewContent] = useState(""); // Tracks the new content during editing

  const handleEdit = (id, currentContent) => {
    setEditMode(id);
    setNewContent(currentContent); // Set the current content in the input field
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("key1"));
    if (data && data.length) setTodos(data);
  }, []);

  useEffect(() => {
    localStorage.setItem("key1", JSON.stringify(todos));
  }, [todos]);

  const saveEdit = (id) => {
    editTodo(id, newContent); // Update the todo
    setEditMode(null); // Exit edit mode
    setNewContent(""); // Clear input field
  };

  return (
    <div className="flex flex-wrap gap-y-3">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo.id}
            className={`w-full flex justify-between items-center bg-white/10 rounded-lg px-3 py-2 text-white ${
              todo.complete ? "bg-green-500" : "bg-white-500"
            } `}
          >
            {editMode === todo.id ? (
              <input
                type="text"
                className="flex-grow px-2 py-1 rounded bg-white text-black"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            ) : (
              <div>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.content}</span>
              </div>
            )}
            <div>
              {editMode === todo.id ? (
                <button
                  className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                  onClick={() => saveEdit(todo.id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
                  onClick={() => handleEdit(todo.id, todo.content)}
                >
                  Edit
                </button>
              )}
              <button
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center w-full">No todos yet. Add one!</p>
      )}
    </div>
  );
}

export default TodoList;

