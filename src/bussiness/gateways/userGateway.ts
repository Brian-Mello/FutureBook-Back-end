import { User } from "../entities/User";

export interface UserGateway {
    singUp(user: User): Promise<void>;
    login(email: string): Promise<User | undefined>;
}