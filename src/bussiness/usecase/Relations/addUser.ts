import { RelationGateway } from "../../gateways/relationsGateway";
import { AuthenticationGateway } from "../../gateways/authenticationGateway";

export class AddUserUC{
    constructor(
        private relationGateway: RelationGateway,
        private authenticationGateway: AuthenticationGateway
    ){}
    
    public async execute(input: AddFriendUCInput): Promise<AddFriendUCOutput>{

        const userInfo = this.authenticationGateway.getUsersInfoFromToken(input.token)

        const user = await this.relationGateway.getUsersRelationsData(userInfo.id, input.friendAddedId)

        if(user){
            throw new Error("You are already friends!")
        }

        await this.relationGateway.addUserRelation(userInfo.id, input.friendAddedId)

        return{
            message: "User Added Successfully"
        }
    }

}

export interface AddFriendUCInput{
    token: string;
    friendAddedId: string;
}

export interface AddFriendUCOutput{
    message: string
}