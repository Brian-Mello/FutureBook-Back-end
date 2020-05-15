import { Post } from "../entities/Post";
import { PostRelations } from "../entities/postRelations";
import { CommentRelations } from "../entities/commentRelations";

export interface PostGateway {
    createPost(post: Post): Promise<void>;
    likePost(userId: string, postId: string): Promise<void>;
    unlikePost(userId: string, postId: string): Promise<void>;
    commentPost(userId: string, postId: string, comment: string): Promise<void>;
    deleteCommentPost(userId: string, postId: string, comment: string): Promise<void>;
    getPostRelation(userId: string, postId: string): Promise<PostRelations | undefined>;
    getCommentRelation(userId: string, postId: string): Promise<CommentRelations | undefined>;
}