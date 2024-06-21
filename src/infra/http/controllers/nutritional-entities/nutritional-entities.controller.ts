import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
// import { CalculateNutritionalValuesUseCase } from '../../../../core/application/nutritional_entity/calculate-nutritional-values.use-case';
// import { CalculateNutritionalValuesSingleDto } from './dto/create.dto';
// import {
//   NutritionalValuesSerialized,
//   NutritionalValuesSerializer,
// } from '../../../../utils/serializers/nutritional-values.serializer';
import { NutritionalEntityNotFoundExceptionFilter } from '../../exception-filters';
import { GetAllNutritionalEntitiesUseCase } from '../../../../core/application/nutritional_entity/get-all-nutritional-entities.use-case';
import { NutritionalEntityType } from '../../../../utils/enums/nutritional-entity-type.enum';
import { RawIngredientSerializer } from '../../../../utils/serializers/raw-ingredient.serializer';
import { CookedDishSerializer } from '../../../../utils/serializers/cooked-dish.serializer';
import { NutritionalEntitySerialized } from '../../../../utils/serializers/nutritional-entity.serializer';

type GetAllReturnType = {
  type: NutritionalEntityType;
  values: NutritionalEntitySerialized[];
};

@Controller('nutritional-entities')
export class NutritionalEntitiesController {
  constructor(
    // private calculateNutritionalValuesUseCase: CalculateNutritionalValuesUseCase,
    private getAllNutritionalEntitiesUseCase: GetAllNutritionalEntitiesUseCase,
  ) {}

  @Get('get-all')
  @UseFilters(NutritionalEntityNotFoundExceptionFilter)
  async getAll(): Promise<GetAllReturnType[]> {
    const nutritionalEntities =
      await this.getAllNutritionalEntitiesUseCase.execute();

    return nutritionalEntities.map(({ type, values }) => {
      return {
        type,
        values: values.map((nutritionalEntity) => {
          if (type === NutritionalEntityType.RawIngredient) {
            return RawIngredientSerializer.serialize(nutritionalEntity);
          }

          return CookedDishSerializer.serialize(nutritionalEntity);
        }),
      };
    });
  }

  // @Post('calculate-nutritional-values')
  // @UseFilters(NutritionalEntityNotFoundExceptionFilter)
  // async create(
  //   @Body()
  //   calculateNutritionalValuesDto: CalculateNutritionalValuesSingleDto[],
  // ): Promise<NutritionalValuesSerialized> {
  //   const nutritionalSnapshot =
  //     await this.calculateNutritionalValuesUseCase.execute(
  //       calculateNutritionalValuesDto,
  //     );

  //   return NutritionalValuesSerializer.serialize(nutritionalSnapshot);
  // }
}
