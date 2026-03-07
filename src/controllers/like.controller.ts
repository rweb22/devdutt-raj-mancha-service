import { Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { LikeService } from '../services/like.service';
import { VimarshLike } from '../entities';

@ApiTags('Likes')
@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('post/:postId')
  @ApiOperation({ summary: 'Like a post' })
  @ApiParam({ name: 'postId', description: 'Post ID' })
  @ApiQuery({ name: 'username', description: 'Username' })
  @ApiResponse({ status: 201, description: 'Post liked successfully' })
  @ApiResponse({ status: 409, description: 'User has already liked this post' })
  async likePost(
    @Param('postId') postId: string,
    @Query('username') username: string,
  ): Promise<VimarshLike> {
    return this.likeService.likePost(postId, username);
  }

  @Delete('post/:postId')
  @ApiOperation({ summary: 'Unlike a post' })
  @ApiParam({ name: 'postId', description: 'Post ID' })
  @ApiQuery({ name: 'username', description: 'Username' })
  @ApiResponse({ status: 200, description: 'Post unliked successfully' })
  @ApiResponse({ status: 404, description: 'Like not found' })
  async unlikePost(
    @Param('postId') postId: string,
    @Query('username') username: string,
  ): Promise<{ message: string }> {
    await this.likeService.unlikePost(postId, username);
    return { message: 'Post unliked successfully' };
  }

  @Get('post/:postId')
  @ApiOperation({ summary: 'Get all likes for a post' })
  @ApiParam({ name: 'postId', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Likes retrieved' })
  async getLikesByPost(@Param('postId') postId: string): Promise<VimarshLike[]> {
    return this.likeService.getLikesByPost(postId);
  }

  @Get('post/:postId/has-liked')
  @ApiOperation({ summary: 'Check if user has liked a post' })
  @ApiParam({ name: 'postId', description: 'Post ID' })
  @ApiQuery({ name: 'username', description: 'Username to check' })
  @ApiResponse({ status: 200, description: 'Like status retrieved' })
  async hasLiked(
    @Param('postId') postId: string,
    @Query('username') username: string,
  ): Promise<{ hasLiked: boolean }> {
    const hasLiked = await this.likeService.hasLiked(postId, username);
    return { hasLiked };
  }
}

