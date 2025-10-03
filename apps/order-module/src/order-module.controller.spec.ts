import { Test, TestingModule } from '@nestjs/testing';
import { OrderModuleController } from './order-module.controller';
import { OrderModuleService } from './order-module.service';

describe('OrderModuleController', () => {
  let orderModuleController: OrderModuleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderModuleController],
      providers: [OrderModuleService],
    }).compile();

    orderModuleController = app.get<OrderModuleController>(OrderModuleController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderModuleController.getHello()).toBe('Hello World!');
    });
  });
});
