export class UserRelations {
    constructor(
        private adderFriendId: string,
        private friendAddedId: string
    ) { }

    public getAdderFriendIdId(): string {
        return this.adderFriendId;
    }

    public setAdderFriendId(adderFriendId: string): void {
        this.adderFriendId = adderFriendId;
    }

    public getFollowedId(): string {
        return this.friendAddedId;
    }

    public setFriendAddedIdId(friendAddedId: string): void {
        this.friendAddedId = friendAddedId;
    }
}