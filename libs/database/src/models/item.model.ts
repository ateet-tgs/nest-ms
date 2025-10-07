import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  Unique,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table({
  tableName: 'items',
  timestamps: true, // createdAt & updatedAt
})
export class Item extends Model<Item> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
  })
  sku: string;

  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
  })
  description?: string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  price: number;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  stockQuantity: number;

  @AllowNull(true)
  @Column({
    type: DataType.JSON,
  })
  metadata?: Record<string, any>;
}
