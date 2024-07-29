import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CalculateNutritionalValuesUseCase } from '../../../../core/application/item/calculate-nutritional-values.use-case';
import { CreateCompositeItemUseCase } from '../../../../core/application/item/create-composite-item.use-case';
import { CreateItemFromAbsoluteValuesUseCase } from '../../../../core/application/item/create-item-from-absolute-values.use-case';
import { CreateItemFromRatiosUseCase } from '../../../../core/application/item/create-item-from-ratios.use-case';
import { GetItemUseCase } from '../../../../core/application/item/get-item.use-case';
import { SearchPrivateItemsUseCase } from '../../../../core/application/item/search-private-items.use-case';
import { SearchPublicItemsUseCase } from '../../../../core/application/item/search-public-items.use-case';
import { JwtAuthGuard } from '../../../../utils/guards/jwt-auth.guard';
import { ItemSerializer } from '../../../../utils/serializers/item.serializer';
import {
  NutritionalValuesSerialized,
  NutritionalValuesSerializer,
} from '../../../../utils/serializers/nutritional-values.serializer';
import { ItemNotFoundExceptionFilter } from '../../exception-filters/item-not-found.exception-filter';
import { CalculateNutritionalValuesDto } from './dtos/calculate-nutritional-values.dto';
import { CreateCompositeItemDto } from './dtos/create-composite-item.dto';
import { CreateItemFromAbsoluteValuesDto } from './dtos/create-item-from-absolute-values.dto';
import { CreateItemFromRatiosDto } from './dtos/create-item-from-ratios.dto';
import { SearchPrivateItemsDto } from './dtos/search-private-items.dto';
import { SearchPublicItemsDto } from './dtos/search-public-items.dto';

@Controller('items')
export class ItemsController {
  constructor(
    private createItemFromRatiosUseCase: CreateItemFromRatiosUseCase,
    private createItemFromAbsoluteValuesUseCase: CreateItemFromAbsoluteValuesUseCase,
    private createCompositeItemUseCase: CreateCompositeItemUseCase,
    private searchPublicItemsUseCase: SearchPublicItemsUseCase,
    private searchPrivateItemsUseCase: SearchPrivateItemsUseCase,
    private getItemUseCase: GetItemUseCase,
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

  @Get('search')
  async searchPublicItems(@Query() searchPublicItemsDto: SearchPublicItemsDto) {
    const items =
      await this.searchPublicItemsUseCase.execute(searchPublicItemsDto);

    return items.map(ItemSerializer.serialize);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search-private')
  async searchPrivateItems(
    @Query() searchPrivateItemsDto: SearchPrivateItemsDto,
    @Request() req,
  ) {
    console.log('req.user:', req.user);

    const items = await this.searchPrivateItemsUseCase.execute({
      name: searchPrivateItemsDto.name,
      userId: req.user.id,
    });

    return items.map(ItemSerializer.serialize);
  }

  @Get(':id')
  @UseFilters(ItemNotFoundExceptionFilter)
  async getItem(@Param('id') id: string) {
    const item = await this.getItemUseCase.execute({ id });

    return ItemSerializer.serialize(item);
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
