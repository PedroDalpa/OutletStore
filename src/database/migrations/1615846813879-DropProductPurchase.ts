import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class DropProductPurchase1615846813879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('product_purchase')) {
      await queryRunner.dropTable('product_purchase');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
            name: 'user_id',
            type: 'varchar'
          },
          {
            name: 'product_id',
            type: 'varchar'
          },
          {
            name: 'product_color_id',
            type: 'varchar'
          },
          {
            name: 'product_size',
            type: 'varchar'
          },
          {
            name: 'amount',
            type: 'float'
          },
          {
            name: 'total_value',
            type: 'float'
          },
          {
            name: 'unit_value',
            type: 'float'
          },
          {
            name: 'fiscal_note_number',
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
            name: 'ProductPurchaseProduct',
            columnNames: ['product_id'],
            referencedTableName: 'product',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          },
          {
            name: 'ProductPurchaseProductProvider',
            columnNames: ['product_provider_id'],
            referencedTableName: 'product_provider',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          },
          {
            name: 'ProductPurchaseUser',
            columnNames: ['user_id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          },
          {
            name: 'ProductPurchaseProductColor',
            columnNames: ['product_color_id'],
            referencedTableName: 'product_color',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'

          }
        ]

      }));
    }
  }
}
