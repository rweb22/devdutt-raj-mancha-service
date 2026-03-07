import { PostType } from './post-type.enum';
import { VimarshThread } from './vimarsh-thread.entity';
import { VimarshLike } from './vimarsh-like.entity';
export declare class VimarshPost {
    id: string;
    threadId: string;
    authorUsername: string;
    content: string;
    postType: PostType;
    draftNumber: number;
    contentHash: string;
    previousHash: string | null;
    postNumber: number;
    replyToId: string;
    likeCount: number;
    createdAt: Date;
    thread: VimarshThread;
    likes: VimarshLike[];
    replyTo: VimarshPost;
}
