import { PostGateway } from "../../gateways/postGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class DeleteCommentPostUC{
    constructor(
        private postGateway: PostGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: DeleteCommentPostUCInput): Promise<DeleteCommentPostUCOutput>{
        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token)

        const comment = await this.postGateway.getCommentRelation(userInfo.id, input.postId)

        if(!comment){
            throw new Error("Comment not found!")
        }

        await this.postGateway.deleteCommentPost(userInfo.id, input.postId, input.comment)

        return{
            message: "Comment Deleted Successfully!"
        }
    }
}

export interface DeleteCommentPostUCInput{
    postId: string;
    comment: string;
    token: string;
}

export interface DeleteCommentPostUCOutput{
    message: string
}