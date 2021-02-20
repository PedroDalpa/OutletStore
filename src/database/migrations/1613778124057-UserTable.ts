import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserTable1613778124057 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!await queryRunner.hasTable('user')) {
      await queryRunner.createTable(new Table({
        name: 'user',
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
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'phone',
            type: 'varchar'
          },
          {
            name: 'access_level',
            type: 'int'

          },
          {
            name: 'tenant_id',
            type: 'varchar'
          },
          {
            name: 'create_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'active',
            type: 'tinyint',
            default: 1
          }
        ],
        foreignKeys: [
          {
            name: 'UserTenant',
            columnNames: ['tenant_id'],
            referencedTableName: 'tenant',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          }
        ]

      }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
