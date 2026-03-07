import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VimarshLike } from '../entities';
import { PostService } from './post.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(VimarshLike)
    private likeRepository: Repository<VimarshLike>,
    private postService: PostService,
  ) {}

  /**
   * Like a post
   */
  async likePost(postId: string, username: string): Promise<VimarshLike> {
    // Check if post exists
    await this.postService.getPostById(postId);

    // Check if user has already liked
    const existingLike = await this.likeRepository.findOne({
      where: { postId, username },
    });

    if (existingLike) {
      throw new ConflictException('User has already liked this post');
    }

    // Create like
    const like = this.likeRepository.create({
      postId,
      username,
    });

    const savedLike = await this.likeRepository.save(like);

    // Increment post like count
    await this.postService.incrementLikeCount(postId);

    return savedLike;
  }

  /**
   * Unlike a post
   */
  async unlikePost(postId: string, username: string): Promise<void> {
    const like = await this.likeRepository.findOne({
      where: { postId, username },
    });

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likeRepository.remove(like);

    // Decrement post like count
    await this.postService.decrementLikeCount(postId);
  }

  /**
   * Check if user has liked a post
   */
  async hasLiked(postId: string, username: string): Promise<boolean> {
    const like = await this.likeRepository.findOne({
      where: { postId, username },
    });
    return !!like;
  }

  /**
   * Get all likes for a post
   */
  async getLikesByPost(postId: string): Promise<VimarshLike[]> {
    return this.likeRepository.find({
      where: { postId },
      order: { createdAt: 'DESC' },
    });
  }
}

