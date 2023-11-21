import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { getServerSession } from "next-auth";

export const getUserSessionServer = async () => {
    const session = await getServerSession(authOptions);
    return session?.user;
  }

export const signInWithUserNamePassword = async(email: string, pass: string) => {

    if (!email || !pass) return null;

    const user = await prisma.user.findUnique({ where: { email }});

    if (!user) return await createUser(email, pass);

    if (!bcrypt.compareSync(pass, user.password ?? '')) return null;

    return user;
}
const createUser = async(email: string, pass: string) => {

    const user = await prisma.user.create({
        data: {
            email: email,
            password: bcrypt.hashSync(pass)
        }
    });

    return user;
}