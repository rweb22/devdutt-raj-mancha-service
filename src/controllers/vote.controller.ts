import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { VoteService } from '../services/vote.service';
import { CastVoteDto } from '../dto/cast-vote.dto';
import { VimarshVote } from '../entities';

@ApiTags('Votes')
@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post('thread/:threadId')
  @ApiOperation({ summary: 'Cast a vote on a thread' })
  @ApiParam({ name: 'threadId', description: 'Thread ID' })
  @ApiResponse({ status: 201, description: 'Vote cast successfully' })
  @ApiResponse({ status: 400, description: 'Thread not in VOTING status' })
  @ApiResponse({ status: 409, description: 'User has already voted' })
  async castVote(
    @Param('threadId') threadId: string,
    @Body() dto: CastVoteDto,
  ): Promise<VimarshVote> {
    return this.voteService.castVote(threadId, dto.username, dto.voteType);
  }

  @Get('thread/:threadId')
  @ApiOperation({ summary: 'Get all votes for a thread' })
  @ApiParam({ name: 'threadId', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Votes retrieved' })
  async getVotes(@Param('threadId') threadId: string): Promise<VimarshVote[]> {
    return this.voteService.getVotes(threadId);
  }

  @Get('thread/:threadId/count')
  @ApiOperation({ summary: 'Count votes by type' })
  @ApiParam({ name: 'threadId', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Vote counts retrieved' })
  async countVotes(@Param('threadId') threadId: string): Promise<{
    forCount: number;
    againstCount: number;
    abstainCount: number;
    total: number;
  }> {
    return this.voteService.countVotes(threadId);
  }

  @Get('thread/:threadId/has-voted')
  @ApiOperation({ summary: 'Check if user has voted' })
  @ApiParam({ name: 'threadId', description: 'Thread ID' })
  @ApiQuery({ name: 'username', description: 'Username to check' })
  @ApiResponse({ status: 200, description: 'Vote status retrieved' })
  async hasVoted(
    @Param('threadId') threadId: string,
    @Query('username') username: string,
  ): Promise<{ hasVoted: boolean }> {
    const hasVoted = await this.voteService.hasVoted(threadId, username);
    return { hasVoted };
  }
}

