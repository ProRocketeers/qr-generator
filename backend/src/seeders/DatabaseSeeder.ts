import { Seeder } from '@mikro-orm/seeder'
import { EntityManager } from '@mikro-orm/postgresql'
import { SeedQrSeeder } from './SeedQrSeeder'

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await this.call(em, [SeedQrSeeder])
  }
}
