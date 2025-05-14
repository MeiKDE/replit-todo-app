import { useState } from "react";
import { Todo, TodoUpdateInput } from "@/types";
import EditForm from "@/components/EditForm";

interface TodoItemProps {
  todo: Todo;
  handleUpdateTodo: (
    id: number,
    todoUpdateInput: TodoUpdateInput
  ) => Promise<void>;
  handleDeleteTodo: (id: number) => Promise<void>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  title: string;
  description: string;
  error: string;
}

const TodoItem = ({
  todo,
  handleUpdateTodo,
  handleDeleteTodo,
  setTitle,
  setDescription,
  setError,
  setTodos,
  setIsLoading,
  isLoading,
  title,
  description,
  error,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mb-4 p-4 border rounded-lg">
      {isEditing ? (
        <EditForm
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
          setTitle={setTitle}
          setDescription={setDescription}
          setError={setError}
          setIsLoading={setIsLoading}
          setIsEditing={setIsEditing}
          title={title}
          description={description}
          isLoading={isLoading}
          error={error}
          todo={todo}
        />
      ) : (
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) =>
              handleUpdateTodo(todo.id, { completed: e.target.checked })
            }
            disabled={isLoading}
            className="mr-2"
          />

          <ul>
            <li
              className={`text-lg font-medium ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {todo.title}
            </li>
            {todo.description && (
              <li
                className={`text-lg font-medium ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {todo.description}
              </li>
            )}
            <li className="text-xs text-gray-400 mt-1">
              {new Date(todo.createdAt).toLocaleString()}
            </li>
          </ul>
          <div className="mt-2 space-x-2">
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setTitle(todo.title);
                setDescription(todo.description || "");
                setIsEditing(true);
              }}
              disabled={isLoading}
            >
              Edit
            </button>
            <button
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => handleDeleteTodo(todo.id)}
              disabled={isLoading}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
