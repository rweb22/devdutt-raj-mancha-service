import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { VimarshPost } from '../entities';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('thread/:threadId')
  @ApiOperation({ summary: 'Create a new post in a thread' })
  @ApiParam({ name: 'threadId', description: 'Thread ID' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  async createPost(
    @Param('threadId') threadId: string,
    @Body() dto: CreatePostDto,
  ): Promise<VimarshPost> {
    return this.postService.createPost(
      threadId,
      dto.authorUsername,
      dto.content,
      dto.postType,
      dto.draftNumber,
      dto.replyToId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Post found' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async getPostById(@Param('id') id: string): Promise<VimarshPost> {
    return this.postService.getPostById(id);
  }

  @Get('thread/:threadId')
  @ApiOperation({ summary: 'Get all posts in a thread' })
  @ApiParam({ name: 'threadId', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Posts retrieved' })
  async getPostsByThread(@Param('threadId') threadId: string): Promise<VimarshPost[]> {
    return this.postService.getPostsByThread(threadId);
  }

  @Get('thread/:threadId/draft/:draftNumber')
  @ApiOperation({ summary: 'Get posts by draft number' })
  @ApiParam({ name: 'threadId', description: 'Thread ID' })
  @ApiParam({ name: 'draftNumber', description: 'Draft number' })
  @ApiResponse({ status: 200, description: 'Draft posts retrieved' })
  async getPostsByDraft(
    @Param('threadId') threadId: string,
    @Param('draftNumber') draftNumber: number,
  ): Promise<VimarshPost[]> {
    return this.postService.getPostsByDraft(threadId, draftNumber);
  }

  @Get(':id/verify-hash')
  @ApiOperation({ summary: 'Verify hash chain integrity for a post' })
  @ApiParam({ name: 'id', description: 'Post ID' })
  @ApiResponse({ status: 200, description: 'Hash verification result' })
  async verifyHashChain(@Param('id') id: string): Promise<{ valid: boolean }> {
    const valid = await this.postService.verifyHashChain(id);
    return { valid };
  }

  @Get('thread/:threadId/verify-chain')
  @ApiOperation({ summary: 'Verify entire hash chain for a thread' })
  @ApiParam({ name: 'threadId', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Hash chain verification result' })
  async verifyThreadHashChain(
    @Param('threadId') threadId: string,
  ): Promise<{ valid: boolean; brokenAt?: number }> {
    return this.postService.verifyThreadHashChain(threadId);
  }
}

