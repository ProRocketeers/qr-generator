import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common'
import {
  ApiTags,
  ApiProduces,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger'
import { Response } from 'express'
import svgToPng from '@backend/helpers/svgToPng'
import svgToBase64 from '@backend/helpers/svgToBase64'
import cleanSvg from '@backend/helpers/cleanSvg'
import {
  CreateQrRequestDto,
} from '@backend/qr/dto/index.dto'
import { QrCodeService } from '@backend/qr/qrCode.service'

@ApiTags('QR')
@Controller('api/v1/qr')
export class QrController {
  constructor(
    private readonly qrCodeService: QrCodeService,
  ) {}

  @Post('/svg')
  @ApiOperation({
    summary: 'Generate QR code as SVG',
    description:
      'Generates a QR code SVG based on the provided data without storing it.',
  })
  @ApiProduces('image/svg+xml')
  @ApiCreatedResponse({ description: 'QR code generated as SVG' })
  async getSvgFromData(@Body() dto: CreateQrRequestDto, @Res() res: Response) {
    const { type, data } = dto
    const svg = await this.qrCodeService.create(type, data)

    res.status(201).type('image/svg+xml; charset=utf-8')

    return res.send(cleanSvg(svg))
  }

  @Post('/png')
  @ApiOperation({
    summary: 'Generate QR code as PNG',
    description:
      'Generates a QR code PNG image based on the provided data without storing it.',
  })
  @ApiProduces('image/png')
  @ApiCreatedResponse({ description: 'QR code generated as PNG' })
  async getPngFromData(@Body() dto: CreateQrRequestDto, @Res() res: Response) {
    const { type, data } = dto
    const svg = await this.qrCodeService.create(type, data)
    const pngBuffer = await svgToPng(cleanSvg(svg))

    res.status(201).type('image/png')

    return res.send(pngBuffer)
  }

  @Post('/base64')
  @ApiOperation({
    summary: 'Generate QR code as Base64-encoded SVG',
    description:
      'Generates a QR code SVG encoded in Base64 format based on the provided data without storing it.',
  })
  @ApiProduces('text/plain')
  @ApiCreatedResponse({ description: 'QR code generated as Base64-encoded SVG' })
  async getBase64FromData(
    @Body() dto: CreateQrRequestDto,
    @Res() res: Response,
  ) {
    const { type, data } = dto
    const svg = await this.qrCodeService.create(type, data)
    const base64 = svgToBase64(cleanSvg(svg))

    res.status(201).type('text/plain; charset=utf-8')

    return res.send(base64)
  }
}
