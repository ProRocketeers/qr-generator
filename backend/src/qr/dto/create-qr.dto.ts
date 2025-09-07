import { IsIn, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateQrDto {
  @ApiProperty({ description: 'Data (payload) that will be encoded into the QR', example: 'Hello World' })
  @IsString()
  data!: string

  @ApiPropertyOptional({ enum: ['image', 'base64'], description: 'Optional response format' })
  @IsOptional()
  @IsIn(['image', 'base64'])
  output?: 'image' | 'base64' = 'base64'
}