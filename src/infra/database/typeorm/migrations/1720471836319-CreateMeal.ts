import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMeal1720471836319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'meals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'kcal',
            type: 'float',
          },
          {
            name: 'protein',
            type: 'float',
          },
          {
            name: 'carbohydrate',
            type: 'float',
          },
          {
            name: 'fat',
            type: 'float',
          },
          {
            name: 'fiber',
            type: 'float',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('meals');
  }
}
