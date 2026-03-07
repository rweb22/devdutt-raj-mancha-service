import { VimarshPoll } from './vimarsh-poll.entity';
export declare class VimarshPollVote {
    id: string;
    pollId: string;
    username: string;
    selectedOptions: string[];
    votedAt: Date;
    poll: VimarshPoll;
}
