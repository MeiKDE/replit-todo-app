import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TodoUpdateInput } from '@/types';

// Helper function to validate todo ID
function validateTodoId(id: string | undefined): number | null {
  if (!id) return null;
  const todoId = Number(id);
  return isNaN(todoId) ? null : todoId;
}

// GET /api/todos/[id] - Get a single todo by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todoId = validateTodoId(params.id);
  if (todoId === null) {
    return NextResponse.json(
      { error: 'Invalid todo ID' },
      { status: 400 }
    );
  }

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: todoId }
    });
    
    if (!todo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(todo);
  } catch (error) {
    console.error('Error fetching todo:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

// PUT /api/todos/[id] - Update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todoId = validateTodoId(params.id);
  if (todoId === null) {
    return NextResponse.json(
      { error: 'Invalid todo ID' },
      { status: 400 }
    );
  }

  try {
    const data = await request.json() as TodoUpdateInput;
    
    if (data.title !== undefined && data.title.trim() === '') {
      return NextResponse.json(
        { error: 'Title cannot be empty' },
        { status: 400 }
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data
    });
    
    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    );
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todoId = validateTodoId(params.id);
  if (todoId === null) {
    return NextResponse.json(
      { error: 'Invalid todo ID' },
      { status: 400 }
    );
  }

  try {
    await prisma.todo.delete({
      where: { id: todoId }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    );
  }
}