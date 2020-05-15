import { BaseDB } from "./baseDataBase"
import { RelationGateway } from "../bussiness/gateways/relationsGateway"
import { UserRelations } from "../bussiness/entities/UserRelations";

export class UserRelationsDB extends BaseDB implements RelationGateway{
    private userRelationsTableName = "user_relations"

    private mapDBRelationToRelation(input?: any): UserRelations | undefined{
        return(
            input &&
            new UserRelations(
                input.adderFriendId,
                input.friendAddedId
            )
        )
    }
    
    public async getUsersRelationsData(adderFriendId: string, friendAddedId: string): Promise<UserRelations | undefined>{
        const relation = await this.connection.raw(`
            SELECT * 
            FROM ${this.userRelationsTableName}
            WHERE adderFriendId = '${adderFriendId}' AND friendAddedId = '${friendAddedId}';
        `);

        if(!relation[0][0]){
            return undefined;
        };

        return await this.mapDBRelationToRelation(relation[0][0]);
    }

    public async addUserRelation(adderFriendId: string, friendAddedId: string): Promise<void>{
        await this.connection.raw(`
            INSERT INTO ${this.userRelationsTableName}(adderFriendId, friendAddedId)
            VALUES('${adderFriendId}', '${friendAddedId}'),
            ('${friendAddedId}', '${adderFriendId}'),
            ('${adderFriendId}', '${adderFriendId}');
        `);  
    };

    public async followUserRelation(adderFriendId: string, friendAddedId: string): Promise<void>{
        await this.connection.raw(`
            INSERT INTO ${this.userRelationsTableName}(adderFriendId, friendAddedId)
            VALUES('${adderFriendId}', '${friendAddedId}');
        `);
    };

    public async deleteUserRelation(adderFriendId: string,friendAddedId: string): Promise<void>{
        await this.connection.raw(`
            DELETE FROM ${this.userRelationsTableName}
            WHERE adderFriendId = '${adderFriendId}' AND friendAddedId = '${friendAddedId}';
        `);

        await this.connection.raw(`
            DELETE FROM ${this.userRelationsTableName}
            WHERE adderFriendId = '${friendAddedId}' AND friendAddedId = '${adderFriendId}';
        `);
    };

    public async unfollowUserRelation(adderFriendId: string,friendAddedId: string): Promise<void>{
        await this.connection.raw(`
            DELETE FROM ${this.userRelationsTableName}
            WHERE adderFriendId = '${adderFriendId}' AND friendAddedId = '${friendAddedId}';
        `);
    }
}