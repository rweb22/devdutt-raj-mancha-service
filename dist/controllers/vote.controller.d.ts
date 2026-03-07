import { VoteService } from '../services/vote.service';
import { CastVoteDto } from '../dto/cast-vote.dto';
import { VimarshVote } from '../entities';
export declare class VoteController {
    private readonly voteService;
    constructor(voteService: VoteService);
    castVote(threadId: string, dto: CastVoteDto): Promise<VimarshVote>;
    getVotes(threadId: string): Promise<VimarshVote[]>;
    countVotes(threadId: string): Promise<{
        forCount: number;
        againstCount: number;
        abstainCount: number;
        total: number;
    }>;
    hasVoted(threadId: string, username: string): Promise<{
        hasVoted: boolean;
    }>;
}
