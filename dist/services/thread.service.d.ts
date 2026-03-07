import { Repository } from 'typeorm';
import { VimarshThread, VimarshType } from '../entities';
export declare class ThreadService {
    private threadRepository;
    constructor(threadRepository: Repository<VimarshThread>);
    createThread(title: string, samitiId: string, authorUsername: string, vimarshType?: VimarshType, assignedByUsername?: string): Promise<VimarshThread>;
    getThreadById(id: string): Promise<VimarshThread>;
    getThreadsBySamiti(samitiId: string): Promise<VimarshThread[]>;
    moveToDeliberation(threadId: string): Promise<VimarshThread>;
    moveToVoting(threadId: string): Promise<VimarshThread>;
    finalizeVoting(threadId: string): Promise<VimarshThread>;
    archiveThread(threadId: string): Promise<VimarshThread>;
    lockThread(threadId: string): Promise<VimarshThread>;
    unlockThread(threadId: string): Promise<VimarshThread>;
    escalateToSamiti(threadId: string, newSamitiId: string): Promise<VimarshThread>;
    incrementPostCount(threadId: string): Promise<void>;
    updateVoteCounts(threadId: string, forCount: number, againstCount: number, abstainCount: number): Promise<void>;
}
