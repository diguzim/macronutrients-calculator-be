// import { Injectable } from '@nestjs/common';
// import { RawIngredientRepository } from '../../../../core/domain/raw-ingredient/raw-ingredient.repository';
// import { RawIngredient } from '../../../../core/domain/raw-ingredient/raw-ingredient.entity';

// @Injectable()
// export class InMemoryRawIngredientRepository
//   implements RawIngredientRepository
// {
//   private readonly rawIngredients: RawIngredient[] = [];

//   async create(rawIngredient: RawIngredient): Promise<RawIngredient> {
//     rawIngredient.id = (this.rawIngredients.length + 1).toString();
//     this.rawIngredients.push(rawIngredient);

//     return rawIngredient;
//   }

//   async findBy(params: Partial<RawIngredient>): Promise<RawIngredient | null> {
//     return this.rawIngredients.find((rawIngredient) =>
//       Object.entries(params).every(
//         ([key, value]) => rawIngredient[key] === value,
//       ),
//     );
//   }

//   async findAllBy(params: Partial<RawIngredient>): Promise<RawIngredient[]> {
//     return this.rawIngredients.filter((rawIngredient) =>
//       Object.entries(params).every(
//         ([key, value]) => rawIngredient[key] === value,
//       ),
//     );
//   }
// }
