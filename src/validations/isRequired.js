import { required } from '../utils/customValidationRules';

export default function isRequired(error) {
  return (field) => {
    if (!required(field)) {
      return error;
    }

    return true;
  };
}
