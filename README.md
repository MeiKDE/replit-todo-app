# Next.js Todo App

A full-stack Todo application built with Next.js, TypeScript, Tailwind CSS, and Prisma ORM for PostgreSQL database integration. This project implements a clean API structure using the Next.js App Router pattern.

## Features

- ✅ Create, read, update, and delete todo items
- ✅ Mark todos as complete/incomplete
- ✅ Clean API design with separate HTTP method functions
- ✅ TypeScript for type safety
- ✅ PostgreSQL database with Prisma ORM
- ✅ Responsive UI with Tailwind CSS
- ✅ Modern Next.js App Router pattern

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (App Router pattern)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) database

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/nextjs-todo-app.git
cd nextjs-todo-app
```

> **Note**: If you're using this app from Replit, you can fork the Repl directly and skip this step.

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up the database

#### Option 1: Local PostgreSQL

1. Create a PostgreSQL database on your local machine:
   ```bash
   createdb nextjs_todo_app
   ```

2. Create a `.env` file in the root directory with your database connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/nextjs_todo_app?schema=public"
   ```
   Replace `username` and `password` with your PostgreSQL credentials.

> **Note for Replit users**: Replit automatically provides a PostgreSQL database and sets up the `DATABASE_URL` environment variable for you.

#### Option 2: Using a Cloud PostgreSQL Provider (like Neon, Supabase, etc.)

1. Sign up for a cloud PostgreSQL service like [Neon](https://neon.tech/) or [Supabase](https://supabase.com/)
2. Create a new PostgreSQL database
3. Copy the connection string to your `.env` file:
   ```
   DATABASE_URL="postgresql://username:password@host:port/database?schema=public"
   ```

### 4. Initialize the database with Prisma

Generate Prisma client and apply migrations:

```bash
# Generate Prisma client based on your schema
npx prisma generate

# Push the database schema to your database
npx prisma db push
```

To view and manage your data with Prisma Studio (a visual database editor):

```bash
npx prisma studio
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or specifically for this project
npx next dev -p 5000
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application, or [http://localhost:5000](http://localhost:5000) if you used the port 5000 option.

> **Note for Replit users**: The app will automatically run on port 5000 and be accessible through the Replit webview.

## Project Structure

```
src/
├── app/                   # App Router components
│   ├── api/               # API routes
│   │   └── todos/         # Todo API endpoints
│   │       ├── [id]/      # Dynamic API routes for individual todos
│   │       │   └── route.ts  # GET, PUT, DELETE endpoints
│   │       └── route.ts   # GET, POST endpoints
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page component
├── components/            # Reusable UI components
│   ├── TodoForm.tsx       # Form for adding new todos
│   ├── TodoItem.tsx       # Component for displaying a single todo
│   └── TodoList.tsx       # Component for listing todos
├── lib/                   # Helper functions and utilities
│   └── prisma.ts          # Prisma client initialization
├── styles/                # CSS and styling
│   └── globals.css        # Global styles (includes Tailwind)
└── types/                 # TypeScript type definitions
    └── index.ts           # Type definitions for the app
```

## API Routes

This project uses the Next.js App Router pattern for API routes, which provides a cleaner way to define API endpoints. Each HTTP method is defined as a separate named function, making the code more maintainable and easier to understand:

### `/api/todos` Endpoints

- **GET** - Fetch all todos
  - Usage: `GET /api/todos`
  - Returns: Array of todo items

- **POST** - Create a new todo
  - Usage: `POST /api/todos`
  - Body: `{ title: string, description?: string }`
  - Returns: The created todo item

### `/api/todos/[id]` Endpoints

- **GET** - Fetch a specific todo
  - Usage: `GET /api/todos/[id]`
  - Returns: Single todo item

- **PUT** - Update a todo
  - Usage: `PUT /api/todos/[id]`
  - Body: `{ title?: string, description?: string, completed?: boolean }`
  - Returns: The updated todo item

- **DELETE** - Delete a todo
  - Usage: `DELETE /api/todos/[id]`
  - Returns: Success message

## Database Schema

The database schema is defined in `prisma/schema.prisma`:

```prisma
model Todo {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## TypeScript Types

The application uses the following TypeScript interfaces for type safety:

```typescript
// Todo interface - represents a todo item
export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// TodoInput - used when creating a new todo
export type TodoInput = {
  title: string;
  description?: string;
};

// TodoUpdateInput - used when updating a todo
export type TodoUpdateInput = {
  title?: string;
  description?: string;
  completed?: boolean;
};
```

## Styling

This project uses Tailwind CSS for styling. The main configuration files are:

- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `src/styles/globals.css` - Global styles and Tailwind imports

## App Router vs Pages Router

This project uses the newer App Router pattern introduced in Next.js 13. Here's a comparison with the traditional Pages Router:

### App Router Benefits

1. **Cleaner API Routes**:
   - Define separate functions for each HTTP method (GET, POST, PUT, DELETE)
   - Better organization and readability
   - More maintainable code structure

2. **Route Grouping**:
   - Enhanced organization of routes with nested folders
   - Dynamic routes with parameters directly in folder names (e.g., `[id]`)

3. **Server Components by Default**:
   - Better performance with React Server Components
   - Reduced client-side JavaScript

4. **Improved Type Safety**:
   - Built-in types for request and response objects
   - Better TypeScript integration

### App Router API Route Structure

```
src/app/api/todos/route.ts         # Handles /api/todos endpoints
src/app/api/todos/[id]/route.ts    # Handles /api/todos/[id] endpoints
```

Each file exports functions named after the HTTP methods they handle:

```typescript
export async function GET() { /* ... */ }
export async function POST() { /* ... */ }
export async function PUT() { /* ... */ }
export async function DELETE() { /* ... */ }
```

## Deployment

### Option 1: Vercel (Recommended)

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Add your environment variables (including `DATABASE_URL`)
4. Deploy

### Option 2: Traditional Hosting

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Code Examples

### API Route Example (App Router Pattern)

Here's an example of how the API routes are structured using the App Router pattern:

```typescript
// src/app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TodoInput } from '@/types';

// GET /api/todos - Get all todos
export async function GET(request: NextRequest) {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const data = await request.json() as TodoInput;
    
    if (!data.title || data.title.trim() === '') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const todo = await prisma.todo.create({
      data: {
        title: data.title,
        description: data.description || null,
      }
    });
    
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}
```

### Dynamic API Route Example

```typescript
// src/app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { TodoUpdateInput } from '@/types';

// PUT /api/todos/[id] - Update a todo
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const todoId = Number(params.id);
  if (isNaN(todoId)) {
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
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.