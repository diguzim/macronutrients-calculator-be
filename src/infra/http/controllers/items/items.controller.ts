import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { CreateItemFromRatiosUseCase } from '../../../../core/application/item/create-item-from-ratios.use-case';
import { MacroNutrientRatioGreaterThanOneExceptionFilter } from '../../exception-filters';
import { CreateItemFromRatiosDto } from './dtos/create-item-from-ratios.dto';
import { ItemSerializer } from '../../../../utils/serializers/item.serializer';
import { CreateItemFromAbsoluteValuesUseCase } from '../../../../core/application/item/create-item-from-absolute-values.use-case';
import { CreateItemFromAbsoluteValuesDto } from './dtos/create-item-from-absolute-values.dto';
import { CreateCompositeItemUseCase } from '../../../../core/application/item/create-composite-item.use-case';
import { CreateCompositeItemDto } from './dtos/create-composite-item.dto';
import { GetItemsUseCase } from '../../../../core/application/item/get-items.use-case';
import { GetItemsDto } from './dtos/get-items.dto';

@Controller('items')
export class ItemsController {
  constructor(
    private createItemFromRatiosUseCase: CreateItemFromRatiosUseCase,
    private createItemFromAbsoluteValuesUseCase: CreateItemFromAbsoluteValuesUseCase,
    private createCompositeItemUseCase: CreateCompositeItemUseCase,
    private getItemsUseCase: GetItemsUseCase,
  ) {}

  @Post('create-from-ratios')
  @UseFilters(MacroNutrientRatioGreaterThanOneExceptionFilter)
  async createItemFromRatios(@Body() createItemDto: CreateItemFromRatiosDto) {
    const item = await this.createItemFromRatiosUseCase.execute(createItemDto);

    return ItemSerializer.serialize(item);
  }

  @Post('create-from-absolute-values')
  @UseFilters(MacroNutrientRatioGreaterThanOneExceptionFilter)
  async createItemFromAbsoluteValues(
    @Body() createItemDto: CreateItemFromAbsoluteValuesDto,
  ) {
    const item =
      await this.createItemFromAbsoluteValuesUseCase.execute(createItemDto);

    return ItemSerializer.serialize(item);
  }

  @Post('create-from-composition')
  async createCompositeItem(@Body() createItemDto: CreateCompositeItemDto) {
    const item = await this.createCompositeItemUseCase.execute(createItemDto);

    return ItemSerializer.serialize(item);
  }

  @Get()
  async getItems(@Body() getItemsDto: GetItemsDto) {
    const items = await this.getItemsUseCase.execute(getItemsDto);

    return items.map(ItemSerializer.serialize);
  }
}
