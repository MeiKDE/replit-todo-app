// Import React and the useState hook for managing component state
import React, { useState } from "react";

// Import the TodoInput type definition
import { TodoInput } from "@/types";

// Define the props for the TodoForm component
interface TodoFormProps {
  // onSubmit is a function that takes a TodoInput and returns a Promise
  onSubmit: (todo: TodoInput) => Promise<void>;
}

// Define the TodoForm component using the props defined above
export const TodoForm = ({ onSubmit }: TodoFormProps) => {
  // Track the current title input
  const [title, setTitle] = useState("");
  // Track the current description input
  const [description, setDescription] = useState("");
  // Track error messages (e.g., validation or API failure)
  const [error, setError] = useState("");
  // Track if the form is currently being submitted
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Basic validation: title is required
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError(""); // Clear previous errors
    setIsSubmitting(true); // Disable button and show loading state

    try {
      // Call the parent onSubmit with form data
      await onSubmit({ title, description });

      // Clear form fields on success
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Error submitting todo:", err);
      setError("Failed to create todo");
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  // JSX for the form
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md"
    >
      {/* Tailwind:
        - space-y-4: vertical spacing between children
        - bg-white: white background
        - p-6: padding
        - rounded-lg: large rounded corners
        - shadow-md: medium shadow
      */}

      <h2 className="text-xl font-bold text-gray-800">Add New Todo</h2>

      {/* Error message */}
      {error && (
        <div className="text-red-600 text-sm bg-red-100 border border-red-300 rounded px-3 py-2">
          {error}
        </div>
      )}

      {/* Title input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        />
        {/* Tailwind:
          - mt-1: margin top
          - block w-full: full width input
          - rounded-md: medium rounded corners
          - border-gray-300: light border
          - shadow-sm: small shadow
          - focus:ring / focus:border: indigo focus highlight
          - p-2: padding
        */}
      </div>

      {/* Description input */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          isSubmitting ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {/* Button text changes while submitting */}
        {isSubmitting ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};
