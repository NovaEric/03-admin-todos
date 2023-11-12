import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            { description: 'Soul Stone', complete: true },
            { description: 'Power Stone'},
            { description: 'Time Stone'},
            { description: 'Space Stone'},
            { description: 'Reality Stone'}
        ]
    })

  return NextResponse.json({
    message: 'Seeded'
  });
}