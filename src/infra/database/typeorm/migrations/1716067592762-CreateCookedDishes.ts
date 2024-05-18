import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCookedDishes1716067592762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cooked_dishes',
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
            name: 'protein_ratio',
            type: 'float',
          },
          {
            name: 'fat_ratio',
            type: 'float',
          },
          {
            name: 'carbohydrate_ratio',
            type: 'float',
          },
          {
            name: 'fiber_ratio',
            type: 'float',
          },
          {
            name: 'kcal_per_gram',
            type: 'float',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cooked_dishes');
  }
}
