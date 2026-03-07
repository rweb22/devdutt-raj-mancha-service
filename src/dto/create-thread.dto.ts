import { IsString, IsUUID, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VimarshType } from '../entities';

export class CreateThreadDto {
  @ApiProperty({ description: 'Thread title', maxLength: 500 })
  @IsString()
  @MaxLength(500)
  title: string;

  @ApiProperty({ description: 'Samiti ID where thread is created' })
  @IsUUID()
  samitiId: string;

  @ApiProperty({ description: 'Author username' })
  @IsString()
  authorUsername: string;

  @ApiPropertyOptional({ description: 'Vimarsh type', enum: VimarshType })
  @IsEnum(VimarshType)
  @IsOptional()
  vimarshType?: VimarshType;

  @ApiPropertyOptional({ description: 'Username who assigned this thread' })
  @IsString()
  @IsOptional()
  assignedByUsername?: string;
}

