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
