import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Todo, TodoUpdateInput } from '@/types';

// Helper function to validate todo ID
function validateTodoId(id: string | string[]): number | null {
  const todoId = Number(id);
  return isNaN(todoId) ? null : todoId;
}

// GET /api/todos/[id] - Get a single todo by ID
async function getTodo(
  req: NextApiRequest,
  res: NextApiResponse<Todo | { error: string }>
) {
  const todoId = validateTodoId(req.query.id);
  if (todoId === null) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId }
    });
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    return res.status(200).json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return res.status(500).json({ error: 'Failed to fetch todo' });
  }
}

// PUT /api/todos/[id] - Update a todo
async function updateTodo(
  req: NextApiRequest,
  res: NextApiResponse<Todo | { error: string }>
) {
  const todoId = validateTodoId(req.query.id);
  if (todoId === null) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }

  try {
    const data = req.body as TodoUpdateInput;
    
    if (data.title !== undefined && data.title.trim() === '') {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data
    });
    
    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return res.status(500).json({ error: 'Failed to update todo' });
  }
}

// DELETE /api/todos/[id] - Delete a todo
async function deleteTodo(
  req: NextApiRequest,
  res: NextApiResponse<{ error: string }>
) {
  const todoId = validateTodoId(req.query.id);
  if (todoId === null) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }

  try {
    await prisma.todo.delete({
      where: { id: todoId }
    });
    
    return res.status(200).json({ error: '' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return res.status(500).json({ error: 'Failed to delete todo' });
  }
}

// Main handler that routes to the appropriate handler based on HTTP method
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo | { error: string }>
) {
  switch (req.method) {
    case 'GET':
      return getTodo(req, res);
    case 'PUT':
      return updateTodo(req, res);
    case 'DELETE':
      return deleteTodo(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
