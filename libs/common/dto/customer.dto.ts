import * as yup from 'yup';
import { createCustomerValidator } from '../validators/customer.validator';

export type CreateCustomerDto = yup.InferType<typeof createCustomerValidator>;
export type UpdateCustomerDto = yup.InferType<typeof createCustomerValidator>;
