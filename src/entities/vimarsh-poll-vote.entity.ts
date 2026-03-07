import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { VimarshPoll } from './vimarsh-poll.entity';

@Entity('vimarsh_poll_votes')
@Unique(['pollId', 'username'])
export class VimarshPollVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'poll_id', type: 'uuid' })
  pollId: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({ name: 'selected_options', type: 'jsonb' })
  selectedOptions: string[];

  @CreateDateColumn({ name: 'voted_at' })
  votedAt: Date;

  // Relations
  @ManyToOne(() => VimarshPoll, (poll) => poll.pollVotes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'poll_id' })
  poll: VimarshPoll;
}

