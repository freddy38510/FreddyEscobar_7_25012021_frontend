import { required } from '../utils/customValidationRules';

export default function isValidPassword(password) {
  if (!required(password)) {
    return '* Mot de passe requis';
  }

  if (password.length < 8) {
    return 'Veuillez entrer un mot de passe contenant au moins 8 caractères';
  }

  if (!password.match(/\d/)) {
    return 'Veuillez entrer un mot de passe contenant au moins un nombre';
  }

  if (!password.match(/[a-zA-Z]/)) {
    return 'Veuillez entrer un mot de passe contenant au moins une lettre';
  }

  return true;
}
