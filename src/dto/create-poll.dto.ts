import { IsString, IsArray, IsEnum, IsOptional, MaxLength, ArrayMinSize } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PollType } from '../entities';

export class CreatePollDto {
  @ApiProperty({ description: 'Poll question', maxLength: 500 })
  @IsString()
  @MaxLength(500)
  question: string;

  @ApiProperty({ description: 'Poll options (minimum 2)', type: [String] })
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  options: string[];

  @ApiPropertyOptional({ description: 'Poll type', enum: PollType })
  @IsEnum(PollType)
  @IsOptional()
  pollType?: PollType;
}

