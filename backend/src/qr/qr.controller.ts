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

@ApiTags('QR')
@Controller('api/v1/qr')
export class QrController {
  constructor(
    private readonly qrEntityService: QrEntityService,
    private readonly qrCodeService: QrCodeService,
  ) {}

  @Get('/svg')
  @ApiOperation({
    summary: 'Get QR code as SVG',
    description:
      'Generates a QR code SVG based on the provided data without storing it.',
  })
  @ApiProduces('image/svg+xml')
  @ApiOkResponse({ description: 'Get QR code as SVG' })
  async getSvgFromData(@Body() dto: CreateQrRequestDto, @Res() res: Response) {
    const { type, data } = dto
    const svg = await this.qrCodeService.create(type, data)

    res.type('image/svg+xml; charset=utf-8')

    return res.send(cleanSvg(svg))
  }

  @Get('/png')
  @ApiOperation({
    summary: 'Get QR code as PNG',
    description:
      'Generates a QR code PNG image based on the provided data without storing it.',
  })
  @ApiProduces('image/png')
  @ApiOkResponse({ description: 'Get QR code as PNG' })
  async getPngFromData(@Body() dto: CreateQrRequestDto, @Res() res: Response) {
    const { type, data } = dto
    const svg = await this.qrCodeService.create(type, data)
    const pngBuffer = await svgToPng(cleanSvg(svg))

    res.type('image/png')

    return res.send(pngBuffer)
  }

  @Get('/base64')
  @ApiOperation({
    summary: 'Get QR code as Base64-encoded SVG',
    description:
      'Generates a QR code SVG encoded in Base64 format based on the provided data without storing it.',
  })
  @ApiProduces('text/plain')
  @ApiOkResponse({ description: 'Get QR code as Base64-encoded SVG' })
  async getBase64FromData(
    @Body() dto: CreateQrRequestDto,
    @Res() res: Response,
  ) {
    const { type, data } = dto
    const svg = await this.qrCodeService.create(type, data)
    const base64 = svgToBase64(cleanSvg(svg))

    res.type('text/plain; charset=utf-8')

    return res.send(base64)
  }
}
