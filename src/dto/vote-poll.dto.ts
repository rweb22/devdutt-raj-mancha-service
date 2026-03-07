import { IsString, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VotePollDto {
  @ApiProperty({ description: 'Username of voter' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Selected options', type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  selectedOptions: string[];
}

