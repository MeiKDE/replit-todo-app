import { Todo, TodoUpdateInput } from "@/types";

interface EditFormProps {
  onUpdate: (id: number, data: TodoUpdateInput) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  isLoading: boolean;
  error: string;
  todo: Todo;
}

const EditForm = ({
  onUpdate,
  onDelete,
  setTitle,
  setDescription,
  setError,
  setIsLoading,
  setIsEditing,
  title,
  description,
  isLoading,
  error,
  todo,
}: EditFormProps) => {
  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      await onUpdate(todo.id, {
        title: title,
        description: description || undefined,
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Todo title"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
            setTitle(todo.title);
            setDescription(todo.description || "");
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
