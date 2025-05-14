import { Todo, TodoUpdateInput } from "@/types";
import { useState, useEffect } from "react";

interface EditFormProps {
  onUpdate: (id: number, data: TodoUpdateInput) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  error: string;
  todo: Todo;
}

const EditForm = ({
  onUpdate,
  onDelete,
  setError,
  setIsLoading,
  setIsEditing,
  isLoading,
  error,
  todo,
}: EditFormProps) => {
  const [localTitle, setLocalTitle] = useState(todo.title);
  const [localDescription, setLocalDescription] = useState(
    todo.description || ""
  );

  useEffect(() => {
    setLocalTitle(todo.title);
    setLocalDescription(todo.description || "");
  }, [todo]);

  const handleSave = async () => {
    if (!localTitle.trim()) {
      setError("Title is required");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      await onUpdate(todo.id, {
        title: localTitle,
        description: localDescription || undefined,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update todo";
      console.error("Failed to save todo", err);

      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Todo title"
      />

      <textarea
        value={localDescription}
        onChange={(e) => setLocalDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        rows={3}
        placeholder="Description (optional)"
      />

      <div>
        <button
          disabled={isLoading}
          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          disabled={isLoading}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={() => {
            setIsEditing(false);
            setError("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditForm;
