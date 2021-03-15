import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProductPurchase1615847416286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!await queryRunner.hasTable('product_purchase')) {
      await queryRunner.createTable(new Table({
        name: 'product_purchase',
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
            name: 'purchase_id',
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
            name: 'ProductPurchase',
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          },
          {
            name: 'PurchaseProduct',
            columnNames: ['purchase_id'],
            referencedTableName: 'purchase',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          },
          {
            name: 'PurchaseProductProvider',
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
    await queryRunner.dropTable('product_purchase');
  }
}
