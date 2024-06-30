export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRepository {
    create(data: UserCreate): Promise<User>;
    findByEmail(emai: string): Promise<User | null>;
    findAllUsers(): Promise<User[]>;
}