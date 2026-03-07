import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { VimarshPost } from '../entities';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    createPost(threadId: string, dto: CreatePostDto): Promise<VimarshPost>;
    getPostById(id: string): Promise<VimarshPost>;
    getPostsByThread(threadId: string): Promise<VimarshPost[]>;
    getPostsByDraft(threadId: string, draftNumber: number): Promise<VimarshPost[]>;
    verifyHashChain(id: string): Promise<{
        valid: boolean;
    }>;
    verifyThreadHashChain(threadId: string): Promise<{
        valid: boolean;
        brokenAt?: number;
    }>;
}
