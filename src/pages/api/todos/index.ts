import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Todo, TodoInput } from '@/types';

// GET /api/todos - Get all todos
async function getTodos(
  req: NextApiRequest,
  res: NextApiResponse<Todo[] | { error: string }>
) {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return res.status(500).json({ error: 'Failed to fetch todos' });
  }
}

// POST /api/todos - Create a new todo
async function createTodo(
  req: NextApiRequest,
  res: NextApiResponse<Todo | { error: string }>
) {
  try {
    const data = req.body as TodoInput;
    
    if (!data.title || data.title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = await prisma.todo.create({
      data: {
        title: data.title,
        description: data.description || null,
      }
    });
    
    return res.status(201).json(todo);
  } catch (error) {
    console.error('Error creating todo:', error);
    return res.status(500).json({ error: 'Failed to create todo' });
  }
}

// Main handler that routes to the appropriate handler based on HTTP method
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[] | Todo | { error: string }>
) {
  switch (req.method) {
    case 'GET':
      return getTodos(req, res);
    case 'POST':
      return createTodo(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
