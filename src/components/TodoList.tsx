// Import React to use JSX and define components
import React from "react";

// Import the TodoItem component used to display each individual todo
import { TodoItem } from "./TodoItem";

// Import the type definitions for a full Todo and an update payload
import { Todo, TodoUpdateInput } from "@/types";

// Define the props that the TodoList component will accept
interface TodoListProps {
  todos: Todo[]; // An array of todo items to display
  isLoading: boolean; // Whether the list is currently loading
  onUpdate: (id: number, data: TodoUpdateInput) => Promise<void>; // Function to handle updating a todo
  onDelete: (id: number) => Promise<void>; // Function to handle deleting a todo
}

// Define the TodoList functional component with destructured props
export const TodoList = ({
  todos,
  isLoading,
  onUpdate,
  onDelete,
}: TodoListProps) => {
  // If the list is loading, show a loading message instead of the list
  if (isLoading) {
    return (
      <div>
        <div>The page is loading</div>
      </div>
    );
  }

  // If there are no todos in the list, show a message prompting the user to add one
  if (todos.length === 0) {
    return (
      <div>
        <p>No todos yet. Create your first todo!</p>
      </div>
    );
  }

  // If there are todos, render the list
  return (
    <div className="space-y-4">
      {/* 
        Tailwind class explanation:
        - space-y-4: Adds vertical spacing (1rem = 16px) between each direct child of this div.
      */}

      <h2 className="text-xl font-bold text-gray-800">My Todo List</h2>
      {/* 
        Tailwind class explanation:
        - text-xl: Sets font size to extra-large.
        - font-bold: Makes the text bold.
        - text-gray-800: Sets text color to a dark gray.
      */}

      <div>
        {/* 
          Render each todo item using the TodoItem component.
          React requires a unique key for each item in a list to efficiently update the DOM.
        */}
        {todos.map((todo) => (
          <TodoItem
            key={todo.id} // Unique key required by React when rendering lists
            todo={todo} // Pass the individual todo object to the child component
            onUpdate={onUpdate} // Pass the update handler to the child
            onDelete={onDelete} // Pass the delete handler to the child
          />
        ))}
      </div>
    </div>
  );
};
