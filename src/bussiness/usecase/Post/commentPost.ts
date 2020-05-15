import { PostGateway } from "../../gateways/postGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class CommentPostUC{
    constructor(
        private postGateway: PostGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: CommentPostUCInput): Promise<CommentPostUCOutput>{

        const userinfo =  await this.authenticationGateway.getUsersInfoFromToken(input.token)

        await this.postGateway.commentPost(userinfo.id, input.postId, input.comment)

        return{
            message: "Post commented Successfully"
        }
    }
}

export interface CommentPostUCInput{
    token: string;
    postId: string;
    comment: string
}

export interface CommentPostUCOutput{
    message: string
}