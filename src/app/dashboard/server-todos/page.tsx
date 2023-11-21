export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserSessionServer } from "@/auth";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Server Todos List",
  description: "List of the Server TODOS",
};


export default async function ServerTodosPage() {

  const user = await getUserSessionServer();

  if (!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({ 
    where: { userId: user.id },
    orderBy: { description: "asc" } 
  });

  return (
    <div>
      <div className="text-3xl mb-10 bg-teal-500 text-center">Server Actions</div>

      <NewTodo />

      <TodosGrid todos={todos} />
    </div>
  );
}
