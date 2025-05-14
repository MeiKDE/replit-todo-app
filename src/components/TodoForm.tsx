import { TodoInput } from "@/types";

interface TodoFormProps {
  handleCreateTodo: (todoInput: TodoInput) => Promise<void>;
  setTitle: (title: string) => void;
  title: string;
  setDescription: (description: string) => void;
  description: string;
}

const TodoForm = ({
  handleCreateTodo,
  setTitle,
  title,
  setDescription,
  description,
}: TodoFormProps) => {
  return (
    <form
      id="add_new_todo"
      onSubmit={(e) => {
        e.preventDefault(); //Stop the page from refreshing
        handleCreateTodo({ title, description });
      }}
      className="w-1/2 p-4 border rounded-lg shadow-sm"
    >
      Add New Todo:
      <div>
        <label id="title">Title *</label>
        <input
          type="text"
          placeholder="Enter todo title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div>
        <label id="description"> Description </label>
        <textarea
          placeholder="Enter todo description"
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div>
        <button
          id="submit_button"
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
