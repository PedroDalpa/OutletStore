import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AlterSellProduct1616963895440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('product_sell', new TableColumn({
      name: 'value',
      type: 'float'

    }));
    await queryRunner.addColumn('product_sell', new TableColumn({
      name: 'product_bar_code',
      type: 'varchar',
      isNullable: false
    }));

    await queryRunner.createForeignKey('product_sell', new TableForeignKey({
      columnNames: ['product_bar_code'],
      referencedColumnNames: ['product_bar_code'],
      referencedTableName: 'product_input_stock',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    }));
    const table = await queryRunner.getTable('product_sell');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
    await queryRunner.dropForeignKey('product_sell', foreignKey);
    await queryRunner.dropColumn('product_sell', 'product_id');
    await queryRunner.dropColumn('product_sell', 'amount');
    await queryRunner.dropColumn('product_sell', 'unit_value');
    await queryRunner.dropColumn('product_sell', 'total_value');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('product_sell', new TableColumn({
      name: 'total_value',
      type: 'float'
    }));
    await queryRunner.addColumn('product_sell', new TableColumn({
      name: 'unit_value',
      type: 'float'
    }));
    await queryRunner.addColumn('product_sell', new TableColumn({
      name: 'amount',
      type: 'float'
    }));
    await queryRunner.addColumn('product_sell', new TableColumn({
      name: 'product_id',
      type: 'varchar'
    }));

    await queryRunner.createForeignKey('product_sell', new TableForeignKey({

      referencedTableName: 'product_sell',
      name: 'ProductSell',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'

    }));

    const table = await queryRunner.getTable('product_sell');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_bar_code') !== -1);
    await queryRunner.dropForeignKey('product_sell', foreignKey);
    await queryRunner.dropColumn('product_sell', 'product_bar_code');

    await queryRunner.dropColumn('product_sell', 'value');
  }
}
