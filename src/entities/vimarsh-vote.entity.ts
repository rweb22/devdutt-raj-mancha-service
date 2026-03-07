import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { VoteType } from './vote-type.enum';
import { VimarshThread } from './vimarsh-thread.entity';

@Entity('vimarsh_votes')
@Unique(['threadId', 'username'])
export class VimarshVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'thread_id', type: 'uuid' })
  threadId: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({
    name: 'vote_type',
    type: 'enum',
    enum: VoteType,
  })
  voteType: VoteType;

  @CreateDateColumn({ name: 'voted_at' })
  votedAt: Date;

  // Relations
  @ManyToOne(() => VimarshThread, (thread) => thread.votes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'thread_id' })
  thread: VimarshThread;
}

