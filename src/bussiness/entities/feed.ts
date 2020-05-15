import { Post, PostType } from "./Post";

export class Feed extends Post{
    constructor(
        id: string,
        photo: string,
        description: string,
        creationDate: Date,
        type: PostType,
        userId: string,
        private name: string

    ){
        super(id, photo, description, creationDate, type, userId)
    }

    public getName(): string{
        return this.name
    }

    public setName(name: string): void{
        this.name = name
    }
}