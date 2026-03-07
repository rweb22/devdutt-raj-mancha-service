import { Repository } from 'typeorm';
import { VimarshVote, VoteType } from '../entities';
import { ThreadService } from './thread.service';
export declare class VoteService {
    private voteRepository;
    private threadService;
    constructor(voteRepository: Repository<VimarshVote>, threadService: ThreadService);
    castVote(threadId: string, username: string, voteType: VoteType): Promise<VimarshVote>;
    getVotes(threadId: string): Promise<VimarshVote[]>;
    countVotes(threadId: string): Promise<{
        forCount: number;
        againstCount: number;
        abstainCount: number;
        total: number;
    }>;
    hasVoted(threadId: string, username: string): Promise<boolean>;
    private updateThreadVoteCounts;
}
