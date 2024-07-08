import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ItemsController } from './controllers/items/items.controller';
import { CreateItemFromRatiosUseCase } from '../../core/application/item/create-item-from-ratios.use-case';
import { CreateItemFromAbsoluteValuesUseCase } from '../../core/application/item/create-item-from-absolute-values.use-case';
import { CreateCompositeItemUseCase } from '../../core/application/item/create-composite-item.use-case';
import { GetItemsUseCase } from '../../core/application/item/get-items.use-case';
import { CalculateNutritionalValuesUseCase } from '../../core/application/item/calculate-nutritional-values.use-case';
import { RegisterUseCase } from '../../core/application/authentication/register.use-case';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUseCase } from '../../core/application/authentication/login.use-case';
import { JwtStrategy } from '../../utils/guards/jwt-strategy';
import { GetProfileUseCase } from '../../core/application/authentication/get-profile.use-case';
import { CreateMealFromItemsUseCase } from '../../core/application/meal/create-meal-from-items.use-case';
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
    GetItemsUseCase,
    CalculateNutritionalValuesUseCase,
    RegisterUseCase,
    LoginUseCase,
    GetProfileUseCase,
    CreateMealFromItemsUseCase,
  ],
})
export class HttpModule {}
