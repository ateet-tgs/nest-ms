import * as yup from 'yup';

const ORDER_STATUSES = [
  'pending',
  'processing',
  'completed',
  'failed',
] as const;

// Define the schema for each item in the order
const orderItemSchema = yup.object({
  sku: yup.string().required('SKU is required'),
  name: yup.string().required('Item name is required'),
  qty: yup
    .number()
    .integer('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1')
    .required('Quantity is required'),
  price: yup
    .number()
    .min(0, 'Price cannot be negative')
    .required('Price is required'),
});

// Define the schema for shipping details
const shippingSchema = yup.object({
  method: yup.string().required('Shipping method is required'),
  tracking: yup.string().required('Tracking number is required'),
  address: yup.string().required('Shipping address is required'),
});

// Full orderDetails schema
const orderDetailsSchema = yup.object({
  items: yup
    .array()
    .of(orderItemSchema)
    .min(1, 'At least one item is required')
    .required('Items are required'),
  shipping: shippingSchema.required('Shipping details are required'),
});

export const createOrderSchema = orderDetailsSchema.required(
  'Order details are required',
);
