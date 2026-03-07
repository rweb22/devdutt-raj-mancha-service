import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { VimarshThread } from './vimarsh-thread.entity';
import { VimarshPollVote } from './vimarsh-poll-vote.entity';

export enum PollType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

@Entity('vimarsh_polls')
export class VimarshPoll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'thread_id', type: 'uuid' })
  threadId: string;

  @Column({ type: 'varchar', length: 500 })
  question: string;

  @Column({
    name: 'poll_type',
    type: 'enum',
    enum: PollType,
    default: PollType.SINGLE_CHOICE,
  })
  pollType: PollType;

  @Column({ type: 'jsonb' })
  options: string[];

  @Column({ type: 'jsonb', default: {} })
  results: Record<string, number>;

  @Column({ name: 'is_closed', type: 'boolean', default: false })
  isClosed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt: Date;

  // Relations
  @ManyToOne(() => VimarshThread, (thread) => thread.polls, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'thread_id' })
  thread: VimarshThread;

  @OneToMany(() => VimarshPollVote, (vote) => vote.poll)
  pollVotes: VimarshPollVote[];
}

