import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { SharedConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [SharedConfigModule, DatabaseModule],
  controllers: [AuthServiceController],
  providers: [AuthServiceService],
})
export class AuthServiceModule {}
