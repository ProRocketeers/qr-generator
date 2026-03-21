import { Migration } from '@mikro-orm/migrations';

export class Migration20260111172252 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "qr_codes" ("code" varchar(255) not null, "type" text check ("type" in ('text', 'link', 'email', 'call', 'sms', 'wifi', 'geo', 'event', 'contact', 'sepa', 'spd', 'otpauth')) not null, "data" jsonb not null, "svg" text not null, "created_at" timestamptz null default now(), "updated_at" timestamptz null, constraint "qr_codes_pkey" primary key ("code"));`);
    this.addSql(`create index "qr_codes_code_index" on "qr_codes" ("code");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "qr_codes" cascade;`);
  }

}
