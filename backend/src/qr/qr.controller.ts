import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiProduces, ApiParam, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { CreateQrDto } from '@backend/qr/dto/create-qr.dto'
import { QrService } from '@backend/qr/qr.service'

@ApiTags('QR')
@Controller('api/v1/qr')
export class QrController {
  constructor(private readonly service: QrService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Vytvoří nový QR kód a vrátí metadata nebo PNG.' })
  @ApiProduces('application/json')
  async create(@Body() dto: CreateQrDto, @Res() res: Response) {
    const result = await this.service.create(dto.data)

    if (dto.output === 'image') {
      res.setHeader('Content-Type', 'image/png')
      res.setHeader('X-QR-Code', result.code)
      return res.send(result.buffer)
    }

    return res.json({
      id: result.code,
      base64: result.base64,
    })
  }

  @Get(':code')
  @ApiParam({ name: 'code', description: 'ID kódu (např. QRAB12)' })
  @ApiQuery({ name: 'format', required: false, enum: ['img', 'base64'], description: 'Formát odpovědi' })
  @ApiOkResponse({ description: 'Načtení existujícího QR kódu' })
  async get(@Param('code') code: string, @Query('format') output: string, @Res() res: Response) {
    const e = await this.service.findOne(code)

    if (output === 'img') {
      res.setHeader('Content-Type', 'image/png')
      return res.send(Buffer.from(e.base64, 'base64'))
    }

    if (output === 'base64') {
      return res.send(e.base64)
    }

    return res.json({
      id: e.code,
      payload: e.payload,
      createdAt: e.createdAt,
    })
  }
}