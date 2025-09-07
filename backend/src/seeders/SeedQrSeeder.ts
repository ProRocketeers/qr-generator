import '../polyfills/dom-env'
import { Seeder } from '@mikro-orm/seeder'
import { EntityManager } from '@mikro-orm/postgresql'
import { QrEntity } from '@backend/qr/qr.entity'

export class SeedQrSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const code = 'QRSEED'
    const existing = await em.findOne(QrEntity, { code })
    if (existing) return

    const data = 'https://www.prorocketeers.com/'
    const svg = `
      <?xml version="1.0" standalone="no"?>
        <svg xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <defs>
            <clipPath id="clip-path-background-color-2">
              <rect x="0" y="0" width="300" height="300"/>
            </clipPath>
            <clipPath id="clip-path-dot-color-2">
              <path d="M 91 19v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,95.5,23.5)"/>
              <rect x="100" y="19" width="9" height="9" transform="rotate(0,104.5,23.5)"/>
              <path d="M 109 19v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,113.5,23.5)"/>
              <path d="M 154 19v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,158.5,23.5)"/>
              <rect x="163" y="19" width="9" height="9" transform="rotate(0,167.5,23.5)"/>
              <rect x="172" y="19" width="9" height="9" transform="rotate(0,176.5,23.5)"/>
              <path d="M 181 19v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,185.5,23.5)"/>
              <rect x="91" y="28" width="9" height="9" transform="rotate(0,95.5,32.5)"/>
              <rect x="100" y="28" width="9" height="9" transform="rotate(0,104.5,32.5)"/>
              <path d="M 118 28v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,122.5,32.5)"/>
              <path d="M 127 28v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,131.5,32.5)"/>
              <rect x="163" y="28" width="9" height="9" transform="rotate(0,167.5,32.5)"/>
              <path d="M 190 28v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,194.5,32.5)"/>
              <path d="M 91 37v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,95.5,41.5)"/>
              <path d="M 100 37v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,104.5,41.5)"/>
              <path d="M 127 37v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,131.5,41.5)"/>
              <path d="M 154 37v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,158.5,41.5)"/>
              <rect x="163" y="37" width="9" height="9" transform="rotate(0,167.5,41.5)"/>
              <path d="M 190 37v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,194.5,41.5)"/>
              <path d="M 199 37v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,203.5,41.5)"/>
              <path d="M 109 46v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,113.5,50.5)"/>
              <path d="M 118 46v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,122.5,50.5)"/>
              <rect x="163" y="46" width="9" height="9" transform="rotate(0,167.5,50.5)"/>
              <path d="M 172 46v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,176.5,50.5)"/>
              <path d="M 199 46v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,203.5,50.5)"/>
              <path d="M 91 55v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,95.5,59.5)"/>
              <rect x="100" y="55" width="9" height="9" transform="rotate(0,104.5,59.5)"/>
              <rect x="109" y="55" width="9" height="9" transform="rotate(0,113.5,59.5)"/>
              <rect x="118" y="55" width="9" height="9" transform="rotate(0,122.5,59.5)"/>
              <path d="M 145 55v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,149.5,59.5)"/>
              <rect x="154" y="55" width="9" height="9" transform="rotate(0,158.5,59.5)"/>
              <rect x="163" y="55" width="9" height="9" transform="rotate(0,167.5,59.5)"/>
              <path d="M 172 55v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,176.5,59.5)"/>
              <circle cx="194.5" cy="59.5" r="4.5" transform="rotate(0,194.5,59.5)"/>
              <path d="M 118 64v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,122.5,68.5)"/>
              <path d="M 127 64v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,131.5,68.5)"/>
              <path d="M 154 64v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,158.5,68.5)"/>
              <rect x="163" y="64" width="9" height="9" transform="rotate(0,167.5,68.5)"/>
              <path d="M 181 64v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,185.5,68.5)"/>
              <circle cx="95.5" cy="77.5" r="4.5" transform="rotate(0,95.5,77.5)"/>
              <circle cx="113.5" cy="77.5" r="4.5" transform="rotate(0,113.5,77.5)"/>
              <rect x="127" y="73" width="9" height="9" transform="rotate(0,131.5,77.5)"/>
              <circle cx="149.5" cy="77.5" r="4.5" transform="rotate(0,149.5,77.5)"/>
              <rect x="163" y="73" width="9" height="9" transform="rotate(0,167.5,77.5)"/>
              <rect x="181" y="73" width="9" height="9" transform="rotate(0,185.5,77.5)"/>
              <circle cx="203.5" cy="77.5" r="4.5" transform="rotate(0,203.5,77.5)"/>
              <path d="M 127 82v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,131.5,86.5)"/>
              <path d="M 136 82v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,140.5,86.5)"/>
              <path d="M 154 82v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,158.5,86.5)"/>
              <path d="M 163 82v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,167.5,86.5)"/>
              <path d="M 181 82v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,185.5,86.5)"/>
              <path d="M 190 82v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,194.5,86.5)"/>
              <path d="M 19 91v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,23.5,95.5)"/>
              <path d="M 46 91v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,50.5,95.5)"/>
              <rect x="55" y="91" width="9" height="9" transform="rotate(0,59.5,95.5)"/>
              <rect x="64" y="91" width="9" height="9" transform="rotate(0,68.5,95.5)"/>
              <rect x="73" y="91" width="9" height="9" transform="rotate(0,77.5,95.5)"/>
              <rect x="82" y="91" width="9" height="9" transform="rotate(0,86.5,95.5)"/>
              <rect x="91" y="91" width="9" height="9" transform="rotate(0,95.5,95.5)"/>
              <path d="M 100 91v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,104.5,95.5)"/>
              <path d="M 118 91v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,122.5,95.5)"/>
              <rect x="136" y="91" width="9" height="9" transform="rotate(0,140.5,95.5)"/>
              <circle cx="176.5" cy="95.5" r="4.5" transform="rotate(0,176.5,95.5)"/>
              <rect x="190" y="91" width="9" height="9" transform="rotate(0,194.5,95.5)"/>
              <rect x="199" y="91" width="9" height="9" transform="rotate(0,203.5,95.5)"/>
              <path d="M 208 91v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,212.5,95.5)"/>
              <path d="M 235 91v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,239.5,95.5)"/>
              <path d="M 253 91v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,257.5,95.5)"/>
              <rect x="262" y="91" width="9" height="9" transform="rotate(0,266.5,95.5)"/>
              <path d="M 271 91v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,275.5,95.5)"/>
              <path d="M 19 100v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,23.5,104.5)"/>
              <path d="M 37 100v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,41.5,104.5)"/>
              <path d="M 55 100v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,59.5,104.5)"/>
              <path d="M 64 100v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,68.5,104.5)"/>
              <rect x="82" y="100" width="9" height="9" transform="rotate(0,86.5,104.5)"/>
              <rect x="91" y="100" width="9" height="9" transform="rotate(0,95.5,104.5)"/>
              <rect x="118" y="100" width="9" height="9" transform="rotate(0,122.5,104.5)"/>
              <rect x="136" y="100" width="9" height="9" transform="rotate(0,140.5,104.5)"/>
              <path d="M 163 100v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,167.5,104.5)"/>
              <path d="M 190 100v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,194.5,104.5)"/>
              <rect x="208" y="100" width="9" height="9" transform="rotate(0,212.5,104.5)"/>
              <path d="M 226 100v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,230.5,104.5)"/>
              <path d="M 235 100v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,239.5,104.5)"/>
              <rect x="253" y="100" width="9" height="9" transform="rotate(0,257.5,104.5)"/>
              <path d="M 262 100v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,266.5,104.5)"/>
              <path d="M 37 109v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,41.5,113.5)"/>
              <path d="M 46 109v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,50.5,113.5)"/>
              <path d="M 73 109v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,77.5,113.5)"/>
              <rect x="82" y="109" width="9" height="9" transform="rotate(0,86.5,113.5)"/>
              <path d="M 91 109v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,95.5,113.5)"/>
              <path d="M 109 109v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,113.5,113.5)"/>
              <rect x="118" y="109" width="9" height="9" transform="rotate(0,122.5,113.5)"/>
              <rect x="127" y="109" width="9" height="9" transform="rotate(0,131.5,113.5)"/>
              <rect x="136" y="109" width="9" height="9" transform="rotate(0,140.5,113.5)"/>
              <path d="M 154 109v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,158.5,113.5)"/>
              <rect x="163" y="109" width="9" height="9" transform="rotate(0,167.5,113.5)"/>
              <circle cx="185.5" cy="113.5" r="4.5" transform="rotate(0,185.5,113.5)"/>
              <path d="M 208 109v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,212.5,113.5)"/>
              <path d="M 226 109v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,230.5,113.5)"/>
              <path d="M 253 109v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,257.5,113.5)"/>
              <path d="M 19 118v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,23.5,122.5)"/>
              <path d="M 28 118v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,32.5,122.5)"/>
              <path d="M 46 118v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,50.5,122.5)"/>
              <rect x="82" y="118" width="9" height="9" transform="rotate(0,86.5,122.5)"/>
              <rect x="109" y="118" width="9" height="9" transform="rotate(0,113.5,122.5)"/>
              <rect x="127" y="118" width="9" height="9" transform="rotate(0,131.5,122.5)"/>
              <rect x="136" y="118" width="9" height="9" transform="rotate(0,140.5,122.5)"/>
              <rect x="163" y="118" width="9" height="9" transform="rotate(0,167.5,122.5)"/>
              <path d="M 172 118v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,176.5,122.5)"/>
              <path d="M 199 118v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,203.5,122.5)"/>
              <path d="M 217 118v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,221.5,122.5)"/>
              <circle cx="248.5" cy="122.5" r="4.5" transform="rotate(0,248.5,122.5)"/>
              <path d="M 271 118v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,275.5,122.5)"/>
              <path d="M 28 127v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,32.5,131.5)"/>
              <path d="M 37 127v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,41.5,131.5)"/>
              <path d="M 55 127v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,59.5,131.5)"/>
              <rect x="64" y="127" width="9" height="9" transform="rotate(0,68.5,131.5)"/>
              <rect x="73" y="127" width="9" height="9" transform="rotate(0,77.5,131.5)"/>
              <rect x="82" y="127" width="9" height="9" transform="rotate(0,86.5,131.5)"/>
              <path d="M 91 127v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,95.5,131.5)"/>
              <rect x="109" y="127" width="9" height="9" transform="rotate(0,113.5,131.5)"/>
              <rect x="118" y="127" width="9" height="9" transform="rotate(0,122.5,131.5)"/>
              <rect x="127" y="127" width="9" height="9" transform="rotate(0,131.5,131.5)"/>
              <rect x="136" y="127" width="9" height="9" transform="rotate(0,140.5,131.5)"/>
              <path d="M 154 127v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,158.5,131.5)"/>
              <rect x="163" y="127" width="9" height="9" transform="rotate(0,167.5,131.5)"/>
              <path d="M 181 127v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,185.5,131.5)"/>
              <rect x="190" y="127" width="9" height="9" transform="rotate(0,194.5,131.5)"/>
              <path d="M 199 127v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,203.5,131.5)"/>
              <rect x="217" y="127" width="9" height="9" transform="rotate(0,221.5,131.5)"/>
              <path d="M 226 127v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,230.5,131.5)"/>
              <rect x="271" y="127" width="9" height="9" transform="rotate(0,275.5,131.5)"/>
              <path d="M 37 136v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,41.5,140.5)"/>
              <path d="M 46 136v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,50.5,140.5)"/>
              <path d="M 64 136v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,68.5,140.5)"/>
              <path d="M 100 136v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,104.5,140.5)"/>
              <rect x="109" y="136" width="9" height="9" transform="rotate(0,113.5,140.5)"/>
              <rect x="136" y="136" width="9" height="9" transform="rotate(0,140.5,140.5)"/>
              <path d="M 145 136v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,149.5,140.5)"/>
              <rect x="163" y="136" width="9" height="9" transform="rotate(0,167.5,140.5)"/>
              <rect x="172" y="136" width="9" height="9" transform="rotate(0,176.5,140.5)"/>
              <path d="M 181 136v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,185.5,140.5)"/>
              <path d="M 208 136v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,212.5,140.5)"/>
              <rect x="217" y="136" width="9" height="9" transform="rotate(0,221.5,140.5)"/>
              <path d="M 235 136v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,239.5,140.5)"/>
              <rect x="244" y="136" width="9" height="9" transform="rotate(0,248.5,140.5)"/>
              <rect x="253" y="136" width="9" height="9" transform="rotate(0,257.5,140.5)"/>
              <rect x="262" y="136" width="9" height="9" transform="rotate(0,266.5,140.5)"/>
              <rect x="271" y="136" width="9" height="9" transform="rotate(0,275.5,140.5)"/>
              <path d="M 28 145v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,32.5,149.5)"/>
              <path d="M 46 145v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,50.5,149.5)"/>
              <circle cx="77.5" cy="149.5" r="4.5" transform="rotate(0,77.5,149.5)"/>
              <path d="M 100 145v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,104.5,149.5)"/>
              <rect x="109" y="145" width="9" height="9" transform="rotate(0,113.5,149.5)"/>
              <rect x="118" y="145" width="9" height="9" transform="rotate(0,122.5,149.5)"/>
              <rect x="127" y="145" width="9" height="9" transform="rotate(0,131.5,149.5)"/>
              <path d="M 136 145v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,140.5,149.5)"/>
              <path d="M 163 145v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,167.5,149.5)"/>
              <path d="M 172 145v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,176.5,149.5)"/>
              <path d="M 190 145v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,194.5,149.5)"/>
              <rect x="199" y="145" width="9" height="9" transform="rotate(0,203.5,149.5)"/>
              <rect x="208" y="145" width="9" height="9" transform="rotate(0,212.5,149.5)"/>
              <rect x="217" y="145" width="9" height="9" transform="rotate(0,221.5,149.5)"/>
              <path d="M 226 145v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,230.5,149.5)"/>
              <rect x="253" y="145" width="9" height="9" transform="rotate(0,257.5,149.5)"/>
              <rect x="271" y="145" width="9" height="9" transform="rotate(0,275.5,149.5)"/>
              <rect x="28" y="154" width="9" height="9" transform="rotate(0,32.5,158.5)"/>
              <path d="M 55 154v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,59.5,158.5)"/>
              <path d="M 64 154v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,68.5,158.5)"/>
              <path d="M 82 154v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,86.5,158.5)"/>
              <path d="M 91 154v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,95.5,158.5)"/>
              <circle cx="158.5" cy="158.5" r="4.5" transform="rotate(0,158.5,158.5)"/>
              <path d="M 181 154v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,185.5,158.5)"/>
              <rect x="190" y="154" width="9" height="9" transform="rotate(0,194.5,158.5)"/>
              <rect x="199" y="154" width="9" height="9" transform="rotate(0,203.5,158.5)"/>
              <path d="M 226 154v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,230.5,158.5)"/>
              <path d="M 235 154v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,239.5,158.5)"/>
              <path d="M 253 154v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,257.5,158.5)"/>
              <path d="M 271 154v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,275.5,158.5)"/>
              <path d="M 19 163v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,23.5,167.5)"/>
              <path d="M 28 163v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,32.5,167.5)"/>
              <path d="M 46 163v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,50.5,167.5)"/>
              <path d="M 55 163v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,59.5,167.5)"/>
              <circle cx="77.5" cy="167.5" r="4.5" transform="rotate(0,77.5,167.5)"/>
              <path d="M 109 163v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,113.5,167.5)"/>
              <path d="M 118 163v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,122.5,167.5)"/>
              <path d="M 145 163v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,149.5,167.5)"/>
              <path d="M 163 163v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,167.5,167.5)"/>
              <rect x="190" y="163" width="9" height="9" transform="rotate(0,194.5,167.5)"/>
              <rect x="199" y="163" width="9" height="9" transform="rotate(0,203.5,167.5)"/>
              <circle cx="248.5" cy="167.5" r="4.5" transform="rotate(0,248.5,167.5)"/>
              <rect x="19" y="172" width="9" height="9" transform="rotate(0,23.5,176.5)"/>
              <path d="M 37 172v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,41.5,176.5)"/>
              <rect x="46" y="172" width="9" height="9" transform="rotate(0,50.5,176.5)"/>
              <circle cx="86.5" cy="176.5" r="4.5" transform="rotate(0,86.5,176.5)"/>
              <rect x="109" y="172" width="9" height="9" transform="rotate(0,113.5,176.5)"/>
              <path d="M 136 172v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,140.5,176.5)"/>
              <path d="M 145 172v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,149.5,176.5)"/>
              <path d="M 163 172v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,167.5,176.5)"/>
              <rect x="172" y="172" width="9" height="9" transform="rotate(0,176.5,176.5)"/>
              <rect x="181" y="172" width="9" height="9" transform="rotate(0,185.5,176.5)"/>
              <rect x="190" y="172" width="9" height="9" transform="rotate(0,194.5,176.5)"/>
              <path d="M 199 172v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,203.5,176.5)"/>
              <circle cx="239.5" cy="176.5" r="4.5" transform="rotate(0,239.5,176.5)"/>
              <path d="M 253 172v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,257.5,176.5)"/>
              <path d="M 262 172v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,266.5,176.5)"/>
              <rect x="19" y="181" width="9" height="9" transform="rotate(0,23.5,185.5)"/>
              <path d="M 28 181v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,32.5,185.5)"/>
              <rect x="46" y="181" width="9" height="9" transform="rotate(0,50.5,185.5)"/>
              <path d="M 55 181v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,59.5,185.5)"/>
              <circle cx="77.5" cy="185.5" r="4.5" transform="rotate(0,77.5,185.5)"/>
              <path d="M 100 181v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,104.5,185.5)"/>
              <rect x="109" y="181" width="9" height="9" transform="rotate(0,113.5,185.5)"/>
              <circle cx="131.5" cy="185.5" r="4.5" transform="rotate(0,131.5,185.5)"/>
              <circle cx="158.5" cy="185.5" r="4.5" transform="rotate(0,158.5,185.5)"/>
              <path d="M 181 181v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,185.5,185.5)"/>
              <path d="M 190 181v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,194.5,185.5)"/>
              <path d="M 244 181v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,248.5,185.5)"/>
              <circle cx="275.5" cy="185.5" r="4.5" transform="rotate(0,275.5,185.5)"/>
              <rect x="19" y="190" width="9" height="9" transform="rotate(0,23.5,194.5)"/>
              <rect x="28" y="190" width="9" height="9" transform="rotate(0,32.5,194.5)"/>
              <rect x="37" y="190" width="9" height="9" transform="rotate(0,41.5,194.5)"/>
              <path d="M 46 190v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,50.5,194.5)"/>
              <circle cx="68.5" cy="194.5" r="4.5" transform="rotate(0,68.5,194.5)"/>
              <path d="M 82 190v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,86.5,194.5)"/>
              <path d="M 91 190v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,95.5,194.5)"/>
              <rect x="109" y="190" width="9" height="9" transform="rotate(0,113.5,194.5)"/>
              <path d="M 145 190v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,149.5,194.5)"/>
              <path d="M 199 190v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,203.5,194.5)"/>
              <rect x="208" y="190" width="9" height="9" transform="rotate(0,212.5,194.5)"/>
              <rect x="217" y="190" width="9" height="9" transform="rotate(0,221.5,194.5)"/>
              <rect x="226" y="190" width="9" height="9" transform="rotate(0,230.5,194.5)"/>
              <rect x="235" y="190" width="9" height="9" transform="rotate(0,239.5,194.5)"/>
              <rect x="244" y="190" width="9" height="9" transform="rotate(0,248.5,194.5)"/>
              <path d="M 253 190v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,257.5,194.5)"/>
              <path d="M 19 199v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,23.5,203.5)"/>
              <rect x="28" y="199" width="9" height="9" transform="rotate(0,32.5,203.5)"/>
              <path d="M 37 199v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,41.5,203.5)"/>
              <path d="M 73 199v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,77.5,203.5)"/>
              <rect x="82" y="199" width="9" height="9" transform="rotate(0,86.5,203.5)"/>
              <rect x="91" y="199" width="9" height="9" transform="rotate(0,95.5,203.5)"/>
              <rect x="100" y="199" width="9" height="9" transform="rotate(0,104.5,203.5)"/>
              <path d="M 109 199v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,113.5,203.5)"/>
              <path d="M 127 199v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,131.5,203.5)"/>
              <rect x="136" y="199" width="9" height="9" transform="rotate(0,140.5,203.5)"/>
              <rect x="145" y="199" width="9" height="9" transform="rotate(0,149.5,203.5)"/>
              <rect x="154" y="199" width="9" height="9" transform="rotate(0,158.5,203.5)"/>
              <rect x="163" y="199" width="9" height="9" transform="rotate(0,167.5,203.5)"/>
              <path d="M 172 199v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,176.5,203.5)"/>
              <path d="M 190 199v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,194.5,203.5)"/>
              <rect x="199" y="199" width="9" height="9" transform="rotate(0,203.5,203.5)"/>
              <rect x="208" y="199" width="9" height="9" transform="rotate(0,212.5,203.5)"/>
              <rect x="217" y="199" width="9" height="9" transform="rotate(0,221.5,203.5)"/>
              <rect x="226" y="199" width="9" height="9" transform="rotate(0,230.5,203.5)"/>
              <rect x="235" y="199" width="9" height="9" transform="rotate(0,239.5,203.5)"/>
              <rect x="244" y="199" width="9" height="9" transform="rotate(0,248.5,203.5)"/>
              <rect x="253" y="199" width="9" height="9" transform="rotate(0,257.5,203.5)"/>
              <path d="M 262 199v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,266.5,203.5)"/>
              <rect x="91" y="208" width="9" height="9" transform="rotate(0,95.5,212.5)"/>
              <path d="M 100 208v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,104.5,212.5)"/>
              <path d="M 127 208v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,131.5,212.5)"/>
              <rect x="145" y="208" width="9" height="9" transform="rotate(0,149.5,212.5)"/>
              <path d="M 172 208v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,176.5,212.5)"/>
              <path d="M 181 208v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,185.5,212.5)"/>
              <rect x="199" y="208" width="9" height="9" transform="rotate(0,203.5,212.5)"/>
              <rect x="235" y="208" width="9" height="9" transform="rotate(0,239.5,212.5)"/>
              <rect x="244" y="208" width="9" height="9" transform="rotate(0,248.5,212.5)"/>
              <rect x="91" y="217" width="9" height="9" transform="rotate(0,95.5,221.5)"/>
              <circle cx="113.5" cy="221.5" r="4.5" transform="rotate(0,113.5,221.5)"/>
              <rect x="145" y="217" width="9" height="9" transform="rotate(0,149.5,221.5)"/>
              <path d="M 190 217v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,194.5,221.5)"/>
              <rect x="199" y="217" width="9" height="9" transform="rotate(0,203.5,221.5)"/>
              <circle cx="221.5" cy="221.5" r="4.5" transform="rotate(0,221.5,221.5)"/>
              <rect x="235" y="217" width="9" height="9" transform="rotate(0,239.5,221.5)"/>
              <path d="M 244 217v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,248.5,221.5)"/>
              <rect x="91" y="226" width="9" height="9" transform="rotate(0,95.5,230.5)"/>
              <path d="M 100 226v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,104.5,230.5)"/>
              <path d="M 118 226v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,122.5,230.5)"/>
              <rect x="145" y="226" width="9" height="9" transform="rotate(0,149.5,230.5)"/>
              <path d="M 154 226v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,158.5,230.5)"/>
              <circle cx="176.5" cy="230.5" r="4.5" transform="rotate(0,176.5,230.5)"/>
              <rect x="190" y="226" width="9" height="9" transform="rotate(0,194.5,230.5)"/>
              <rect x="199" y="226" width="9" height="9" transform="rotate(0,203.5,230.5)"/>
              <rect x="235" y="226" width="9" height="9" transform="rotate(0,239.5,230.5)"/>
              <rect x="91" y="235" width="9" height="9" transform="rotate(0,95.5,239.5)"/>
              <rect x="100" y="235" width="9" height="9" transform="rotate(0,104.5,239.5)"/>
              <path d="M 118 235v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,122.5,239.5)"/>
              <rect x="127" y="235" width="9" height="9" transform="rotate(0,131.5,239.5)"/>
              <rect x="136" y="235" width="9" height="9" transform="rotate(0,140.5,239.5)"/>
              <path d="M 145 235v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,149.5,239.5)"/>
              <circle cx="167.5" cy="239.5" r="4.5" transform="rotate(0,167.5,239.5)"/>
              <path d="M 190 235v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,194.5,239.5)"/>
              <rect x="199" y="235" width="9" height="9" transform="rotate(0,203.5,239.5)"/>
              <rect x="208" y="235" width="9" height="9" transform="rotate(0,212.5,239.5)"/>
              <rect x="217" y="235" width="9" height="9" transform="rotate(0,221.5,239.5)"/>
              <rect x="226" y="235" width="9" height="9" transform="rotate(0,230.5,239.5)"/>
              <rect x="235" y="235" width="9" height="9" transform="rotate(0,239.5,239.5)"/>
              <path d="M 244 235v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,248.5,239.5)"/>
              <path d="M 91 244v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,95.5,248.5)"/>
              <rect x="100" y="244" width="9" height="9" transform="rotate(0,104.5,248.5)"/>
              <path d="M 109 244v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,113.5,248.5)"/>
              <rect x="127" y="244" width="9" height="9" transform="rotate(0,131.5,248.5)"/>
              <rect x="136" y="244" width="9" height="9" transform="rotate(0,140.5,248.5)"/>
              <path d="M 172 244v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,176.5,248.5)"/>
              <path d="M 181 244v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,185.5,248.5)"/>
              <path d="M 208 244v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,212.5,248.5)"/>
              <rect x="226" y="244" width="9" height="9" transform="rotate(0,230.5,248.5)"/>
              <path d="M 262 244v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,266.5,248.5)"/>
              <path d="M 100 253v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,104.5,257.5)"/>
              <path d="M 127 253v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,131.5,257.5)"/>
              <rect x="136" y="253" width="9" height="9" transform="rotate(0,140.5,257.5)"/>
              <path d="M 154 253v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(-90,158.5,257.5)"/>
              <circle cx="203.5" cy="257.5" r="4.5" transform="rotate(0,203.5,257.5)"/>
              <rect x="226" y="253" width="9" height="9" transform="rotate(0,230.5,257.5)"/>
              <path d="M 235 253v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(0,239.5,257.5)"/>
              <path d="M 253 253v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,257.5,257.5)"/>
              <rect x="262" y="253" width="9" height="9" transform="rotate(0,266.5,257.5)"/>
              <path d="M 271 253v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,275.5,257.5)"/>
              <path d="M 109 262v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,113.5,266.5)"/>
              <path d="M 118 262v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,122.5,266.5)"/>
              <rect x="136" y="262" width="9" height="9" transform="rotate(0,140.5,266.5)"/>
              <path d="M 154 262v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,158.5,266.5)"/>
              <path d="M 217 262v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,221.5,266.5)"/>
              <path d="M 226 262v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,230.5,266.5)"/>
              <path d="M 244 262v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,248.5,266.5)"/>
              <path d="M 253 262v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,257.5,266.5)"/>
              <path d="M 271 262v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,275.5,266.5)"/>
              <circle cx="95.5" cy="275.5" r="4.5" transform="rotate(0,95.5,275.5)"/>
              <path d="M 118 271v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,122.5,275.5)"/>
              <path d="M 136 271v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(90,140.5,275.5)"/>
              <path d="M 181 271v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,185.5,275.5)"/>
              <rect x="190" y="271" width="9" height="9" transform="rotate(0,194.5,275.5)"/>
              <rect x="199" y="271" width="9" height="9" transform="rotate(0,203.5,275.5)"/>
              <rect x="208" y="271" width="9" height="9" transform="rotate(0,212.5,275.5)"/>
              <path d="M 217 271v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,221.5,275.5)"/>
              <path d="M 235 271v 9h 4.5a 4.5 4.5, 0, 0, 0, 0 -9" transform="rotate(180,239.5,275.5)"/>
              <path d="M 244 271v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,248.5,275.5)"/>
              <path d="M 19 19v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,23.5,23.5)"/>
              <rect x="28" y="19" width="9" height="9" transform="rotate(0,32.5,23.5)"/>
              <rect x="37" y="19" width="9" height="9" transform="rotate(0,41.5,23.5)"/>
              <rect x="46" y="19" width="9" height="9" transform="rotate(0,50.5,23.5)"/>
              <rect x="55" y="19" width="9" height="9" transform="rotate(0,59.5,23.5)"/>
              <rect x="64" y="19" width="9" height="9" transform="rotate(0,68.5,23.5)"/>
              <path d="M 73 19v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,77.5,23.5)"/>
              <rect x="19" y="28" width="9" height="9" transform="rotate(0,23.5,32.5)"/>
              <rect x="73" y="28" width="9" height="9" transform="rotate(0,77.5,32.5)"/>
              <rect x="19" y="37" width="9" height="9" transform="rotate(0,23.5,41.5)"/>
              <rect x="73" y="37" width="9" height="9" transform="rotate(0,77.5,41.5)"/>
              <rect x="19" y="46" width="9" height="9" transform="rotate(0,23.5,50.5)"/>
              <rect x="73" y="46" width="9" height="9" transform="rotate(0,77.5,50.5)"/>
              <rect x="19" y="55" width="9" height="9" transform="rotate(0,23.5,59.5)"/>
              <rect x="73" y="55" width="9" height="9" transform="rotate(0,77.5,59.5)"/>
              <rect x="19" y="64" width="9" height="9" transform="rotate(0,23.5,68.5)"/>
              <rect x="73" y="64" width="9" height="9" transform="rotate(0,77.5,68.5)"/>
              <path d="M 19 73v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,23.5,77.5)"/>
              <rect x="28" y="73" width="9" height="9" transform="rotate(0,32.5,77.5)"/>
              <rect x="37" y="73" width="9" height="9" transform="rotate(0,41.5,77.5)"/>
              <rect x="46" y="73" width="9" height="9" transform="rotate(0,50.5,77.5)"/>
              <rect x="55" y="73" width="9" height="9" transform="rotate(0,59.5,77.5)"/>
              <rect x="64" y="73" width="9" height="9" transform="rotate(0,68.5,77.5)"/>
              <path d="M 73 73v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,77.5,77.5)"/>
              <path d="M 37 37v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,41.5,41.5)"/>
              <rect x="46" y="37" width="9" height="9" transform="rotate(0,50.5,41.5)"/>
              <path d="M 55 37v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,59.5,41.5)"/>
              <rect x="37" y="46" width="9" height="9" transform="rotate(0,41.5,50.5)"/>
              <rect x="46" y="46" width="9" height="9" transform="rotate(0,50.5,50.5)"/>
              <rect x="55" y="46" width="9" height="9" transform="rotate(0,59.5,50.5)"/>
              <path d="M 37 55v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,41.5,59.5)"/>
              <rect x="46" y="55" width="9" height="9" transform="rotate(0,50.5,59.5)"/>
              <path d="M 55 55v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,59.5,59.5)"/>
              <path d="M 217 19v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,221.5,23.5)"/>
              <rect x="226" y="19" width="9" height="9" transform="rotate(0,230.5,23.5)"/>
              <rect x="235" y="19" width="9" height="9" transform="rotate(0,239.5,23.5)"/>
              <rect x="244" y="19" width="9" height="9" transform="rotate(0,248.5,23.5)"/>
              <rect x="253" y="19" width="9" height="9" transform="rotate(0,257.5,23.5)"/>
              <rect x="262" y="19" width="9" height="9" transform="rotate(0,266.5,23.5)"/>
              <path d="M 271 19v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,275.5,23.5)"/>
              <rect x="217" y="28" width="9" height="9" transform="rotate(0,221.5,32.5)"/>
              <rect x="271" y="28" width="9" height="9" transform="rotate(0,275.5,32.5)"/>
              <rect x="217" y="37" width="9" height="9" transform="rotate(0,221.5,41.5)"/>
              <rect x="271" y="37" width="9" height="9" transform="rotate(0,275.5,41.5)"/>
              <rect x="217" y="46" width="9" height="9" transform="rotate(0,221.5,50.5)"/>
              <rect x="271" y="46" width="9" height="9" transform="rotate(0,275.5,50.5)"/>
              <rect x="217" y="55" width="9" height="9" transform="rotate(0,221.5,59.5)"/>
              <rect x="271" y="55" width="9" height="9" transform="rotate(0,275.5,59.5)"/>
              <rect x="217" y="64" width="9" height="9" transform="rotate(0,221.5,68.5)"/>
              <rect x="271" y="64" width="9" height="9" transform="rotate(0,275.5,68.5)"/>
              <path d="M 217 73v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,221.5,77.5)"/>
              <rect x="226" y="73" width="9" height="9" transform="rotate(0,230.5,77.5)"/>
              <rect x="235" y="73" width="9" height="9" transform="rotate(0,239.5,77.5)"/>
              <rect x="244" y="73" width="9" height="9" transform="rotate(0,248.5,77.5)"/>
              <rect x="253" y="73" width="9" height="9" transform="rotate(0,257.5,77.5)"/>
              <rect x="262" y="73" width="9" height="9" transform="rotate(0,266.5,77.5)"/>
              <path d="M 271 73v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,275.5,77.5)"/>
              <path d="M 235 37v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,239.5,41.5)"/>
              <rect x="244" y="37" width="9" height="9" transform="rotate(0,248.5,41.5)"/>
              <path d="M 253 37v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,257.5,41.5)"/>
              <rect x="235" y="46" width="9" height="9" transform="rotate(0,239.5,50.5)"/>
              <rect x="244" y="46" width="9" height="9" transform="rotate(0,248.5,50.5)"/>
              <rect x="253" y="46" width="9" height="9" transform="rotate(0,257.5,50.5)"/>
              <path d="M 235 55v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,239.5,59.5)"/>
              <rect x="244" y="55" width="9" height="9" transform="rotate(0,248.5,59.5)"/>
              <path d="M 253 55v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,257.5,59.5)"/>
              <path d="M 19 217v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,23.5,221.5)"/>
              <rect x="28" y="217" width="9" height="9" transform="rotate(0,32.5,221.5)"/>
              <rect x="37" y="217" width="9" height="9" transform="rotate(0,41.5,221.5)"/>
              <rect x="46" y="217" width="9" height="9" transform="rotate(0,50.5,221.5)"/>
              <rect x="55" y="217" width="9" height="9" transform="rotate(0,59.5,221.5)"/>
              <rect x="64" y="217" width="9" height="9" transform="rotate(0,68.5,221.5)"/>
              <path d="M 73 217v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,77.5,221.5)"/>
              <rect x="19" y="226" width="9" height="9" transform="rotate(0,23.5,230.5)"/>
              <rect x="73" y="226" width="9" height="9" transform="rotate(0,77.5,230.5)"/>
              <rect x="19" y="235" width="9" height="9" transform="rotate(0,23.5,239.5)"/>
              <rect x="73" y="235" width="9" height="9" transform="rotate(0,77.5,239.5)"/>
              <rect x="19" y="244" width="9" height="9" transform="rotate(0,23.5,248.5)"/>
              <rect x="73" y="244" width="9" height="9" transform="rotate(0,77.5,248.5)"/>
              <rect x="19" y="253" width="9" height="9" transform="rotate(0,23.5,257.5)"/>
              <rect x="73" y="253" width="9" height="9" transform="rotate(0,77.5,257.5)"/>
              <rect x="19" y="262" width="9" height="9" transform="rotate(0,23.5,266.5)"/>
              <rect x="73" y="262" width="9" height="9" transform="rotate(0,77.5,266.5)"/>
              <path d="M 19 271v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,23.5,275.5)"/>
              <rect x="28" y="271" width="9" height="9" transform="rotate(0,32.5,275.5)"/>
              <rect x="37" y="271" width="9" height="9" transform="rotate(0,41.5,275.5)"/>
              <rect x="46" y="271" width="9" height="9" transform="rotate(0,50.5,275.5)"/>
              <rect x="55" y="271" width="9" height="9" transform="rotate(0,59.5,275.5)"/>
              <rect x="64" y="271" width="9" height="9" transform="rotate(0,68.5,275.5)"/>
              <path d="M 73 271v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,77.5,275.5)"/>
              <path d="M 37 235v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(-90,41.5,239.5)"/>
              <rect x="46" y="235" width="9" height="9" transform="rotate(0,50.5,239.5)"/>
              <path d="M 55 235v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(0,59.5,239.5)"/>
              <rect x="37" y="244" width="9" height="9" transform="rotate(0,41.5,248.5)"/>
              <rect x="46" y="244" width="9" height="9" transform="rotate(0,50.5,248.5)"/>
              <rect x="55" y="244" width="9" height="9" transform="rotate(0,59.5,248.5)"/>
              <path d="M 37 253v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(180,41.5,257.5)"/>
              <rect x="46" y="253" width="9" height="9" transform="rotate(0,50.5,257.5)"/>
              <path d="M 55 253v 9h 9v -4.5a 4.5 4.5, 0, 0, 0, -4.5 -4.5" transform="rotate(90,59.5,257.5)"/>
            </clipPath>
          </defs>
          <rect x="0" y="0" height="300" width="300" clip-path="url('#clip-path-background-color-2')" fill="#FFFFFF"/>
          <rect x="0" y="0" height="300" width="300" clip-path="url('#clip-path-dot-color-2')" fill="#000000"/>
        </svg>
      `

    const entity = em.create(QrEntity, {
      code,
      data,
      svg,
    })

    await em.persistAndFlush(entity)
  }
}
