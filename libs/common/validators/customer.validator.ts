import * as yup from 'yup';

export const createCustomerValidator = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .max(100, 'Name cannot exceed 100 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup
    .string()
    .optional()
    .max(15, 'Phone number cannot exceed 15 characters'),
});

export const updateCustomerValidator = createCustomerValidator;
