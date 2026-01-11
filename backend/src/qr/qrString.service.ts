import { Injectable } from '@nestjs/common'
import { QrType } from '@backend/types'
import {
  encodeCall,
  encodeContact,
  encodeEmail,
  encodeEvent,
  encodeGeo,
  encodeLink,
  encodeOTPAuth,
  encodePaymentSEPA,
  encodePaymentSPD,
  encodeSms,
  encodeText,
  encodeWifi,
} from '@backend/encoders'

@Injectable()
export class QrStringService {
  public encode<T extends QrType>(type: T, data: unknown): string {
    const encoder = this.QrTypeMapper[type]

    if (encoder) {
      return encoder(data)
    }

    throw new Error(`Unsupported QR type: ${type as unknown as string}`)
  }

  private QrTypeMapper: Record<QrType, (data: any) => string> = {
    [QrType.Text]: encodeText,
    [QrType.Link]: encodeLink,
    [QrType.Email]: encodeEmail,
    [QrType.Call]: encodeCall,
    [QrType.SMS]: encodeSms,
    [QrType.WiFi]: encodeWifi,
    [QrType.Geo]: encodeGeo,
    [QrType.Event]: encodeEvent,
    [QrType.Contact]: encodeContact,
    [QrType.PaymentSEPA]: encodePaymentSEPA,
    [QrType.PaymentSPD]: encodePaymentSPD,
    [QrType.OTPAuth]: encodeOTPAuth,
  }
}
