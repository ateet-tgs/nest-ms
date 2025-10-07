import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import type { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private client: ClientProxy,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async getHello(): Promise<string> {
    const currentDate = new Date();
    const msg = `Current Date and Time: ${currentDate.toISOString()}`;
    return msg;
  }

  async sendMessage() {
    return this.client.emit('hello_event', { text: 'Hello from App1' });
  }
}
