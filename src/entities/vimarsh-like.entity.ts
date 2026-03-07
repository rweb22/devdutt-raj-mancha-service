import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { VimarshPost } from './vimarsh-post.entity';

@Entity('vimarsh_likes')
@Unique(['postId', 'username'])
export class VimarshLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_id', type: 'uuid' })
  postId: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relations
  @ManyToOne(() => VimarshPost, (post) => post.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: VimarshPost;
}

