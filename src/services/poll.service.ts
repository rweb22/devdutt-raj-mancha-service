import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VimarshPoll, VimarshPollVote, PollType } from '../entities';
import { ThreadService } from './thread.service';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(VimarshPoll)
    private pollRepository: Repository<VimarshPoll>,
    @InjectRepository(VimarshPollVote)
    private pollVoteRepository: Repository<VimarshPollVote>,
    private threadService: ThreadService,
  ) {}

  /**
   * Create a poll in a thread
   */
  async createPoll(
    threadId: string,
    question: string,
    options: string[],
    pollType: PollType = PollType.SINGLE_CHOICE,
  ): Promise<VimarshPoll> {
    // Verify thread exists
    await this.threadService.getThreadById(threadId);

    if (options.length < 2) {
      throw new BadRequestException('Poll must have at least 2 options');
    }

    // Initialize results object
    const results: Record<string, number> = {};
    options.forEach((option) => {
      results[option] = 0;
    });

    const poll = this.pollRepository.create({
      threadId,
      question,
      options,
      pollType,
      results,
    });

    return this.pollRepository.save(poll);
  }

  /**
   * Get poll by ID
   */
  async getPollById(id: string): Promise<VimarshPoll> {
    const poll = await this.pollRepository.findOne({
      where: { id },
      relations: ['pollVotes'],
    });

    if (!poll) {
      throw new NotFoundException(`Poll with ID ${id} not found`);
    }

    return poll;
  }

  /**
   * Vote on a poll
   */
  async votePoll(pollId: string, username: string, selectedOptions: string[]): Promise<VimarshPollVote> {
    const poll = await this.getPollById(pollId);

    if (poll.isClosed) {
      throw new BadRequestException('Poll is closed');
    }

    // Check if user has already voted
    const existingVote = await this.pollVoteRepository.findOne({
      where: { pollId, username },
    });

    if (existingVote) {
      throw new ConflictException('User has already voted on this poll');
    }

    // Validate selected options
    if (poll.pollType === PollType.SINGLE_CHOICE && selectedOptions.length !== 1) {
      throw new BadRequestException('Single choice poll requires exactly one option');
    }

    const invalidOptions = selectedOptions.filter((opt) => !poll.options.includes(opt));
    if (invalidOptions.length > 0) {
      throw new BadRequestException(`Invalid options: ${invalidOptions.join(', ')}`);
    }

    // Create vote
    const vote = this.pollVoteRepository.create({
      pollId,
      username,
      selectedOptions,
    });

    const savedVote = await this.pollVoteRepository.save(vote);

    // Update poll results
    await this.updatePollResults(pollId);

    return savedVote;
  }

  /**
   * Get poll results
   */
  async getPollResults(pollId: string): Promise<{
    question: string;
    results: Record<string, number>;
    totalVotes: number;
  }> {
    const poll = await this.getPollById(pollId);
    const totalVotes = poll.pollVotes?.length || 0;

    return {
      question: poll.question,
      results: poll.results,
      totalVotes,
    };
  }

  /**
   * Close a poll
   */
  async closePoll(pollId: string): Promise<VimarshPoll> {
    const poll = await this.getPollById(pollId);
    poll.isClosed = true;
    poll.closedAt = new Date();
    return this.pollRepository.save(poll);
  }

  /**
   * Update poll results
   */
  private async updatePollResults(pollId: string): Promise<void> {
    const poll = await this.getPollById(pollId);
    const votes = poll.pollVotes || [];

    // Reset results
    const results: Record<string, number> = {};
    poll.options.forEach((option) => {
      results[option] = 0;
    });

    // Count votes
    votes.forEach((vote) => {
      vote.selectedOptions.forEach((option) => {
        if (results[option] !== undefined) {
          results[option]++;
        }
      });
    });

    poll.results = results;
    await this.pollRepository.save(poll);
  }
}

