import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VimarshPost, PostType } from '../entities';
import { HashService } from './hash.service';
import { ThreadService } from './thread.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(VimarshPost)
    private postRepository: Repository<VimarshPost>,
    private hashService: HashService,
    private threadService: ThreadService,
  ) {}

  /**
   * Create a new post in a thread
   */
  async createPost(
    threadId: string,
    authorUsername: string,
    content: string,
    postType: PostType = PostType.NORMAL,
    draftNumber?: number,
    replyToId?: string,
  ): Promise<VimarshPost> {
    // Get thread to check if it's locked
    const thread = await this.threadService.getThreadById(threadId);
    if (thread.isLocked) {
      throw new BadRequestException('Thread is locked');
    }

    // Get the last post to determine post number and previous hash
    const lastPost = await this.postRepository.findOne({
      where: { threadId },
      order: { postNumber: 'DESC' },
    });

    const postNumber = lastPost ? lastPost.postNumber + 1 : 1;
    const previousHash = lastPost ? lastPost.contentHash : null;

    // Generate content hash
    const contentHash = this.hashService.generatePostHash(
      threadId,
      authorUsername,
      content,
      postNumber,
      previousHash,
    );

    const post = this.postRepository.create({
      threadId,
      authorUsername,
      content,
      postType,
      draftNumber,
      replyToId,
      contentHash,
      previousHash,
      postNumber,
    });

    const savedPost = await this.postRepository.save(post);

    // Increment thread post count
    await this.threadService.incrementPostCount(threadId);

    return savedPost;
  }

  /**
   * Get post by ID
   */
  async getPostById(id: string): Promise<VimarshPost> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['likes', 'replyTo'],
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  /**
   * Get all posts in a thread
   */
  async getPostsByThread(threadId: string): Promise<VimarshPost[]> {
    return this.postRepository.find({
      where: { threadId },
      order: { postNumber: 'ASC' },
      relations: ['likes'],
    });
  }

  /**
   * Get posts by draft number
   */
  async getPostsByDraft(threadId: string, draftNumber: number): Promise<VimarshPost[]> {
    return this.postRepository.find({
      where: { threadId, draftNumber },
      order: { postNumber: 'ASC' },
    });
  }

  /**
   * Verify hash chain integrity for a post
   */
  async verifyHashChain(postId: string): Promise<boolean> {
    const post = await this.getPostById(postId);

    return this.hashService.verifyHashChain(
      post.contentHash,
      post.threadId,
      post.authorUsername,
      post.content,
      post.postNumber,
      post.previousHash,
    );
  }

  /**
   * Verify entire hash chain for a thread
   */
  async verifyThreadHashChain(threadId: string): Promise<{ valid: boolean; brokenAt?: number }> {
    const posts = await this.getPostsByThread(threadId);

    for (const post of posts) {
      const isValid = await this.verifyHashChain(post.id);
      if (!isValid) {
        return { valid: false, brokenAt: post.postNumber };
      }
    }

    return { valid: true };
  }

  /**
   * Increment like count
   */
  async incrementLikeCount(postId: string): Promise<void> {
    await this.postRepository.increment({ id: postId }, 'likeCount', 1);
  }

  /**
   * Decrement like count
   */
  async decrementLikeCount(postId: string): Promise<void> {
    await this.postRepository.decrement({ id: postId }, 'likeCount', 1);
  }
}

