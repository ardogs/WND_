# WND (Windows & Doors) - Guía y Contexto del Proyecto

Bienvenido al repositorio de **WND (Windows & Doors)**. Este documento proporciona una visión general integral de la arquitectura, tecnologías, estructura de archivos, comandos de desarrollo y convenciones de código para desarrolladores y asistentes de IA.

---

## 1. Visión General del Proyecto

**WND** es una aplicación de escritorio multiplataforma diseñada para la gestión empresarial de ventanas y puertas. Permite administrar cotizaciones, facturación, proveedores/empresas y personalización del sistema.

### Tecnologías Principales
- **Entorno de Escritorio**: [Electron 38](https://www.electronjs.org/) (Ventana frameless con barra de título personalizada, backend Express integrado en el Main Process e IPC seguro mediante `contextBridge`).
- **Backend Integrado**: [Express 5](https://expressjs.com/) + [TypeScript 5.6](https://www.typescriptlang.org/) + [Mongoose 9](https://mongoosejs.com/) + [ExcelJS](https://github.com/exceljs/exceljs) + [JWT](https://jwt.io/) (ejecutado en segundo plano en Electron).
- **Frontend**: [React 19](https://react.dev/) + [TypeScript 5.6](https://www.typescriptlang.org/) + [Vite 6](https://vitejs.dev/) (con `@vitejs/plugin-react-swc`).
- **Librería de Componentes UI**: [Ant Design 5 (antd)](https://ant.design/) con tokens de diseño personalizados y soporte dinámico de temas claro/oscuro.
- **Gestor de Estado**: [Zustand 5](https://github.com/pmndrs/zustand) (stores modulares e independientes).
- **Enrutamiento**: [React Router DOM 7](https://reactrouter.com/) (utilizando `createBrowserRouter`, loaders asíncronos y hydration fallbacks).
- **Estilos**: [Sass (SCSS)](https://sass-lang.com/) + Ant Design Design Tokens.
- **Internacionalización**: [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) + `i18next-http-backend` (Español `es`, Inglés `en`, Coreano `kr`).
- **Animaciones e Iconografía**: [Framer Motion 12](https://www.framer.com/motion/), [Lottie React](https://github.com/Gamote/lottie-react), [React Icons](https://react-icons.github.io/react-icons/).
- **Peticiones HTTP**: [Axios 1.x](https://axios-http.com/) con interceptor dinámico para inyección de `baseURL` y tokens Bearer.

---

## 2. Estructura del Proyecto

```text
WND/
├── electron/                       # Proceso principal, preload y Backend Express
│   ├── dist/                       # Backend compilado a CommonJS (server.js, app.js, etc.)
│   ├── src/                        # Código fuente TypeScript de la API Express
│   │   ├── config/                 # Conexión DB (db.ts), seeders (seed.ts) y rutas seguras (paths.ts)
│   │   ├── controllers/            # Controladores (auth, quotation, settings, supplier, test)
│   │   ├── middlewares/            # Middleware de autenticación JWT (auth.ts)
│   │   ├── models/                 # Modelos de Mongoose (quotation, settings, supplier)
│   │   ├── routes/                 # Enrutadores Express (auth, quotation, settings, supplier, test)
│   │   ├── types/                  # Tipos TypeScript de la API
│   │   ├── app.ts                  # Configuración de Express y middlewares
│   │   └── server.ts               # Arranque/parada del servidor y conexión a DB
│   ├── main.cjs                    # Ciclo de vida de Electron, arranque de API e IPC handlers
│   ├── package.json                # Configuración CJS para el entorno Electron
│   └── preload.js                  # Exposición segura de electronAPI al contexto window
├── public/
│   ├── locales/                    # Archivos JSON de traducción i18n (en, es, kr)
│   └── templates/                  # Plantillas estáticas (template_quotation.xlsx)
├── src/                            # Frontend React
│   ├── api/                        # Servicios de comunicación con el backend Express
│   ├── assets/                     # Imágenes, logos y animaciones Lottie
│   ├── components/                 # Atomic Design (atoms, molecules, organisms, layout)
│   ├── features/                   # Módulos de negocio (companies, home, invoices, quotations, settings)
│   ├── helpers/                    # Funciones de ayuda (formato KRW, manejo de errores)
│   ├── hooks/                      # Custom hooks
│   ├── Interfaces/                 # Tipos globales e interfaces Window/Electron
│   ├── lib/                        # Inicialización de i18n
│   ├── providers/                  # ThemeProvider y axiosInstance
│   ├── routes/                     # Enrutador (router.tsx)
│   ├── store/                      # Stores Zustand (companies, quotation, settings, steps)
│   ├── WNDApp.tsx                  # Componente raíz
│   └── main.tsx                    # Punto de entrada de React
├── .env                            # Variables de entorno locales
├── .env.example                    # Ejemplo de variables de entorno
├── eslint.config.js                # Configuración de ESLint 9
├── package.json                    # Dependencias y scripts de ejecución
├── tsconfig.app.json               # Configuración TypeScript para Frontend
├── tsconfig.electron.json          # Configuración TypeScript para Backend (CommonJS)
├── tsconfig.json                   # Configuración base de TypeScript
└── vite.config.ts                  # Configuración del bundler Vite con React SWC
```

---

## 3. Comandos de Desarrollo y Construcción

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo de Vite (interfaz web en `http://localhost:5173`). |
| `npm run build:server` | Compila el backend Express de `electron/src/` a CommonJS en `electron/dist/`. |
| `npm run build:ui` | Compila el frontend React con TypeScript y Vite a `dist/`. |
| `npm run build` | Compila tanto el servidor backend como la interfaz de usuario. |
| `npm run start:react` | Alias para iniciar Vite. |
| `npm run start:electron` | Compila el servidor, espera a Vite y arranca Electron. |
| `npm run dev:electron` | **Recomendado para desarrollo**: ejecuta concurrentemente Vite y Electron. |
| `npm run build:electron` | Compila todo y genera los ejecutables con `electron-builder`. |
| `npm run lint` | Ejecuta ESLint para comprobar estándares de código. |

---

## 4. Arquitectura y Patrones Clave

### 4.1. Integración Backend Express en Electron
- `electron/main.cjs` carga `.env` dinámicamente y ejecuta `startServer()` de `electron/dist/server.js` dentro del evento `app.whenReady()` antes de abrir la ventana.
- Al cerrar todas las ventanas, `stopServer()` cierra el servidor HTTP y desconecta la sesión de MongoDB.
- Las rutas del sistema de archivos están centralizadas en `electron/src/config/paths.ts`:
  - Plantilla Excel: resuelta con `getTemplatePath()` buscando en `public/templates/`, `dist/templates/` o `resourcesPath`.
  - Archivos Temporales: resueltos con `getTempDir()` usando `app.getPath('temp')/wnd_temp`.

### 4.2. Comunicación Electron <-> React (IPC)
- La ventana principal es frameless (`frame: false`).
- `electron/preload.js` expone de forma segura `window.electronAPI`:
  - `minimize()`: Minimiza la ventana.
  - `maximize()`: Alterna entre maximizar y restaurar.
  - `close()`: Cierra la ventana.
  - `getSystemInfo()`: Retorna especificaciones de hardware/SO (CPU, memoria, versiones).

### 4.3. Estado Global con Zustand
- `useSettingsStore`: Modo oscuro, tamaño de fuente, idioma, URL de API (`http://localhost:3000`), estado de conexión y telemetría.
- `useAuthStore`: Persistencia del token JWT de la API.
- `useCompaniesStore`: Gestión de proveedores y CRUD.
- `useQuotationStore`: Control de cálculos automáticos y generación de cotizaciones.
- `useStepsStore`: Control de pasos en wizards.
