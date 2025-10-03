import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'customer_activity_logs',
})
export class CustomerActivityLog extends Document {
  @Prop({ required: true })
  customerId: string; // corresponds to SQL customer.id

  @Prop({ required: true })
  action: string; // e.g. 'VIEWED_PRODUCT', 'PLACED_ORDER', 'CANCELLED_ORDER'

  @Prop({ type: Object, default: {} })
  metadata: Record<string, any>; // flexible payload — e.g. productId, page, etc.

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const CustomerActivityLogSchema =
  SchemaFactory.createForClass(CustomerActivityLog);
