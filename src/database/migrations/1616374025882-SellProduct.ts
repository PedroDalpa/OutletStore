import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SellProduct1616374025882 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!await queryRunner.hasTable('product_sell')) {
      await queryRunner.createTable(new Table({
        name: 'product_sell',
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
            name: 'sell_id',
            type: 'varchar'
          },
          {
            name: 'amount',
            type: 'float'
          },
          {
            name: 'unit_value',
            type: 'float'
          },
          {
            name: 'total_value',
            type: 'float'
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
            name: 'ProductSell',
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          },
          {
            name: 'SellProduct',
            columnNames: ['sell_id'],
            referencedTableName: 'sell',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          }

        ]

      }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_sell');
  }
}
