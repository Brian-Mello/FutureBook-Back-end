import { UserRelations } from "../entities/UserRelations";

export interface RelationGateway {
    getUsersRelationsData(adderFriendId: string,friendAddedId: string): Promise<UserRelations | undefined>;
    addUserRelation(adderFriendId: string, friendAddedId: string): Promise<void>;
    followUserRelation(adderFriendId: string, friendAddedId: string): Promise<void>;
    deleteUserRelation(adderFriendId: string,friendAddedId: string): Promise<void>;
    unfollowUserRelation(adderFriendId: string,friendAddedId: string): Promise<void>;
}