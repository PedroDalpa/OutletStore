import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AlterProduct1615041962683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('product', new TableColumn({
      name: 'product_sub_category_id',
      type: 'varchar'
    }));

    await queryRunner.createForeignKey('product', new TableForeignKey({
      columnNames: ['product_sub_category_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'product_sub_category',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('product');
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_sub_category_id') !== -1);
    await queryRunner.dropForeignKey('product', foreignKey);
    await queryRunner.dropColumn('product', 'product_sub_category_id');
  }
}
