import isEmail from 'validator/es/lib/isEmail';
import { required } from '../utils/customValidationRules';

export default function isValidEmail(email) {
  if (!required(email)) {
    return '* Adresse email requise';
  }

  if (!isEmail(email)) {
    return 'Veuillez entrer une adresse email valide';
  }

  return true;
}
