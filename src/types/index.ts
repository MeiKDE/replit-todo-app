export interface Todo {
  id: number;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoInput = {
  title: string;
  description?: string;
};

export type TodoUpdateInput = {
  title?: string;
  description?: string;
  completed?: boolean;
};
