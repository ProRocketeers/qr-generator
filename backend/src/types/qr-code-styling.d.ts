declare module 'qr-code-styling' {
  export interface QRCodeStylingOptions {
    width?: number
    height?: number
    type?: 'png' | 'svg'
    data: string
    margin?: number
    qrOptions?: any
    image?: string
    imageOptions?: any
    dotsOptions?: any
    backgroundOptions?: any
    cornersSquareOptions?: any
    cornersDotOptions?: any
  }
  export default class QRCodeStyling {
    constructor(options: QRCodeStylingOptions)
    getRawData(type: 'png' | 'svg'): Promise<Blob | Buffer | Uint8Array>
  }
}