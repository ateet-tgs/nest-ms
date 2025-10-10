import { CustomerActivityLog } from '@app/database/schemas';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ActivityLoggerService {
  private readonly logger = new Logger(ActivityLoggerService.name);

  constructor(
    @InjectModel(CustomerActivityLog.name)
    private activityModel: Model<CustomerActivityLog>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async logEvent(data: any, source: string) {
    this.logger.log(`📥 Logging event from [${source}]: ${data.event}`);
    this.logger.log(data);
    console.log('-'.repeat(50));
    // await this.activityModel.create({ ...data, source });
  }
}
