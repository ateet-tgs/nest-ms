import { Module } from '@nestjs/common';
import { AuthService } from './auth-service.service';
import { SharedConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { AuthController } from './auth-service.controller';

@Module({
  imports: [SharedConfigModule, DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthServiceModule {}
