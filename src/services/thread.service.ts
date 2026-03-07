import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VimarshThread, VimarshStatus, VimarshType } from '../entities';

@Injectable()
export class ThreadService {
  constructor(
    @InjectRepository(VimarshThread)
    private threadRepository: Repository<VimarshThread>,
  ) {}

  /**
   * Create a new thread in DRAFT status
   */
  async createThread(
    title: string,
    samitiId: string,
    authorUsername: string,
    vimarshType: VimarshType = VimarshType.PROPOSAL,
    assignedByUsername?: string,
  ): Promise<VimarshThread> {
    const thread = this.threadRepository.create({
      title,
      samitiId,
      currentSamitiId: samitiId,
      isNative: true,
      authorUsername,
      assignedByUsername,
      vimarshType,
      status: VimarshStatus.DRAFT,
    });

    return this.threadRepository.save(thread);
  }

  /**
   * Get thread by ID
   */
  async getThreadById(id: string): Promise<VimarshThread> {
    const thread = await this.threadRepository.findOne({
      where: { id },
      relations: ['posts', 'votes', 'polls'],
    });

    if (!thread) {
      throw new NotFoundException(`Thread with ID ${id} not found`);
    }

    return thread;
  }

  /**
   * Get all threads for a samiti
   */
  async getThreadsBySamiti(samitiId: string): Promise<VimarshThread[]> {
    return this.threadRepository.find({
      where: { currentSamitiId: samitiId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Move thread from DRAFT to DELIBERATION
   */
  async moveToDeliberation(threadId: string): Promise<VimarshThread> {
    const thread = await this.getThreadById(threadId);

    if (thread.status !== VimarshStatus.DRAFT) {
      throw new BadRequestException(`Thread must be in DRAFT status to move to DELIBERATION`);
    }

    thread.status = VimarshStatus.DELIBERATION;
    return this.threadRepository.save(thread);
  }

  /**
   * Move thread from DELIBERATION to VOTING
   */
  async moveToVoting(threadId: string): Promise<VimarshThread> {
    const thread = await this.getThreadById(threadId);

    if (thread.status !== VimarshStatus.DELIBERATION) {
      throw new BadRequestException(`Thread must be in DELIBERATION status to move to VOTING`);
    }

    thread.status = VimarshStatus.VOTING;
    thread.votingStartedAt = new Date();
    return this.threadRepository.save(thread);
  }

  /**
   * Finalize voting and determine outcome
   */
  async finalizeVoting(threadId: string): Promise<VimarshThread> {
    const thread = await this.getThreadById(threadId);

    if (thread.status !== VimarshStatus.VOTING) {
      throw new BadRequestException(`Thread must be in VOTING status to finalize`);
    }

    thread.votingEndedAt = new Date();

    // Determine outcome based on votes
    if (thread.voteForCount > thread.voteAgainstCount) {
      thread.status = VimarshStatus.PASSED;
    } else {
      thread.status = VimarshStatus.REJECTED;
    }

    return this.threadRepository.save(thread);
  }

  /**
   * Archive a thread
   */
  async archiveThread(threadId: string): Promise<VimarshThread> {
    const thread = await this.getThreadById(threadId);
    thread.status = VimarshStatus.ARCHIVED;
    return this.threadRepository.save(thread);
  }

  /**
   * Lock a thread
   */
  async lockThread(threadId: string): Promise<VimarshThread> {
    const thread = await this.getThreadById(threadId);
    thread.isLocked = true;
    return this.threadRepository.save(thread);
  }

  /**
   * Unlock a thread
   */
  async unlockThread(threadId: string): Promise<VimarshThread> {
    const thread = await this.getThreadById(threadId);
    thread.isLocked = false;
    return this.threadRepository.save(thread);
  }

  /**
   * Escalate thread to a different samiti
   */
  async escalateToSamiti(threadId: string, newSamitiId: string): Promise<VimarshThread> {
    const thread = await this.getThreadById(threadId);
    thread.currentSamitiId = newSamitiId;
    thread.isNative = false;
    return this.threadRepository.save(thread);
  }

  /**
   * Increment post count
   */
  async incrementPostCount(threadId: string): Promise<void> {
    await this.threadRepository.increment({ id: threadId }, 'postCount', 1);
  }

  /**
   * Update vote counts
   */
  async updateVoteCounts(
    threadId: string,
    forCount: number,
    againstCount: number,
    abstainCount: number,
  ): Promise<void> {
    await this.threadRepository.update(threadId, {
      voteForCount: forCount,
      voteAgainstCount: againstCount,
      voteAbstainCount: abstainCount,
    });
  }
}

