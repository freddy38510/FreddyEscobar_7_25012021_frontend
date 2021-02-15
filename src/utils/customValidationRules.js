import { req } from 'vuelidate/src/validators/common';

export const required = (value) => {
  if (typeof value === 'string') {
    return req(value.trim());
  }
  return req(value);
};

export default {
  required,
};
