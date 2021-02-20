import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProductBrand1613781471894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!await queryRunner.hasTable('product_brand')) {
      await queryRunner.createTable(new Table({
        name: 'product_brand',
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
            name: 'ProductBrandUser',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          }
        ]

      }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_brand');
  }
}
