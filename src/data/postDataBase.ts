import { BaseDB } from "./baseDataBase";
import { Post } from "../bussiness/entities/Post";
import { PostGateway } from "../bussiness/gateways/postGateway";
import { PostRelations } from "../bussiness/entities/postRelations";
import { CommentRelations } from "../bussiness/entities/commentRelations";

export class PostDB extends BaseDB implements PostGateway{
    private postTableName = "post";
    private postRelationTableName = "post_relations";
    private commentTableName = "comments"

    private mapDBRelationToRelation(input?: any): PostRelations | undefined{
        return(
            input &&
            new PostRelations(
                input.userId,
                input.postId
            )
        )
    }

    private mapDBCommentToRelation(input?: any): CommentRelations | undefined{
        return(
            input &&
            new CommentRelations(
                input.userId,
                input.postId
            )
        )
    }


    private mapDateToDbDate(input: Date): string {
        const year = input.getFullYear();
        const month = input.getMonth() + 1;
        const date = input.getDate();
        const hour = input.getHours();
        const minute = input.getMinutes();
        const second = input.getSeconds();
        return `${year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second}`;
    }

    public async createPost(post: Post): Promise <void> {
        await this.connection.raw(`
            INSERT INTO ${this.postTableName}(id, photo, description, creationDate, type, userId)
            VALUES(
                '${post.getId()}',
                '${post.getPhoto()}',
                '${post.getDescription()}',
                STR_TO_DATE('${this.mapDateToDbDate(post.getCreationDate())}', '%Y-%m-%d %H:%i:%s'),
                '${post.getType()}',
                '${post.getUserId()}'
            )
        `);
    };

    public async getPostRelation(userId: string, postId: string): Promise<PostRelations | undefined>{
        const relation = await this.connection.raw(`
            SELECT *
            FROM ${this.postRelationTableName}
            WHERE userId = '${userId}' AND postId = '${postId}'
        `)

        if(!relation[0][0]){
            return undefined;
        };

        return await this.mapDBRelationToRelation(relation[0][0])
    }

    public async getCommentRelation(userId: string, postId: string): Promise<CommentRelations | undefined>{
        const relation = await this.connection.raw(`
            SELECT *
            FROM ${this.commentTableName}
            WHERE userId = '${userId}' AND postId = '${postId}'
        `)

        if(!relation[0][0]){
            return undefined;
        };

        return await this.mapDBCommentToRelation(relation[0][0])
    }

    public async likePost(userId: string, postId: string): Promise<void>{
        await this.connection.raw(`
            INSERT INTO ${this.postRelationTableName}(userId, postId)
            VALUES('${userId}', '${postId}');
        `)
    }

    public async unlikePost(userId: string, postId: string): Promise<void>{
        await this.connection.raw(`
            DELETE FROM ${this.postRelationTableName}
            WHERE userId ='${userId}' AND postId = '${postId}';
        `)
    }

    public async commentPost(userId: string, postId: string, comment: string): Promise<void>{
        await this.connection.raw(`
            INSERT INTO ${this.commentTableName}(userId, postId, comment)
            VALUES('${userId}', '${postId}', '${comment}');
        `)
    }

    public async deleteCommentPost(userId: string, postId: string, comment: string): Promise<void>{
        await this.connection.raw(`
            DELETE FROM ${this.commentTableName}
            WHERE userId ='${userId}' AND postId = '${postId}' AND comment = '${comment}';
        `)
    }

}