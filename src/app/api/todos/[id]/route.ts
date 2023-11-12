import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodos = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findFirst({ where: { id } });
};

export async function GET(request: Request, { params }: Segments) {
  const todoById = await getTodos(params.id);

  if (!todoById) {
    return NextResponse.json({ message: "Id not found" }, { status: 404 });
  }

  return NextResponse.json(todoById);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const todoById = await getTodos(params.id);

  if (!todoById) {
    return NextResponse.json({ message: "Id not found" }, { status: 404 });
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodoById = await prisma.todo.update({
      where: {
        id: params.id,
      },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodoById);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
