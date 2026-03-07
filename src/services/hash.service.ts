import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class HashService {
  /**
   * Generate SHA-256 hash of content
   */
  generateHash(content: string): string {
    return createHash('sha256').update(content).digest('hex');
  }

  /**
   * Generate hash for a post including metadata
   */
  generatePostHash(
    threadId: string,
    authorUsername: string,
    content: string,
    postNumber: number,
    previousHash: string | null,
  ): string {
    const data = `${threadId}|${authorUsername}|${content}|${postNumber}|${previousHash || ''}`;
    return this.generateHash(data);
  }

  /**
   * Verify hash chain integrity
   */
  verifyHashChain(
    contentHash: string,
    threadId: string,
    authorUsername: string,
    content: string,
    postNumber: number,
    previousHash: string | null,
  ): boolean {
    const expectedHash = this.generatePostHash(
      threadId,
      authorUsername,
      content,
      postNumber,
      previousHash,
    );
    return contentHash === expectedHash;
  }
}

