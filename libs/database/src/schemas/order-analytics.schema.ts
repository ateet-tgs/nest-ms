import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'order_analytics',
})
export class OrderAnalytics extends Document {
  @Prop({ required: true })
  datetime: string; // e.g. '2025-10-03 12:15:00' (daily aggregation)

  @Prop({ type: Number, default: 0 })
  totalOrders: number;

  @Prop({ type: Number, default: 0 })
  totalRevenue: number;

  @Prop({ type: Number, default: 0 })
  avgOrderValue: number;

  @Prop({
    type: [
      {
        productId: String,
        name: String,
        quantity: Number,
        revenue: Number,
      },
    ],
    default: [],
  })
  topProducts: Array<{
    productId: string;
    name: string;
    quantity: number;
    revenue: number;
  }>;
}

export const OrderAnalyticsSchema =
  SchemaFactory.createForClass(OrderAnalytics);
