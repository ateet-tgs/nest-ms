import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  Default,
  Unique,
} from 'sequelize-typescript';
import { Order } from './order.model';

@Table({
  tableName: 'customers',
  timestamps: true, // adds createdAt / updatedAt
})
export class Customer extends Model<Customer> {
  @PrimaryKey
  @Default(DataType.UUIDV4) // or remove this if you're using INT autoincrement
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone?: string;

  @HasMany(() => Order)
  orders: Order[];
}
