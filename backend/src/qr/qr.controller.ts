import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { QrService } from './qr.service';
import { CreateQrDto } from './dto/create-qr.dto';

@Controller('qr')
export class QrController {
  constructor(private readonly service: QrService) {}

  @Post()
  async create(@Body() dto: CreateQrDto, @Res() res: Response) {
    const result = await this.service.create(dto.data);
    if (dto.output === 'image') {
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('X-QR-Code', result.code);
      return res.send(result.buffer);
    }
    return res.json({
      id: result.code,
      base64: result.base64,
      dataUri: `data:image/png;base64,${result.base64}`,
    });
  }

  @Get(':code')
  async get(@Param('code') code: string, @Query('format') format: string, @Res() res: Response) {
    const e = await this.service.findOne(code);
    if (format === 'png') {
      res.setHeader('Content-Type', 'image/png');
      return res.send(Buffer.from(e.base64, 'base64'));
    }
    if (format === 'base64') {
      return res.send(e.base64);
    }
    return res.json({
      id: e.code,
      payload: e.payload,
      createdAt: e.createdAt,
      dataUri: `data:image/png;base64,${e.base64}`,
    });
  }
}