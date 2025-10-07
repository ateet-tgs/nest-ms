import * as yup from 'yup';
import { createOrderSchema } from '../validators/order.validators';

export type CreateOrderDto = yup.InferType<typeof createOrderSchema>;
