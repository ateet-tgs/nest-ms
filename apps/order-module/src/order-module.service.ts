import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderModuleService {
  getHello(): string {
    return 'Hello World!';
  }
}
