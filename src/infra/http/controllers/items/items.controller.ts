import { Body, Controller, Get, Post, Query, UseFilters } from '@nestjs/common';
import { CreateItemFromRatiosUseCase } from '../../../../core/application/item/create-item-from-ratios.use-case';
import { CreateItemFromRatiosDto } from './dtos/create-item-from-ratios.dto';
import { ItemSerializer } from '../../../../utils/serializers/item.serializer';
import { CreateItemFromAbsoluteValuesUseCase } from '../../../../core/application/item/create-item-from-absolute-values.use-case';
import { CreateItemFromAbsoluteValuesDto } from './dtos/create-item-from-absolute-values.dto';
import { CreateCompositeItemUseCase } from '../../../../core/application/item/create-composite-item.use-case';
import { CreateCompositeItemDto } from './dtos/create-composite-item.dto';
import { SearchPublicItemsUseCase } from '../../../../core/application/item/search-public-items.use-case';
import { GetItemsDto } from './dtos/get-items.dto';
import { CalculateNutritionalValuesDto } from './dtos/calculate-nutritional-values.dto';
import {
  NutritionalValuesSerialized,
  NutritionalValuesSerializer,
} from '../../../../utils/serializers/nutritional-values.serializer';
import { CalculateNutritionalValuesUseCase } from '../../../../core/application/item/calculate-nutritional-values.use-case';
import { ItemNotFoundExceptionFilter } from '../../exception-filters/item-not-found.exception-filter';

@Controller('items')
export class ItemsController {
  constructor(
    private createItemFromRatiosUseCase: CreateItemFromRatiosUseCase,
    private createItemFromAbsoluteValuesUseCase: CreateItemFromAbsoluteValuesUseCase,
    private createCompositeItemUseCase: CreateCompositeItemUseCase,
    private getItemsUseCase: SearchPublicItemsUseCase,
    private calculateNutritionalValuesUseCase: CalculateNutritionalValuesUseCase,
  ) {}

  @Post('create-from-ratios')
  async createItemFromRatios(@Body() createItemDto: CreateItemFromRatiosDto) {
    const item = await this.createItemFromRatiosUseCase.execute(createItemDto);

    return ItemSerializer.serialize(item);
  }

  @Post('create-from-absolute-values')
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
  async getItems(@Query() getItemsDto: GetItemsDto) {
    const items = await this.getItemsUseCase.execute(getItemsDto);

    return items.map(ItemSerializer.serialize);
  }

  @Post('calculate-nutritional-values')
  @UseFilters(ItemNotFoundExceptionFilter)
  async create(
    @Body()
    calculateNutritionalValuesDto: CalculateNutritionalValuesDto,
  ): Promise<NutritionalValuesSerialized> {
    const nutritionalSnapshot =
      await this.calculateNutritionalValuesUseCase.execute(
        calculateNutritionalValuesDto,
      );

    return NutritionalValuesSerializer.serialize(nutritionalSnapshot);
  }
}
