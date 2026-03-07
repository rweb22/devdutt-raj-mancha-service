import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PollService } from '../services/poll.service';
import { CreatePollDto } from '../dto/create-poll.dto';
import { VotePollDto } from '../dto/vote-poll.dto';
import { VimarshPoll, VimarshPollVote } from '../entities';

@ApiTags('Polls')
@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post('thread/:threadId')
  @ApiOperation({ summary: 'Create a poll in a thread' })
  @ApiParam({ name: 'threadId', description: 'Thread ID' })
  @ApiResponse({ status: 201, description: 'Poll created successfully' })
  async createPoll(
    @Param('threadId') threadId: string,
    @Body() dto: CreatePollDto,
  ): Promise<VimarshPoll> {
    return this.pollService.createPoll(threadId, dto.question, dto.options, dto.pollType);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get poll by ID' })
  @ApiParam({ name: 'id', description: 'Poll ID' })
  @ApiResponse({ status: 200, description: 'Poll found' })
  @ApiResponse({ status: 404, description: 'Poll not found' })
  async getPollById(@Param('id') id: string): Promise<VimarshPoll> {
    return this.pollService.getPollById(id);
  }

  @Post(':id/vote')
  @ApiOperation({ summary: 'Vote on a poll' })
  @ApiParam({ name: 'id', description: 'Poll ID' })
  @ApiResponse({ status: 201, description: 'Vote cast successfully' })
  @ApiResponse({ status: 400, description: 'Poll is closed or invalid options' })
  @ApiResponse({ status: 409, description: 'User has already voted' })
  async votePoll(@Param('id') id: string, @Body() dto: VotePollDto): Promise<VimarshPollVote> {
    return this.pollService.votePoll(id, dto.username, dto.selectedOptions);
  }

  @Get(':id/results')
  @ApiOperation({ summary: 'Get poll results' })
  @ApiParam({ name: 'id', description: 'Poll ID' })
  @ApiResponse({ status: 200, description: 'Poll results retrieved' })
  async getPollResults(@Param('id') id: string): Promise<{
    question: string;
    results: Record<string, number>;
    totalVotes: number;
  }> {
    return this.pollService.getPollResults(id);
  }

  @Put(':id/close')
  @ApiOperation({ summary: 'Close a poll' })
  @ApiParam({ name: 'id', description: 'Poll ID' })
  @ApiResponse({ status: 200, description: 'Poll closed successfully' })
  async closePoll(@Param('id') id: string): Promise<VimarshPoll> {
    return this.pollService.closePoll(id);
  }
}

