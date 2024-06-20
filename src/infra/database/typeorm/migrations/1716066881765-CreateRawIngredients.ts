import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRawIngredients1716066881765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'raw_ingredients',
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
            name: 'proteinRatio',
            type: 'float',
          },
          {
            name: 'fatRatio',
            type: 'float',
          },
          {
            name: 'carbohydrateRatio',
            type: 'float',
          },
          {
            name: 'fiberRatio',
            type: 'float',
          },
          {
            name: 'kcalPerGram',
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
    await queryRunner.dropTable('raw_ingredients');
  }
}
