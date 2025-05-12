'use client';

import { useState, useEffect } from 'react';
import { Todo, TodoInput, TodoUpdateInput } from '@/types';
import TodoList from '@/components/TodoList';
import TodoForm from '@/components/TodoForm';

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setError('Failed to load todos. Please try refreshing the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (todoInput: TodoInput) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoInput),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create todo');
      }

      const newTodo = await response.json();
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  };

  const handleUpdateTodo = async (id: number, data: TodoUpdateInput) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete todo');
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
          <button
            onClick={fetchTodos}
            className="underline mt-2 text-red-800"
          >
            Try Again
          </button>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <TodoForm onSubmit={handleAddTodo} />
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
}