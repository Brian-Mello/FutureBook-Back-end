import { RelationGateway } from "../../gateways/relationsGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class UnfollowUserUC{
    constructor(
        private relationGateway: RelationGateway,
        private authenticationGateway: AuthenticationGateway
    ){}
    
    public async execute(input: UnfollowUserUCInput): Promise<UnfollowUserUCOutput>{

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token)

        const user = await this.relationGateway.getUsersRelationsData(userInfo.id, input.friendAddedId)

        if(!user){
            throw new Error("You don't follow this user!")
        }

        await this.relationGateway.unfollowUserRelation(userInfo.id, input.friendAddedId)

        return{
            message: "User Unfollowed Successfully"
        }
    }

}

export interface UnfollowUserUCInput{
    token: string;
    friendAddedId: string;
}

export interface UnfollowUserUCOutput{
    message: string
}