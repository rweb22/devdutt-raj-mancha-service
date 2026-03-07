import { LikeService } from '../services/like.service';
import { VimarshLike } from '../entities';
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    likePost(postId: string, username: string): Promise<VimarshLike>;
    unlikePost(postId: string, username: string): Promise<{
        message: string;
    }>;
    getLikesByPost(postId: string): Promise<VimarshLike[]>;
    hasLiked(postId: string, username: string): Promise<{
        hasLiked: boolean;
    }>;
}
