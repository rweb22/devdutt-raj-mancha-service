import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { VimarshStatus } from './vimarsh-status.enum';
import { VimarshType } from './vimarsh-type.enum';
import { VimarshPost } from './vimarsh-post.entity';
import { VimarshVote } from './vimarsh-vote.entity';
import { VimarshPoll } from './vimarsh-poll.entity';

@Entity('vimarsh_threads')
export class VimarshThread {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ name: 'samiti_id', type: 'uuid' })
  samitiId: string;

  @Column({ name: 'current_samiti_id', type: 'uuid' })
  currentSamitiId: string;

  @Column({ name: 'is_native', type: 'boolean', default: true })
  isNative: boolean;

  @Column({ name: 'author_username', type: 'varchar', length: 50 })
  authorUsername: string;

  @Column({ name: 'assigned_by_username', type: 'varchar', length: 50, nullable: true })
  assignedByUsername: string;

  @Column({
    type: 'enum',
    enum: VimarshStatus,
    default: VimarshStatus.DRAFT,
  })
  status: VimarshStatus;

  @Column({
    name: 'vimarsh_type',
    type: 'enum',
    enum: VimarshType,
    default: VimarshType.PROPOSAL,
  })
  vimarshType: VimarshType;

  @Column({ name: 'current_draft_number', type: 'int', default: 1 })
  currentDraftNumber: number;

  @Column({ name: 'post_count', type: 'int', default: 0 })
  postCount: number;

  @Column({ name: 'is_locked', type: 'boolean', default: false })
  isLocked: boolean;

  @Column({ name: 'gazette_id', type: 'uuid', nullable: true })
  gazetteId: string;

  @Column({ name: 'vote_for_count', type: 'int', default: 0 })
  voteForCount: number;

  @Column({ name: 'vote_against_count', type: 'int', default: 0 })
  voteAgainstCount: number;

  @Column({ name: 'vote_abstain_count', type: 'int', default: 0 })
  voteAbstainCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'voting_started_at', type: 'timestamp', nullable: true })
  votingStartedAt: Date;

  @Column({ name: 'voting_ended_at', type: 'timestamp', nullable: true })
  votingEndedAt: Date;

  // Relations
  @OneToMany(() => VimarshPost, (post) => post.thread)
  posts: VimarshPost[];

  @OneToMany(() => VimarshVote, (vote) => vote.thread)
  votes: VimarshVote[];

  @OneToMany(() => VimarshPoll, (poll) => poll.thread)
  polls: VimarshPoll[];
}

