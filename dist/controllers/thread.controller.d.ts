import { ThreadService } from '../services/thread.service';
import { CreateThreadDto } from '../dto/create-thread.dto';
import { VimarshThread } from '../entities';
export declare class ThreadController {
    private readonly threadService;
    constructor(threadService: ThreadService);
    createThread(dto: CreateThreadDto): Promise<VimarshThread>;
    getThreadById(id: string): Promise<VimarshThread>;
    getThreadsBySamiti(samitiId: string): Promise<VimarshThread[]>;
    moveToDeliberation(id: string): Promise<VimarshThread>;
    moveToVoting(id: string): Promise<VimarshThread>;
    finalizeVoting(id: string): Promise<VimarshThread>;
    archiveThread(id: string): Promise<VimarshThread>;
    lockThread(id: string): Promise<VimarshThread>;
    unlockThread(id: string): Promise<VimarshThread>;
    escalateToSamiti(id: string, newSamitiId: string): Promise<VimarshThread>;
}
