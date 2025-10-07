import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import { Order } from './order.model';

@Table({ tableName: 'order_processing_logs', timestamps: true })
export class OrderProcessingLog extends Model<OrderProcessingLog> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  orderId: string;

  @BelongsTo(() => Order)
  order: Order;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  step: string; // e.g., validation, payment, invoice

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string; // success, error, etc.

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  logMessage: string;
}
