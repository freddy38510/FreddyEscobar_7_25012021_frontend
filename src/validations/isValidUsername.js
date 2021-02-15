import { required } from '../utils/customValidationRules';

export default function isValidUsername(username) {
  if (!required(username)) {
    return '* Nom d\'utilisateur requis';
  }

  if (username.length < 3) {
    return 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
  }

  if (!username.match(/^[a-z0-9_-]{3,16}$/)) {
    return 'Le nom d\'utilisateur doit contenir uniquement des caractères alphanumériques et _ ou -';
  }

  return true;
}
