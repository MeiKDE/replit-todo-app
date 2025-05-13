// Marks this component as a client-side component (required for hooks like useState/useEffect in Next.js App Router)
"use client";

// React hooks for state and side effects
import { useState, useEffect } from "react";

// Type definitions for todos and input types
import { Todo, TodoInput, TodoUpdateInput } from "@/types";

// UI components for the form and the todo list
import { TodoList } from "@/components/TodoList";
import { TodoForm } from "@/components/TodoForm";

// Define the main HomePage component
const HomePage = () => {
  // State for the list of todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // State to indicate if data is still loading
  const [isLoading, setIsLoading] = useState(true);

  // State to hold any error message
  const [error, setError] = useState("");

  // Fetch todos once when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch todos from the API
  const fetchTodos = async () => {
    setIsLoading(true); // Set loading state to true
    setError(""); // Clear previous error

    try {
      const response = await fetch("/api/todos"); // Send GET request to API

      if (!response.ok) {
        throw new Error("Failed to fetch todos"); // Handle non-2xx response
      }

      const data = await response.json(); // Parse JSON response
      setTodos(data); // Update todo list in state
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError("Failed to load todos. Please try refreshing the page.");
    } finally {
      setIsLoading(false); // Stop loading regardless of success/failure
    }
  };

  // Handle creation of a new todo
  const handleAddTodo = async (todoInput: TodoInput) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todoInput), // Send todo input as JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create todo");
      }

      const newTodo = await response.json(); // Get created todo
      setTodos((prevTodos) => [newTodo, ...prevTodos]); // Prepend to list
    } catch (err) {
      console.error("Error adding todo:", err);
      throw err; // Re-throw so form can handle/display error
    }
  };

  // Handle updating an existing todo
  const handleUpdateTodo = async (id: number, data: TodoUpdateInput) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update todo");
      }

      const updatedTodo = await response.json();
      // Replace updated todo in state
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      console.error("Error updating todo:", err);
      throw err;
    }
  };

  // Handle deleting a todo
  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete todo");
      }

      // Remove deleted todo from state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
      throw err;
    }
  };

  // UI rendering
  return (
    <>
      {/* Error message display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
          <button onClick={fetchTodos} className="underline mt-2 text-red-800">
            Try Again
          </button>
        </div>
      )}

      {/* Grid layout: Form on the left, Todo list on the right (on medium+ screens) */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <TodoForm onSubmit={handleAddTodo} /> {/* Add new todo */}
        </div>

        <div>
          <TodoList
            todos={todos}
            isLoading={isLoading}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
