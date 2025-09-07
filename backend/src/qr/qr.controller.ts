import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiProduces, ApiParam, ApiQuery, ApiCreatedResponse } from '@nestjs/swagger'
import { Response } from 'express'
import { CreateQrDto, OutputType } from '@backend/qr/dto/create-qr.dto'
import { QrCodeStyleService } from '@backend/qr/qr.service'

@ApiTags('QR')
@Controller('api/v1/qr')
export class QrController {
  constructor(private readonly service: QrCodeStyleService) {}

  private async svgToPng(svg: string): Promise<Buffer> {
    try {
      const mod: any = await import('sharp')
      const sharpFn = mod.default || mod
      return await sharpFn(Buffer.from(svg, 'utf8')).png().toBuffer()
    } catch (e) {
      throw new Error('PNG conversion failed: ' + (e as Error).message)
    }
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create new QR code' })
  async create(@Body() dto: CreateQrDto, @Res() res: Response) {
    const { data, output = 'svg' } = dto
    const { code } = await this.service.create(data)

    return this.get(code, output, res)
  }

  @Get(':code')
  @ApiParam({ name: 'code', description: 'ID kódu (např. QRAB12)' })
  @ApiQuery({
    name: 'output',
    required: false,
    enum: ['png', 'svg', 'dataUri', 'base64', 'json'],
    description: 'Optional response format',
  })
  @ApiProduces('application/json', 'image/svg+xml', 'image/png', 'text/plain')
  @ApiOkResponse({ description: 'Get existing QR code' })
  async get(@Param('code') code: string, @Query('output') output: OutputType, @Res() res: Response) {
    const { data, svg, createdAt = new Date() } = await this.service.findOne(code)

    const base64 = Buffer.from(svg, 'utf8').toString('base64')
    res.setHeader('X-QR-Code-ID', code)

    if (output === 'svg') {
      res.type('image/svg+xml; charset=utf-8')
      return res.send(svg)
    }

    if (output === 'png') {
      const pngBuffer = await this.svgToPng(svg)
      res.type('image/png')
      return res.send(pngBuffer)
    }

    if (output === 'base64') {
      res.type('text/plain; charset=utf-8')
      return res.send(base64)
    }

    if (output === 'dataUri') {
      return res.json({ id: code, dataUri: 'data:image/svg+xml;base64,' + base64 })
    }

    // default output === JSON
    return res.json({
      id: code,
      svg,
      data,
      base64,
      createdAt,
    })
  }
}