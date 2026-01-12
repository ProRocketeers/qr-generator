import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOkResponse,
  ApiProduces,
  ApiParam,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger'
import { Response } from 'express'
import { QrEntityService } from '@backend/qr/qrEntity.service'
import svgToPng from '@backend/helpers/svgToPng'
import svgToBase64 from '@backend/helpers/svgToBase64'
import cleanSvg from '@backend/helpers/cleanSvg'
import {
  CreateQrRequestDto,
  CreateQrResponseDto,
} from '@backend/qr/dto/index.dto'
import { QrCodeService } from '@backend/qr/qrCode.service'

@ApiTags('QR - Entity')
@Controller('api/v1/qr')
export class QrEntityController {
  constructor(
    private readonly qrEntityService: QrEntityService,
    private readonly qrCodeService: QrCodeService,
  ) {}
  @Post()
  @ApiOperation({
    summary: 'Create new QR code',
    description: 'Creates a new QR code entity with the provided data.',
  })
  @ApiCreatedResponse({
    description: 'Create new QR code',
    type: CreateQrResponseDto,
  })
  async create(@Body() dto: CreateQrRequestDto, @Res() res: Response) {
    const { type, data } = dto
    const { code } = await this.qrEntityService.create(type, data)

    res.setHeader('X-QR-Code-ID', code)

    return res.status(201).json({ code })
  }

  @Get(':code')
  @ApiOperation({
    summary: 'Get existing QR code',
    description: 'Returns the QR code entity identified by the provided code.',
  })
  @ApiParam({
    name: 'code',
    description: 'ID kódu (např. QRAB12)',
    example: 'QRAB12',
  })
  @ApiProduces('application/json')
  @ApiOkResponse({
    description: 'Get existing QR code entity',
    type: CreateQrResponseDto,
  })
  async get(@Param('code') code: string, @Res() res: Response) {
    const { type, data, createdAt, updatedAt } =
      await this.qrEntityService.findOne(code)

    res.setHeader('X-QR-Code-ID', code)

    return res.json({
      code,
      type,
      data,
      createdAt,
      updatedAt,
    })
  }

  @Put(':code')
  @ApiOperation({
    summary: 'Update existing QR code',
    description: 'Updates the QR code entity identified by the provided code.',
  })
  @ApiParam({
    name: 'code',
    description: 'ID kódu (např. QRAB12)',
    example: 'QRAB12',
  })
  @ApiOkResponse({
    description: 'Update existing QR code entity',
    type: CreateQrResponseDto,
  })
  async update(
    @Param('code') code: string,
    @Body() dto: CreateQrRequestDto,
    @Res() res: Response,
  ) {
    const { type, data } = dto
    const { createdAt, updatedAt } = await this.qrEntityService.update(
      code,
      type,
      data,
    )

    res.setHeader('X-QR-Code-ID', code)

    return res.json({
      code,
      type,
      data,
      createdAt,
      updatedAt,
    })
  }

  @Delete(':code')
  @ApiOperation({
    summary: 'Delete existing QR code',
    description: 'Deletes the QR code entity identified by the provided code.',
  })
  @ApiParam({
    name: 'code',
    description: 'ID kódu (např. QRAB12)',
    example: 'QRAB12',
  })
  @ApiOkResponse({ description: 'Delete existing QR code' })
  async delete(@Param('code') code: string, @Res() res: Response) {
    await this.qrEntityService.delete(code)

    res.setHeader('X-QR-Code-ID', code)

    return res.status(204).send()
  }

  @Get(':code/svg')
  @ApiParam({
    name: 'code',
    description: 'ID kódu (např. QRAB12)',
    example: 'QRAB12',
  })
  @ApiProduces('image/svg+xml')
  @ApiOperation({
    summary: 'Get QR code as SVG',
    description: 'Returns the QR code SVG from existing QR code data.',
  })
  @ApiOkResponse({ description: 'Get existing QR code as SVG' })
  async getSvg(@Param('code') code: string, @Res() res: Response) {
    const { svg } = await this.qrEntityService.findOne(code)

    res.type('image/svg+xml; charset=utf-8')
    res.setHeader('X-QR-Code-ID', code)

    return res.send(cleanSvg(svg))
  }

  @Get(':code/png')
  @ApiOperation({
    summary: 'Get QR code as PNG',
    description:
      'Returns the QR code as a PNG image generated from existing QR code data.',
  })
  @ApiParam({
    name: 'code',
    description: 'ID kódu (např. QRAB12)',
    example: 'QRAB12',
  })
  @ApiProduces('image/png')
  @ApiOkResponse({ description: 'Get existing QR code as PNG' })
  async getPng(@Param('code') code: string, @Res() res: Response) {
    const { svg } = await this.qrEntityService.findOne(code)
    const pngBuffer = await svgToPng(cleanSvg(svg))

    res.type('image/png')
    res.setHeader('X-QR-Code-ID', code)

    return res.send(pngBuffer)
  }

  @Get(':code/base64')
  @ApiOperation({
    summary: 'Get QR code as Base64-encoded SVG',
    description:
      'Returns the QR code SVG encoded in Base64 format from existing QR code data.',
  })
  @ApiParam({
    name: 'code',
    description: 'ID kódu (např. QRAB12)',
    example: 'QRAB12',
  })
  @ApiProduces('text/plain')
  @ApiOkResponse({ description: 'Get existing QR code as Base64-encoded SVG' })
  async getBase64(@Param('code') code: string, @Res() res: Response) {
    const { svg } = await this.qrEntityService.findOne(code)
    const base64 = svgToBase64(cleanSvg(svg))

    res.type('text/plain; charset=utf-8')
    res.setHeader('X-QR-Code-ID', code)

    return res.send(base64)
  }
}
