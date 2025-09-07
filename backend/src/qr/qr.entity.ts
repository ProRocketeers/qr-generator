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
  data!: string;

  @Property({ columnType: 'text' })
  svg!: string;

  @Property({ defaultRaw: 'now()' })
  createdAt?: Date;
}