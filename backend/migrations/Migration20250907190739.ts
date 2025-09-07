import { Migration } from '@mikro-orm/migrations';

export class Migration20250907190739 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "qr_codes" rename column "base64" to "svg";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "qr_codes" rename column "svg" to "base64";`);
  }

}
