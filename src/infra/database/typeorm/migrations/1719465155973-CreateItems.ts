import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ItemType } from '../../../../core/domain/item/item.entity';

export class CreateItems1719465155973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
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
            name: 'type',
            type: 'enum',
            enum: Object.values(ItemType),
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
    await queryRunner.dropTable('items');
  }
}
