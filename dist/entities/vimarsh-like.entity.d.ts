import { VimarshPost } from './vimarsh-post.entity';
export declare class VimarshLike {
    id: string;
    postId: string;
    username: string;
    createdAt: Date;
    post: VimarshPost;
}
