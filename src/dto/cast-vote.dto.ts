import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VoteType } from '../entities';

export class CastVoteDto {
  @ApiProperty({ description: 'Username of voter' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Vote type', enum: VoteType })
  @IsEnum(VoteType)
  voteType: VoteType;
}

