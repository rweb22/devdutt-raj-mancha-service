import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PostType } from './post-type.enum';
import { VimarshThread } from './vimarsh-thread.entity';
import { VimarshLike } from './vimarsh-like.entity';

@Entity('vimarsh_posts')
export class VimarshPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'thread_id', type: 'uuid' })
  threadId: string;

  @Column({ name: 'author_username', type: 'varchar', length: 50 })
  authorUsername: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    name: 'post_type',
    type: 'enum',
    enum: PostType,
    default: PostType.NORMAL,
  })
  postType: PostType;

  @Column({ name: 'draft_number', type: 'int', nullable: true })
  draftNumber: number;

  @Column({ name: 'content_hash', type: 'varchar', length: 64 })
  contentHash: string;

  @Column({ name: 'previous_hash', type: 'varchar', length: 64, nullable: true })
  previousHash: string | null;

  @Column({ name: 'post_number', type: 'int' })
  postNumber: number;

  @Column({ name: 'reply_to_id', type: 'uuid', nullable: true })
  replyToId: string;

  @Column({ name: 'like_count', type: 'int', default: 0 })
  likeCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => VimarshThread, (thread) => thread.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'thread_id' })
  thread: VimarshThread;

  @OneToMany(() => VimarshLike, (like) => like.post)
  likes: VimarshLike[];

  @ManyToOne(() => VimarshPost, { nullable: true })
  @JoinColumn({ name: 'reply_to_id' })
  replyTo: VimarshPost;
}

