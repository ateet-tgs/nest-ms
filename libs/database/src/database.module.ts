import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Customer, Item, Order, OrderProcessingLog } from './models';
import {
  CustomerActivityLog,
  CustomerActivityLogSchema,
  OrderAnalytics,
  OrderAnalyticsSchema,
} from './schemas';

@Module({
  imports: [
    // Sequelize (SQL)
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: config.get<'mysql' | 'postgres'>('DB_DIALECT') || 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        autoLoadModels: true,
        models: [Customer, Order, OrderProcessingLog, Item],
        synchronize: true, // not recommended for prod
        logging: false,
      }),
    }),

    // Mongoose (Mongo)
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),

    MongooseModule.forFeature([
      { name: OrderAnalytics.name, schema: OrderAnalyticsSchema },
      { name: CustomerActivityLog.name, schema: CustomerActivityLogSchema },
    ]),
  ],
  exports: [SequelizeModule, MongooseModule],
})
export class DatabaseModule {}
