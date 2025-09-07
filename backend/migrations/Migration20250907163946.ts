import { Migration } from '@mikro-orm/migrations';

export class Migration20250907163946 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "qr_codes" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "qr_codes" alter column "created_at" drop not null;`);
    this.addSql(`alter table "qr_codes" rename column "payload" to "data";`);
    this.addSql(`create index "qr_codes_code_index" on "qr_codes" ("code");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index "qr_codes_code_index";`);

    this.addSql(`alter table "qr_codes" alter column "created_at" type timestamptz using ("created_at"::timestamptz);`);
    this.addSql(`alter table "qr_codes" alter column "created_at" set not null;`);
    this.addSql(`alter table "qr_codes" rename column "data" to "payload";`);
  }

}
