import {
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { QrType } from '@backend/types'

export class CreateQrRequestDto {
  @ApiProperty({
    enum: QrType,
    enumName: 'QrType',
    description: 'Type of the QR code',
    example: QrType.Text,
  })
  @IsEnum(QrType)
  @IsOptional()
  type: QrType = QrType.Text

  @ApiProperty({
    description: 'Payload to be encoded',
    oneOf: [
      {
        type: 'string',
        description: 'Text payload (for QrType.Text)',
        example: 'Hello World',
      },
      {
        type: 'object',
        description: 'Object payload (for URL/Email/... types)',
        example: { url: 'https://www.prorocketeers.com/' },
      },
    ],
  })
  @ValidateIf((o) => o.type === QrType.Text)
  @IsString()
  @ValidateIf((o) => o.type !== QrType.Text)
  @IsObject()
  data!: unknown
}

export class CreateQrResponseDto {
  @ApiProperty({ description: 'ID of the QR code', example: 'QRAB12' })
  code!: string

  @ApiProperty({ description: 'Type of the QR code', example: 'QR' })
  type!: string

  @ApiProperty({
    description: 'Data (payload) encoded in the QR code',
    example: 'Hello World',
  })
  data!: string

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt!: Date

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt!: Date
}
