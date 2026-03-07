export declare class HashService {
    generateHash(content: string): string;
    generatePostHash(threadId: string, authorUsername: string, content: string, postNumber: number, previousHash: string | null): string;
    verifyHashChain(contentHash: string, threadId: string, authorUsername: string, content: string, postNumber: number, previousHash: string | null): boolean;
}
