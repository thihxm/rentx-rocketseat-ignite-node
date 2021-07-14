import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterUserChangeAvatar1626144039260 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'avatar',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'avatar',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
      })
    )
  }
}
