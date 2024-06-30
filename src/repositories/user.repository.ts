import { prisma } from "../database/prisma-client";
import { User, UserCreate, UserRepository } from "../interface/users.interface";
import bcrypt from 'bcrypt';

class UserRepositoryPrisma implements UserRepository {

    async create({ name, email, password }: UserCreate): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const result = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
    
        return result;
    }
    

    async findByEmail(email: string): Promise<UserLogin | null> {
        const result = await prisma.user.findFirst({
            where: {
                email
            }
        });

        return result || null
    }

    async findAllUsers(): Promise<User[]> { 
        const result = await prisma.user.findMany();

        return result || null;
    }

}

export { UserRepositoryPrisma };