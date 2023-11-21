import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';

export async function GET(request: Request) { 

    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
          name: 'root',
          email: 'root@root.com',
          password: bcrypt.hashSync('root'),
          roles: ['user', 'admin', 'super-user'],
          todos: {
            create:
            [
              { description: 'Soul Stone', complete: true },
              { description: 'Power Stone'},
              { description: 'Time Stone'},
              { description: 'Space Stone'},
              { description: 'Reality Stone'}
            ]
          }
      }
    })

  return NextResponse.json({
    message: 'Seeded'
  });
}