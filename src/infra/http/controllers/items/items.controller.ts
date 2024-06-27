import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateItemFromRatiosUseCase } from '../../../../core/application/item/create-item-from-ratios.use-case';
import { MacroNutrientRatioGreaterThanOneExceptionFilter } from '../../exception-filters';
import { CreateItemFromRatiosDto } from './dtos/create-item-from-ratios.dto';
import { ItemSerializer } from '../../../../utils/serializers/item.serializer';

@Controller('items')
export class ItemsController {
  constructor(
    private createItemFromAbsoluteValuesUseCase: CreateItemFromRatiosUseCase,
  ) {}

  @Post()
  @UseFilters(MacroNutrientRatioGreaterThanOneExceptionFilter)
  async create(@Body() createItemDto: CreateItemFromRatiosDto) {
    const item =
      await this.createItemFromAbsoluteValuesUseCase.execute(createItemDto);

    return ItemSerializer.serialize(item);
  }
}
