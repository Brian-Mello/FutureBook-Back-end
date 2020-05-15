import { RelationGateway } from "../../gateways/relationsGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class FollowUserUC{
    constructor(
        private relationGateway: RelationGateway,
        private authenticationGateway: AuthenticationGateway
    ){}
    
    public async execute(input: FollowUserUCInput): Promise<FollowUserUCOutput>{

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token)

        const user = await this.relationGateway.getUsersRelationsData(userInfo.id, input.friendAddedId)

        if(user){
            throw new Error("This user are already followed by you!")
        }

        await this.relationGateway.followUserRelation(userInfo.id, input.friendAddedId)

        return{
            message: "User Followed Successfully"
        }
    }

}

export interface FollowUserUCInput{
    token: string;
    friendAddedId: string;
}

export interface FollowUserUCOutput{
    message: string
}