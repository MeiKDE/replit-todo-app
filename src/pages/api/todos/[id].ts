import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Todo, TodoUpdateInput } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo | { error: string }>
) {
  const { id } = req.query;
  const todoId = Number(id);

  if (isNaN(todoId)) {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }

  switch (req.method) {
    case 'GET':
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

    case 'PUT':
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

    case 'DELETE':
      try {
        await prisma.todo.delete({
          where: { id: todoId }
        });
        
        return res.status(200).json({ error: '' });
      } catch (error) {
        console.error('Error deleting todo:', error);
        return res.status(500).json({ error: 'Failed to delete todo' });
      }

    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}
