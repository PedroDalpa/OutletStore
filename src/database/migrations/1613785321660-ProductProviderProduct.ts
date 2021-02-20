import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProductProviderProduct1613785321660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!await queryRunner.hasTable('product_provider_product')) {
      await queryRunner.createTable(new Table({
        name: 'product_provider_product',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'product_id',
            type: 'varchar'
          },
          {
            name: 'product_provider_id',
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
            name: 'ProductProviderProduct',
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          },
          {
            name: 'ProductProviderProductProvider',
            columnNames: ['product_provider_id'],
            referencedTableName: 'product_provider',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          }
        ]

      }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_provider_product');
  }
}
