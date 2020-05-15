export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private type: UserType
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(id: string) {
        this.id = id
    }

    public getName(): string {
        return this.name
    }

    public setName(name: string) {
        this.name = name
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(email: string) {
        this.email = email
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(password: string) {
        this.password = password
    }

    public getType(): UserType {
        return this.type
    }

    public setType(type: UserType) {
        this.type = type
    }
}

export enum UserType{
    admin = "admin",
    user = "user"
}