import { User, UserCreate, UserRepository } from "../interface/users.interface";
import { UserRepositoryPrisma } from "../repositories/user.repository";
import bcrypt from 'bcrypt';

class UserUseCase {
    private userRepository: UserRepository
    constructor() { 
        this.userRepository = new UserRepositoryPrisma;
    }

    async create({name, email, password}: UserCreate): Promise<User> {
        const verifyIfUserExists = await this.userRepository.findByEmail(email);

        if (verifyIfUserExists) {
            throw new Error('User already exists');
        }
        
        const result = await this.userRepository.create({name, email, password});

        return result;
    }

    async findAll(): Promise<User[]> {
        const result = await this.userRepository.findAllUsers();

        return result;
    }

    async verifyCredentials(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        return user;
    }

}

export default UserUseCase;