import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColumnTransactionDtReference1624823249061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            'transactions',
            [
              new TableColumn({ isNullable: true, name: 'dt_reference', type: 'int' })
            ],
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {


    await queryRunner.dropColumns('transactions', [
        new TableColumn({ name: 'dt_reference', type: 'int' })
      ]);
    }

}
