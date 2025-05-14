import { Todo, TodoUpdateInput } from "@/types";
import TodoItem from "./TodoItem";
interface TodoListProps {
  todos: Todo[];
  handleUpdateTodo: (id: number, data: TodoUpdateInput) => Promise<void>;
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

const TodoList = ({
  todos,
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
}: TodoListProps) => {
  return (
    <div id="show_todo_list" className="w-1/2 p-4 border rounded-lg shadow-sm">
      My Todo List:
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleUpdateTodo={handleUpdateTodo}
          handleDeleteTodo={handleDeleteTodo}
          setTitle={setTitle}
          title={title}
          setDescription={setDescription}
          description={description}
          setError={setError}
          setTodos={setTodos}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          error={error}
        />
      ))}
    </div>
  );
};

export default TodoList;
