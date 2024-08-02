import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GetProfileUseCase } from '../../core/application/authentication/get-profile.use-case';
import { LoginUseCase } from '../../core/application/authentication/login.use-case';
import { RegisterUseCase } from '../../core/application/authentication/register.use-case';
import { CalculateNutritionalValuesUseCase } from '../../core/application/item/calculate-nutritional-values.use-case';
import { CreateCompositeItemUseCase } from '../../core/application/item/create-composite-item.use-case';
import { CreateItemFromAbsoluteValuesUseCase } from '../../core/application/item/create-item-from-absolute-values.use-case';
import { CreateItemFromRatiosUseCase } from '../../core/application/item/create-item-from-ratios.use-case';
import { GetPrivateItemUseCase } from '../../core/application/item/get-private-item.use-case';
import { GetPublicItemUseCase } from '../../core/application/item/get-public-item.use-case';
import { SearchPrivateItemsUseCase } from '../../core/application/item/search-private-items.use-case';
import { SearchPublicItemsUseCase } from '../../core/application/item/search-public-items.use-case';
import { CreateMealFromItemsUseCase } from '../../core/application/meal/create-meal-from-items.use-case';
import { GetMealsUseCase } from '../../core/application/meal/get-meals.use-case';
import { JwtStrategy } from '../../utils/guards/jwt-strategy';
import { DatabaseModule } from '../database/database.module';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { ItemsController } from './controllers/items/items.controller';
import { MealsController } from './controllers/meals/meals.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ItemsController, AuthenticationController, MealsController],
  providers: [
    JwtStrategy,
    CreateItemFromRatiosUseCase,
    CreateItemFromAbsoluteValuesUseCase,
    CreateCompositeItemUseCase,
    SearchPublicItemsUseCase,
    SearchPrivateItemsUseCase,
    GetPublicItemUseCase,
    GetPrivateItemUseCase,
    CalculateNutritionalValuesUseCase,
    RegisterUseCase,
    LoginUseCase,
    GetProfileUseCase,
    CreateMealFromItemsUseCase,
    GetMealsUseCase,
  ],
})
export class HttpModule {}
