import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TenantTable1613777879810 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!await queryRunner.hasTable('tenant')) {
      await queryRunner.createTable(new Table({
        name: 'tenant',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'

          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true
          },
          {
            name: 'phone',
            type: 'varchar'
          },
          {
            name: 'street',
            type: 'varchar'
          },
          {
            name: 'city',
            type: 'varchar'
          },
          {
            name: 'state',
            type: 'varchar'
          },
          {
            name: 'zip',
            type: 'varchar'
          },
          {
            name: 'active',
            type: 'tinyint',
            default: 1
          },
          {
            name: 'create_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP'
          }

        ]
      }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenant');
  }
}
