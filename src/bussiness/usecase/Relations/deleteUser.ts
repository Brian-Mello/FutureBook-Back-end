import { RelationGateway } from "../../gateways/relationsGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class DeleteUserUC{
    constructor(
        private relationGateway: RelationGateway,
        private authenticationGateway: AuthenticationGateway
    ){}
    
    public async execute(input: DeleteUserUCInput): Promise<DeleteUserUCOutput>{

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token)

        const user = await this.relationGateway.getUsersRelationsData(userInfo.id, input.friendAddedId)

        if(!user){
            throw new Error("You are not friends!")
        }

        await this.relationGateway.unfollowUserRelation(userInfo.id, input.friendAddedId)

        return{
            message: "Friendship ended successfully"
        }
    }

}

export interface DeleteUserUCInput{
    token: string;
    friendAddedId: string;
}

export interface DeleteUserUCOutput{
    message: string
}