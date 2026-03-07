import { PollService } from '../services/poll.service';
import { CreatePollDto } from '../dto/create-poll.dto';
import { VotePollDto } from '../dto/vote-poll.dto';
import { VimarshPoll, VimarshPollVote } from '../entities';
export declare class PollController {
    private readonly pollService;
    constructor(pollService: PollService);
    createPoll(threadId: string, dto: CreatePollDto): Promise<VimarshPoll>;
    getPollById(id: string): Promise<VimarshPoll>;
    votePoll(id: string, dto: VotePollDto): Promise<VimarshPollVote>;
    getPollResults(id: string): Promise<{
        question: string;
        results: Record<string, number>;
        totalVotes: number;
    }>;
    closePoll(id: string): Promise<VimarshPoll>;
}
