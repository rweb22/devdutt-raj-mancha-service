import { Repository } from 'typeorm';
import { VimarshPost, PostType } from '../entities';
import { HashService } from './hash.service';
import { ThreadService } from './thread.service';
export declare class PostService {
    private postRepository;
    private hashService;
    private threadService;
    constructor(postRepository: Repository<VimarshPost>, hashService: HashService, threadService: ThreadService);
    createPost(threadId: string, authorUsername: string, content: string, postType?: PostType, draftNumber?: number, replyToId?: string): Promise<VimarshPost>;
    getPostById(id: string): Promise<VimarshPost>;
    getPostsByThread(threadId: string): Promise<VimarshPost[]>;
    getPostsByDraft(threadId: string, draftNumber: number): Promise<VimarshPost[]>;
    verifyHashChain(postId: string): Promise<boolean>;
    verifyThreadHashChain(threadId: string): Promise<{
        valid: boolean;
        brokenAt?: number;
    }>;
    incrementLikeCount(postId: string): Promise<void>;
    decrementLikeCount(postId: string): Promise<void>;
}
