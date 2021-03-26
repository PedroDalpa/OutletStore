import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterProductStock1616539911245 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!await queryRunner.hasColumn('product_stock', 'product_bar_code')) {
      await queryRunner.addColumn('product_stock', new TableColumn({
        name: 'is_stock',
        type: 'tinyint',
        default: 1
      }));
      await queryRunner.addColumn('product_stock', new TableColumn({
        name: 'product_bar_code',
        type: 'varchar',
        isUnique: true,
        isNullable: false
      }));

      await queryRunner.dropColumn('product_stock', 'amount');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product_stock', 'is_stock');
    await queryRunner.dropColumn('product_stock', 'product_bar_code');
    await queryRunner.addColumn('product_stock', new TableColumn({
      name: 'amount',
      type: 'float'
    }));
  }
}
