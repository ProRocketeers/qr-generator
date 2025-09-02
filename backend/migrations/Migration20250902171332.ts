import { Migration } from '@mikro-orm/migrations';

export class Migration20250902171332 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "qr_codes" ("id" serial primary key, "code" varchar(255) not null, "payload" varchar(255) not null, "base64" text not null, "created_at" timestamptz not null default now());`);
    this.addSql(`alter table "qr_codes" add constraint "qr_codes_code_unique" unique ("code");`);
  }

}
