import { PostGateway } from "../../gateways/postGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class LikePostUC{
    constructor(
        private postGateway: PostGateway,
        private authenticationGateway: AuthenticationGateway
    ){}

    public async execute(input: LikePostUCInput): Promise<LikePostUCOutput>{
        const userInfo = await this.authenticationGateway.getUsersInfoFromToken(input.token)

        const relation = await this.postGateway.getPostRelation(userInfo.id, input.postId)

        if(relation){
            throw new Error("You alredy liked this post!")
        }

        await this.postGateway.likePost(userInfo.id, input.postId)

        return{
            message: "Post Liked Successfully"
        }
    }
}

export interface LikePostUCInput{
    token: string;
    postId: string;
}

export interface LikePostUCOutput{
    message: string
}