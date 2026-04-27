// Importa los módulos de traducción para obtener sus tipos
import 'react-i18next';
import common from '../../public/locales/es/common.json';
import settings from '../../public/locales/es/settings.json';

declare module 'react-i18next' {
    // Extiende la interfaz de recursos
    interface CustomTypeOptions {
        defaultNS: 'common';
        resources: {
            common: typeof common;
            settings: typeof settings;
        };
    }
}