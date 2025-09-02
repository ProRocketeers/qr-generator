import { Entity, PrimaryKey, Property, Unique, Index } from '@mikro-orm/core';

@Entity({ tableName: 'qr_codes' })
export class QrEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  @Index()
  code!: string;

  @Property()
  payload!: string;

  @Property({ columnType: 'text' })
  base64!: string;

  // optional = TS už to nebude vyžadovat při create()
  @Property({ defaultRaw: 'now()' })
  createdAt?: Date;
}