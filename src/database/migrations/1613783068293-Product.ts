import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Product1613783068293 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!await queryRunner.hasTable('product')) {
      await queryRunner.createTable(new Table({
        name: 'product',
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
            name: 'user_id',
            type: 'varchar'
          },
          {
            name: 'product_brand_id',
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
            name: 'ProductUser',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          },
          {
            name: 'ProductProductBrand',
            columnNames: ['product_brand_id'],
            referencedTableName: 'product_brand',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          }
        ]

      }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product');
  }
}
