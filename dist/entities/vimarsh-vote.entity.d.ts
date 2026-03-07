import { VoteType } from './vote-type.enum';
import { VimarshThread } from './vimarsh-thread.entity';
export declare class VimarshVote {
    id: string;
    threadId: string;
    username: string;
    voteType: VoteType;
    votedAt: Date;
    thread: VimarshThread;
}
