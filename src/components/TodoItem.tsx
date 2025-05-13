// Import React and the useState hook to manage local component state
import React, { useState } from "react";

// Import types for full Todo and update input structure
import { Todo, TodoUpdateInput } from "@/types";

// Define the props expected by the TodoItem component
interface TodoItemProps {
  todo: Todo; // A single todo item to display
  onUpdate: (id: number, data: TodoUpdateInput) => Promise<void>; // Update handler
  onDelete: (id: number) => Promise<void>; // Delete handler
}

// Define the TodoItem component
export const TodoItem = ({ todo, onUpdate, onDelete }: TodoItemProps) => {
  // Whether the item is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  // Editable title, initialized with the todo title
  const [title, setTitle] = useState(todo.title);
  // Editable description, fallback to empty string if undefined
  const [description, setDescription] = useState(todo.description || "");
  // Whether the item is currently processing an action
  const [isLoading, setIsLoading] = useState(false);
  // Error message display state
  const [error, setError] = useState("");

  // Handler to toggle the completed status of the todo
  const handleToggleComplete = async () => {
    setIsLoading(true);
    setError("");
    try {
      await onUpdate(todo.id, { completed: !todo.completed });
    } catch (err) {
      console.error("Error toggling complete status", error);
      setError("Failed to update todo");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler to save edits made to the title/description
  const handleSaveEdit = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await onUpdate(todo.id, {
        title,
        description: description || undefined,
      });
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      console.error("Error updating todo:", error);
      setError("Failed to update todo");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler to delete the todo after user confirms
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setIsLoading(true);
      setError("");
      try {
        await onDelete(todo.id);
      } catch (error) {
        console.error("Error deleting todo:", error);
        setError("Failed to delete todo");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Render the component
  return (
    <div
      className={`bg-white p-4 rounded shadow-md mb-4 transition-all ${
        isLoading ? "opacity-60" : ""
      }`}
    >
      {/* 
        Tailwind explanation:
        - bg-white: White background
        - p-4: Padding on all sides
        - rounded: Rounded corners
        - shadow-md: Medium shadow for card effect
        - mb-4: Bottom margin for spacing between cards
        - transition-all: Animate transitions
        - opacity-60 (conditional): Dim while loading
      */}

      {/* Error message box */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-3 rounded">
          {/* Tailwind:
            - bg-red-100: Light red background
            - border-red-400: Medium red border
            - text-red-700: Dark red text
            - px-4 py-3: Padding X and Y
            - mb-3: Bottom margin
            - rounded: Rounded corners
          */}
          {error}
        </div>
      )}

      {/* Edit mode UI */}
      {isEditing ? (
        <div className="space-y-3">
          {/* space-y-3: Vertical space between child elements */}
          <input
            type="text"
            value={title}
            placeholder="Todo title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            // Tailwind: full width, padding, light border, rounded, blue ring on focus
          />

          <textarea
            value={description}
            placeholder="Description (optional)"
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              disabled={isLoading}
              className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              // Tailwind: padding, indigo background, white text, rounded, hover/focus styles
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(todo.title);
                setDescription(todo.description || "");
                setError("");
              }}
              disabled={isLoading}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // View mode UI
        <div>
          <div className="flex items-start justify-between">
            {/* flex: Row layout
                items-start: Align items to top
                justify-between: Space between checkbox+text and buttons */}
            <div className="flex items-start space-x-3">
              {/* Checkbox and text group */}
              <input
                type="checkbox"
                checked={todo.completed}
                disabled={isLoading}
                onChange={handleToggleComplete}
                className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                // Tailwind: small checkbox, indigo color, blue ring on focus
              />
              <div>
                <h3
                  className={`text-lg font-medium ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  }`}
                  // Tailwind:
                  // - text-lg: Large title
                  // - font-medium: Medium bold
                  // - Conditional: Strike-through + gray if completed
                >
                  {todo.title}
                </h3>
                {todo.description && (
                  <p
                    className={`text-sm mt-1 ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {todo.description}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(todo.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Edit + Delete buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
