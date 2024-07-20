import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddIsPublicToItems1721439608593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'items',
      new TableColumn({
        name: 'isPublic',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('items', 'isPublic');
  }
}
