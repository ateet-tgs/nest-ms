import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [SharedConfigModule, DatabaseModule, ControllersModule],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
