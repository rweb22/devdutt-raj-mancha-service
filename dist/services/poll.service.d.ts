import { Repository } from 'typeorm';
import { VimarshPoll, VimarshPollVote, PollType } from '../entities';
import { ThreadService } from './thread.service';
export declare class PollService {
    private pollRepository;
    private pollVoteRepository;
    private threadService;
    constructor(pollRepository: Repository<VimarshPoll>, pollVoteRepository: Repository<VimarshPollVote>, threadService: ThreadService);
    createPoll(threadId: string, question: string, options: string[], pollType?: PollType): Promise<VimarshPoll>;
    getPollById(id: string): Promise<VimarshPoll>;
    votePoll(pollId: string, username: string, selectedOptions: string[]): Promise<VimarshPollVote>;
    getPollResults(pollId: string): Promise<{
        question: string;
        results: Record<string, number>;
        totalVotes: number;
    }>;
    closePoll(pollId: string): Promise<VimarshPoll>;
    private updatePollResults;
}
