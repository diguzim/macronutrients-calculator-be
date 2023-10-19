import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CalculateNutritionalValuesUseCase } from '../../../../@core/application/nutritional_values/calculate-nutritional-values.use-case';
import { CalculateNutritionalValuesDto } from './dto/create.dto';
import {
  NutritionalValuesSerialized,
  NutritionalValuesSerializer,
} from '../../../../utils/serializers/nutritional-values.serializer';
import { NutritionalEntityNotFoundExceptionFilter } from '../../exception-filters';

@Controller('calculate-nutritional-values')
export class CalculateNutritionalValuesController {
  constructor(
    private calculateNutritionalValuesUseCase: CalculateNutritionalValuesUseCase,
  ) {}

  @Post()
  @UseFilters(NutritionalEntityNotFoundExceptionFilter)
  async create(
    @Body() calculateNutritionalValuesDto: CalculateNutritionalValuesDto,
  ): Promise<NutritionalValuesSerialized> {
    const nutritionalSnapshot =
      await this.calculateNutritionalValuesUseCase.execute(
        calculateNutritionalValuesDto,
      );

    return NutritionalValuesSerializer.serialize(nutritionalSnapshot);
  }
}
