import express, { Request, Response } from "express";
import { SignUpEndpoint } from "./endpoints/User/signUp";
import { LoginEndpoint } from "./endpoints/User/login";
import { FollowUserEndpoit } from "./endpoints/UserRelations/followUser";
import { AddUserEndpoit } from "./endpoints/UserRelations/addUser";
import { UnfollowUserEndpoint } from "./endpoints/UserRelations/unfollowUser";
import { DeleteUserEndpoit } from "./endpoints/UserRelations/deleteUser";
import { CreatePostEndPoint } from "./endpoints/Post/createPost";
import { FeedOfPostsEnpoint } from "./endpoints/Feed/getFeedOfPosts";
import { FeedOfPostsByType } from "./endpoints/Feed/getFeedOfPostsByType";
import { LikePostEndPoint } from "./endpoints/Post/likePost";
import { UnlikePostEndPoint } from "./endpoints/Post/unlikePost";
import { CommentPostEndPoint } from "./endpoints/Post/commentPost";
import { DeleteCommentPostEndpoint } from "./endpoints/Post/deleteCommentPost";

const app = express();
app.use(express.json());

// send data
app.post("/signUp", SignUpEndpoint);
app.post("/login", LoginEndpoint);
app.post("/user/followUser", FollowUserEndpoit );
app.post("/user/addUser", AddUserEndpoit);
app.post("/createPost", CreatePostEndPoint);
app.post("/post/like", LikePostEndPoint);
app.post("/post/comment", CommentPostEndPoint);

// delete data
app.delete("/user/unfollow", UnfollowUserEndpoint);
app.delete("/user/deleteFriendship", DeleteUserEndpoit)
app.delete("/post/unlike", UnlikePostEndPoint);
app.delete("/post/deleteComment", DeleteCommentPostEndpoint)

// get data
app.get("/feed", FeedOfPostsEnpoint);
app.get("/feed/type", FeedOfPostsByType);

export default app;
