import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ThreadService } from '../services/thread.service';
import { CreateThreadDto } from '../dto/create-thread.dto';
import { VimarshThread } from '../entities';

@ApiTags('Threads')
@Controller('threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new thread' })
  @ApiResponse({ status: 201, description: 'Thread created successfully' })
  async createThread(@Body() dto: CreateThreadDto): Promise<VimarshThread> {
    return this.threadService.createThread(
      dto.title,
      dto.samitiId,
      dto.authorUsername,
      dto.vimarshType,
      dto.assignedByUsername,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get thread by ID' })
  @ApiParam({ name: 'id', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Thread found' })
  @ApiResponse({ status: 404, description: 'Thread not found' })
  async getThreadById(@Param('id') id: string): Promise<VimarshThread> {
    return this.threadService.getThreadById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get threads by samiti' })
  @ApiQuery({ name: 'samitiId', description: 'Samiti ID' })
  @ApiResponse({ status: 200, description: 'Threads retrieved' })
  async getThreadsBySamiti(@Query('samitiId') samitiId: string): Promise<VimarshThread[]> {
    return this.threadService.getThreadsBySamiti(samitiId);
  }

  @Put(':id/deliberation')
  @ApiOperation({ summary: 'Move thread to DELIBERATION status' })
  @ApiParam({ name: 'id', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Thread moved to DELIBERATION' })
  async moveToDeliberation(@Param('id') id: string): Promise<VimarshThread> {
    return this.threadService.moveToDeliberation(id);
  }

  @Put(':id/voting')
  @ApiOperation({ summary: 'Move thread to VOTING status' })
  @ApiParam({ name: 'id', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Thread moved to VOTING' })
  async moveToVoting(@Param('id') id: string): Promise<VimarshThread> {
    return this.threadService.moveToVoting(id);
  }

  @Put(':id/finalize')
  @ApiOperation({ summary: 'Finalize voting and determine outcome' })
  @ApiParam({ name: 'id', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Voting finalized' })
  async finalizeVoting(@Param('id') id: string): Promise<VimarshThread> {
    return this.threadService.finalizeVoting(id);
  }

  @Put(':id/archive')
  @ApiOperation({ summary: 'Archive a thread' })
  @ApiParam({ name: 'id', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Thread archived' })
  async archiveThread(@Param('id') id: string): Promise<VimarshThread> {
    return this.threadService.archiveThread(id);
  }

  @Put(':id/lock')
  @ApiOperation({ summary: 'Lock a thread' })
  @ApiParam({ name: 'id', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Thread locked' })
  async lockThread(@Param('id') id: string): Promise<VimarshThread> {
    return this.threadService.lockThread(id);
  }

  @Put(':id/unlock')
  @ApiOperation({ summary: 'Unlock a thread' })
  @ApiParam({ name: 'id', description: 'Thread ID' })
  @ApiResponse({ status: 200, description: 'Thread unlocked' })
  async unlockThread(@Param('id') id: string): Promise<VimarshThread> {
    return this.threadService.unlockThread(id);
  }

  @Put(':id/escalate')
  @ApiOperation({ summary: 'Escalate thread to a different samiti' })
  @ApiParam({ name: 'id', description: 'Thread ID' })
  @ApiQuery({ name: 'newSamitiId', description: 'New Samiti ID' })
  @ApiResponse({ status: 200, description: 'Thread escalated' })
  async escalateToSamiti(
    @Param('id') id: string,
    @Query('newSamitiId') newSamitiId: string,
  ): Promise<VimarshThread> {
    return this.threadService.escalateToSamiti(id, newSamitiId);
  }
}

