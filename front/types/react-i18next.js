import 'react-i18next';

import common from '../public/locales/fr/common.json';
import errors from '../public/locales/fr/errors.json';
import form from '../public/locales/fr/form.json';

export const resources = {
  fr: {
    ...common,
    ...errors,
    ...form,
  },
} 
