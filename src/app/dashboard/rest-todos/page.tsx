import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Todos List',
  description: 'List of the TODOS'
}

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })
  return (
    <div>
      <TodosGrid todos={todos} />
    </div>
  );
}