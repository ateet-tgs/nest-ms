import * as yup from 'yup';

export const createItemSchema = yup.object({
  name: yup
    .string()
    .required('Item name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  sku: yup
    .string()
    .required('SKU is required')
    .max(50, 'SKU cannot exceed 50 characters'),
  description: yup
    .string()
    .optional()
    .max(1000, 'Description cannot exceed 1000 characters'),
  price: yup
    .number()
    .required('Price is required')
    .min(0, 'Price must be greater than or equal to 0'),
  stockQuantity: yup
    .number()
    .required('Stock quantity is required')
    .min(0, 'Stock quantity must be >= 0')
    .integer('Stock quantity must be an integer'),
  metadata: yup.object().optional(),
});

export const updateItemSchema = createItemSchema;
