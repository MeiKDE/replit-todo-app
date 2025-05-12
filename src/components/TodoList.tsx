import React from 'react';
import TodoItem from './TodoItem';
import { Todo, TodoUpdateInput } from '@/types';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onUpdate: (id: number, data: TodoUpdateInput) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({ todos, isLoading, onUpdate, onDelete }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">No todos yet. Create your first todo!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">My Todo List</h2>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
