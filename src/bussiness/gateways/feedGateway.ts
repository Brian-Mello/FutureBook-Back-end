import { Feed } from "../entities/feed";

export interface FeedGateway {
    getPostsForFeed(id: string, orderBy: string, orderType: string, limit: number, offset: number): Promise<Feed[] | undefined>;
    getPostsForFeedByType(id: string, type: string, orderBy: string, orderType: string, limit: number, offset: number): Promise<Feed[] | undefined>;
}