import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AlterProductInputStock1616539158069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!await queryRunner.hasColumn('product_input_stock', 'product_bar_code')) {
      await queryRunner.addColumn('product_input_stock', new TableColumn({
        name: 'product_bar_code',
        type: 'varchar',
        isUnique: true,
        isNullable: false
      }));
      await queryRunner.addColumn('product_input_stock', new TableColumn({
        name: 'product_id',
        type: 'varchar'
      }));
      await queryRunner.createForeignKey('product_input_stock', new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'

      }));
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product_input_stock');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
    await queryRunner.dropForeignKey('product_input_stock', foreignKey);
    await queryRunner.dropColumn('product_input_stock', 'product_bar_code');
  }
}
