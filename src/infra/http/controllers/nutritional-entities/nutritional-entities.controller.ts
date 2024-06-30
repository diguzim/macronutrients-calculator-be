import { Controller, Get, UseFilters } from '@nestjs/common';
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
}
