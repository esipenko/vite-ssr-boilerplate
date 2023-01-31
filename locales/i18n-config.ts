import { createI18n } from 'vue-i18n';
import ru from './ru';
import en from './en';

// Русский всегда дефолтный язык, если добавляются ключи
// не забудем добавить и в остальные языки
type MessageSchema = typeof ru;

const i18n = createI18n<[MessageSchema], 'ru' | 'en'>({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'ru',
  fallbackLocale: 'ru',
  messages: {
    ru,
    en,
  },
});

export default i18n;
