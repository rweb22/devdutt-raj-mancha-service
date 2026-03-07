import { Repository } from 'typeorm';
import { VimarshLike } from '../entities';
import { PostService } from './post.service';
export declare class LikeService {
    private likeRepository;
    private postService;
    constructor(likeRepository: Repository<VimarshLike>, postService: PostService);
    likePost(postId: string, username: string): Promise<VimarshLike>;
    unlikePost(postId: string, username: string): Promise<void>;
    hasLiked(postId: string, username: string): Promise<boolean>;
    getLikesByPost(postId: string): Promise<VimarshLike[]>;
}
