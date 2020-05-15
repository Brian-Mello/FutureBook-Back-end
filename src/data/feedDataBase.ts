import { BaseDB } from "./baseDataBase";
import { FeedGateway } from "../bussiness/gateways/feedGateway";
import { Feed } from "../bussiness/entities/feed";

export class FeedDB extends BaseDB implements FeedGateway{
    private relationTableName = "user_relations";
    private userTableName = "user";
    private postTableName = "post";

    public async getPostsForFeed(id: string, orderBy: string, orderType: string, limit: number, offset: number): Promise<Feed[] | undefined>{
        const result = await this.connection.raw(`
            SELECT p.*, u.name
            FROM ${this.relationTableName} ur
            JOIN ${this.userTableName} u
            ON ur.friendAddedId = u.id
            JOIN ${this.postTableName} p
            ON ur.friendAddedId = p.userId
            WHERE adderFriendId = '${id}'
            ORDER BY ${orderBy} ${orderType}
            LIMIT ${limit} OFFSET ${offset};
        `)

        if (!result[0][0]) {
            return undefined;
        }

        return result[0].map((post: any) => {
            return new Feed(
                post.id,
                post.photo,
                post.description,
                post.creationDate,
                post.type,
                post.userId,
                post.name
            );
        });
    };

    public async getPostsForFeedByType(id: string, type: string, orderBy: string, orderType: string, limit: number, offset: number): Promise<Feed[] | undefined>{
        const result = await this.connection.raw(`
            SELECT p.*, u.name
            FROM ${this.relationTableName} ur
            JOIN ${this.userTableName} u
            ON ur.friendAddedId = u.id
            JOIN ${this.postTableName} p
            ON ur.friendAddedId = p.userId
            WHERE adderFriendId = '${id}' AND p.type = '${type}'
            ORDER BY ${orderBy} ${orderType}
            LIMIT ${limit} OFFSET ${offset};
        `);

        if (!result[0][0]) {
            return undefined;
        };

        return result[0].map((post: any) => {
            return new Feed(
                post.id,
                post.photo,
                post.description,
                post.creationDate,
                post.type,
                post.userId,
                post.name
            );
        });
    };
}