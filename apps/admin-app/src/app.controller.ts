import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CacheKey('products_cache')
  @CacheTTL(12000)
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('send')
  async sendMessage() {
    return this.appService.sendMessage();
  }
}
