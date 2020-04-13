import * as yup from 'yup';

export const addFormSchema = yup.object({
  file: yup.object().required(),
  title: yup.string().required(),
  category: yup.string().required(),
  tag: yup.string().required(),
  keyWords: yup.array(),
  description: yup.string(),
});

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});