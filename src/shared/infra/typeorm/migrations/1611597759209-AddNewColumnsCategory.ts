import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddNewColumnsCategory1611597759209 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(
      'categories',
      [
        new TableColumn({ isNullable: true, name: 'icon', type: 'varchar' }),
        new TableColumn({ isNullable: true, name: 'background_color_dark', type: 'varchar' }),
        new TableColumn({ isNullable: true, name: 'background_color_light', type: 'varchar' }),
        new TableColumn({ isNullable: true, name: 'user_id', type: 'uuid' }),
      ],
    );

    await queryRunner.createForeignKey('categories',
      new TableForeignKey({
        name: 'user_category_fk',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    )

  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.dropColumns('categories', [
      new TableColumn({ name: 'icon', type: 'varchar' }),
      new TableColumn({ name: 'background_color_dark', type: 'varchar' }),
      new TableColumn({ name: 'background_color_light', type: 'varchar' })
    ]);

    await queryRunner.dropForeignKey('categories', 'user_category_fk');
    await queryRunner.dropColumn('categories', 'user_id');
  }


}
