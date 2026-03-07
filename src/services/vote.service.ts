import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VimarshVote, VoteType, VimarshStatus } from '../entities';
import { ThreadService } from './thread.service';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VimarshVote)
    private voteRepository: Repository<VimarshVote>,
    private threadService: ThreadService,
  ) {}

  /**
   * Cast a vote on a thread
   */
  async castVote(threadId: string, username: string, voteType: VoteType): Promise<VimarshVote> {
    // Check if thread is in VOTING status
    const thread = await this.threadService.getThreadById(threadId);
    if (thread.status !== VimarshStatus.VOTING) {
      throw new BadRequestException('Thread must be in VOTING status to cast votes');
    }

    // Check if user has already voted
    const existingVote = await this.voteRepository.findOne({
      where: { threadId, username },
    });

    if (existingVote) {
      throw new ConflictException('User has already voted on this thread');
    }

    // Create vote
    const vote = this.voteRepository.create({
      threadId,
      username,
      voteType,
    });

    const savedVote = await this.voteRepository.save(vote);

    // Update thread vote counts
    await this.updateThreadVoteCounts(threadId);

    return savedVote;
  }

  /**
   * Get all votes for a thread
   */
  async getVotes(threadId: string): Promise<VimarshVote[]> {
    return this.voteRepository.find({
      where: { threadId },
      order: { votedAt: 'ASC' },
    });
  }

  /**
   * Count votes by type
   */
  async countVotes(threadId: string): Promise<{
    forCount: number;
    againstCount: number;
    abstainCount: number;
    total: number;
  }> {
    const votes = await this.getVotes(threadId);

    const forCount = votes.filter((v) => v.voteType === VoteType.FOR).length;
    const againstCount = votes.filter((v) => v.voteType === VoteType.AGAINST).length;
    const abstainCount = votes.filter((v) => v.voteType === VoteType.ABSTAIN).length;

    return {
      forCount,
      againstCount,
      abstainCount,
      total: votes.length,
    };
  }

  /**
   * Check if user has voted
   */
  async hasVoted(threadId: string, username: string): Promise<boolean> {
    const vote = await this.voteRepository.findOne({
      where: { threadId, username },
    });
    return !!vote;
  }

  /**
   * Update thread vote counts
   */
  private async updateThreadVoteCounts(threadId: string): Promise<void> {
    const counts = await this.countVotes(threadId);
    await this.threadService.updateVoteCounts(
      threadId,
      counts.forCount,
      counts.againstCount,
      counts.abstainCount,
    );
  }
}

