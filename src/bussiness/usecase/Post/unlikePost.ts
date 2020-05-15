import { PostGateway } from "../../gateways/postGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class UnlikePostUC{
    constructor(
        private postGateway: PostGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: unLikePostUCInput): Promise<unLikePostUCOutput>{

        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token);

        const relation = await this.postGateway.getPostRelation(userInfo.id, input.postId)

        if(!relation){
            throw new Error("You alredy unliked this post!")
        }

        await this.postGateway.likePost(userInfo.id, input.postId)

        return{
            message: "Post unliked Successfully"
        }
    }
}

export interface unLikePostUCInput{
    token: string;
    postId: string;
}

export interface unLikePostUCOutput{
    message: string
}