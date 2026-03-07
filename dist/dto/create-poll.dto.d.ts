import { PollType } from '../entities';
export declare class CreatePollDto {
    question: string;
    options: string[];
    pollType?: PollType;
}
