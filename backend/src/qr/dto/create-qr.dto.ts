import { IsIn, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export type OutputType = 'png' | 'svg' | 'dataUri' | 'base64' | 'json'

export class CreateQrDto {
  @ApiProperty({ description: 'Data (payload) that will be encoded into the QR', example: 'Hello World' })
  @IsString()
  data!: string

  @ApiPropertyOptional({ enum: ['png', 'svg', 'dataUri', 'base64', 'json'], description: 'Optional response format' })
  @IsOptional()
  output?: OutputType
}