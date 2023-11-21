export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserSessionServer } from "@/auth";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Todos List",
  description: "List of the TODOS",
};

export default async function RestTodosPage() {
  
  const user = await getUserSessionServer();

  if (!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({ 
    where: { userId: user.id },
    orderBy: { description: "asc" } 
  });

  return (
    <div>
      <NewTodo />

      <TodosGrid todos={todos} />
    </div>
  );
}
