import * as yup from 'yup';
import {
  createItemSchema,
  updateItemSchema,
} from '../validators/item.validators';

export type CreateItemDto = yup.InferType<typeof createItemSchema>;
export type UpdateItemDto = yup.InferType<typeof updateItemSchema>;
