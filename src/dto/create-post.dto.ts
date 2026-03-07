import { IsString, IsEnum, IsOptional, IsInt, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostType } from '../entities';

export class CreatePostDto {
  @ApiProperty({ description: 'Post content' })
  @IsString()
  content: string;

  @ApiProperty({ description: 'Author username' })
  @IsString()
  authorUsername: string;

  @ApiPropertyOptional({ description: 'Post type', enum: PostType })
  @IsEnum(PostType)
  @IsOptional()
  postType?: PostType;

  @ApiPropertyOptional({ description: 'Draft number (for DRAFT posts)' })
  @IsInt()
  @IsOptional()
  draftNumber?: number;

  @ApiPropertyOptional({ description: 'ID of post being replied to' })
  @IsUUID()
  @IsOptional()
  replyToId?: string;
}

