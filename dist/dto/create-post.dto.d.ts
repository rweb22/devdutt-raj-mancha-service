import { PostType } from '../entities';
export declare class CreatePostDto {
    content: string;
    authorUsername: string;
    postType?: PostType;
    draftNumber?: number;
    replyToId?: string;
}
