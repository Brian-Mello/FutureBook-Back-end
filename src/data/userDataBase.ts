import { User } from "../bussiness/entities/User";
import { UserGateway } from "../bussiness/gateways/userGateway";
import { BaseDB } from "./baseDataBase";

export class UserDB extends BaseDB implements UserGateway{
    private userTableName = 'user';

    private mapDBUserToUser(input?: any): User | undefined {
        return (
            input &&
            new User(
                input.id,
                input.name,
                input.email,
                input.password,
                input.type
            )
        )
    }

    public async singUp(user: User): Promise<void>{
        await this.connection.raw(`
            INSERT INTO ${this.userTableName}(id, name, email, password, type)
            VALUES(
                '${user.getId()}',
                '${user.getName()}',
                '${user.getEmail()}',
                '${user.getPassword()}',
                '${user.getType()}'
            )
        `);
    }

    public async login(email: string): Promise<User | undefined>{
        const result = await this.connection.raw(`
            SELECT *
            FROM ${this.userTableName}
            WHERE email = '${email}'
        `);

        if(!result[0][0]){
            return undefined;
        };

        return await this.mapDBUserToUser(result[0][0]);
    }


}