import { VimarshThread } from './vimarsh-thread.entity';
import { VimarshPollVote } from './vimarsh-poll-vote.entity';
export declare enum PollType {
    SINGLE_CHOICE = "SINGLE_CHOICE",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE"
}
export declare class VimarshPoll {
    id: string;
    threadId: string;
    question: string;
    pollType: PollType;
    options: string[];
    results: Record<string, number>;
    isClosed: boolean;
    createdAt: Date;
    closedAt: Date;
    thread: VimarshThread;
    pollVotes: VimarshPollVote[];
}
