import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [SharedConfigModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
