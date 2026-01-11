import { QrType } from '@backend/types'
import {
  Entity,
  PrimaryKey,
  Property,
  Unique,
  Index,
  Enum,
} from '@mikro-orm/core'

@Entity({ tableName: 'qr_codes' })
export class QrEntity {
  @PrimaryKey()
  @Unique()
  @Index()
  code!: string

  @Enum(() => QrType)
  type!: QrType

  @Property({ type: 'json', columnType: 'jsonb' })
  data!: unknown

  @Property({ columnType: 'text' })
  svg!: string

  @Property({ defaultRaw: 'now()' })
  createdAt?: Date

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date
}
