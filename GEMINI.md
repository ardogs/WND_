# WND (Windows & Doors) - Guía y Contexto del Proyecto

Bienvenido al repositorio de **WND (Windows & Doors)**. Este documento proporciona una visión general integral de la arquitectura, tecnologías, estructura de archivos, comandos de desarrollo y convenciones de código para desarrolladores y asistentes de IA.

---

## 1. Visión General del Proyecto

**WND** es una aplicación de escritorio multiplataforma diseñada para la gestión empresarial de ventanas y puertas. Permite administrar cotizaciones, facturación, proveedores/empresas y personalización integral del sistema.

### Tecnologías Principales
- **Entorno de Escritorio**: [Electron 38](https://www.electronjs.org/) (Ventana frameless con barra de título personalizada, backend Express integrado en el Main Process e IPC seguro mediante `contextBridge`).
- **Backend Integrado**: [Express 5](https://expressjs.com/) + [TypeScript 5.6](https://www.typescriptlang.org/) + [Mongoose 9](https://mongoosejs.com/) + [ExcelJS](https://github.com/exceljs/exceljs) + [JWT](https://jwt.io/) (ejecutado en segundo plano en Electron).
- **Frontend**: [React 19](https://react.dev/) + [TypeScript 5.6](https://www.typescriptlang.org/) + [Vite 6](https://vitejs.dev/) (con `@vitejs/plugin-react-swc`).
- **Librería y Sistema de UI**: [Tailwind CSS 3](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (basado en primitivas de [Radix UI](https://www.radix-ui.com/), `class-variance-authority`, `clsx` y `tailwind-merge`) con tokens de diseño HSL y soporte de temas claro/oscuro.
- **Formularios y Validación**: [React Hook Form 7](https://react-hook-form.com/) + [Zod 3](https://zod.dev/) + `@hookform/resolvers`.
- **Tablas de Datos**: [TanStack Table 9](https://tanstack.com/table) (`@tanstack/react-table`).
- **Notificaciones y Toasts**: [Sonner 2](https://sonner.emilkowal.ski/).
- **Gestor de Estado**: [Zustand 5](https://github.com/pmndrs/zustand) (stores modulares e independientes).
- **Enrutamiento**: [React Router DOM 7](https://reactrouter.com/) (utilizando `createBrowserRouter`, loaders asíncronos y hydration fallbacks con `LoadingScreen`).
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) + [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) + [Sass (SCSS)](https://sass-lang.com/) complementario.
- **Internacionalización**: [i18next 26](https://www.i18next.com/) + [react-i18next 16](https://react.i18next.com/) + `i18next-http-backend` (Español `es`, Inglés `en`, Coreano `kr`).
- **Animaciones e Iconografía**: [Framer Motion 12](https://www.framer.com/motion/), [Lottie React](https://github.com/Gamote/lottie-react), [Lucide React](https://lucide.dev/) y [React Icons 5](https://react-icons.github.io/react-icons/).
- **Transiciones de Tema**: View Transitions API (`helpers/themeTransition.ts`) con efecto de onda circular (*circular reveal*) y soporte para preferencias de reducción de movimiento.
- **Peticiones HTTP**: [Axios 1.x](https://axios-http.com/) con interceptores para inyección dinámica de `baseURL` y tokens Bearer.

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
│   ├── api/                        # Servicios de comunicación con el backend Express (companies, quotations, settings)
│   ├── assets/                     # Imágenes, logos y animaciones Lottie
│   ├── components/                 # Componentes UI organizados por arquitectura
│   │   ├── atoms/                  # Componentes atómicos que envuelven primitivas UI
│   │   ├── molecules/              # Moléculas (controlButtons, iconButtonMenu, titleWithDescription, etc.)
│   │   ├── organisms/              # Organismos (companyDataSelector, titlebar, steps, loadingScreen, popConfirm, error)
│   │   ├── layout/                 # Layouts y contenedores (WNDLayout, AnimatedPage)
│   │   └── ui/                     # Primitivas shadcn/ui (button, card, dialog, form, input, select, table, tabs, sonner, etc.)
│   ├── features/                   # Módulos de negocio y características
│   │   ├── companies/              # Módulo de empresas/proveedores (páginas, hooks, esquemas Zod, tipos)
│   │   ├── home/                   # Vista de inicio y accesos directos
│   │   ├── invoices/               # Módulo de facturación
│   │   ├── quotations/             # Módulo de cotizaciones (wizard, formularios, esquemas Zod, preview, revisión)
│   │   └── settings/               # Configuración del sistema (tema, idioma, API, conexión, información técnica)
│   ├── helpers/                    # Funciones de ayuda (formato KRW, manejo de errores, themeTransition)
│   ├── hooks/                      # Custom hooks (companies, navbar, settings, steps, theme, etc.)
│   ├── Interfaces/                 # Tipos globales e interfaces Window/Electron
│   ├── lib/                        # Inicialización de i18n y utilidades (`cn` de tailwind-merge/clsx)
│   ├── providers/                  # Providers (ThemeProvider, AnimationProvider, axiosInstance)
│   ├── routes/                     # Configuración de rutas (router.tsx con data loaders)
│   ├── store/                      # Stores de Zustand (companies, quotation, settings, steps)
│   ├── WNDApp.tsx                  # Componente raíz de la aplicación
│   ├── index.css                   # Variables CSS HSL para temas (light/dark) y directivas Tailwind
│   └── main.tsx                    # Punto de entrada de React
├── .env                            # Variables de entorno locales
├── .env.example                    # Ejemplo de variables de entorno
├── eslint.config.js                # Configuración de ESLint 9
├── package.json                    # Dependencias y scripts de ejecución
├── tailwind.config.js              # Configuración de Tailwind CSS, animaciones y tokens HSL
├── tsconfig.app.json               # Configuración TypeScript para Frontend (con alias `@/*`)
├── tsconfig.electron.json          # Configuración TypeScript para Backend (CommonJS)
├── tsconfig.json                   # Configuración base de TypeScript
└── vite.config.ts                  # Configuración del bundler Vite con React SWC y alias de rutas
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
| `npm run start:electron` | Compila el servidor, espera a Vite (`wait-on`) y arranca Electron. |
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
- La ventana principal es frameless (`frame: false`) con una barra de título personalizada (`TitleBar`).
- `electron/preload.js` expone de forma segura `window.electronAPI`:
  - `minimize()`: Minimiza la ventana.
  - `maximize()`: Alterna entre maximizar y restaurar.
  - `close()`: Cierra la ventana.
  - `getSystemInfo()`: Retorna especificaciones de hardware/SO (CPU, memoria, versiones de Chrome, Electron y Node).

### 4.3. Sistema de Diseño y Componentes UI
- **Capa Base (shadcn/ui & Radix UI)**: Primitivas accesibles en `src/components/ui/` utilizando `class-variance-authority` y Tailwind CSS.
- **Capa Atómica (Atomic Design)**: Los componentes en `src/components/atoms`, `molecules` y `organisms` proporcionan una API consistente y flexible para las vistas y features.
- **Variables de Tema HSL**: Definidas en `src/index.css` para soportar de forma nativa temas claro y oscuro mediante la clase `.dark`.
- **Transición de Temas**: `helpers/themeTransition.ts` utiliza la **View Transitions API** con cálculo de radio euclidiano para producir una animación de expansión circular suave desde el botón pulsado.
- **Feedback Global**: `sonner` (`<Toaster />`) configurado en `ThemeProvider` con soporte enriquecido de colores y cierre manual.

### 4.4. Formularios y Validación de Datos
- Integración de **React Hook Form** junto con esquemas fuertemente tipados en **Zod**:
  - `companySchema` (`src/features/companies/schemas/company.schema.ts`): Validación completa de campos fiscales, datos de contacto y logos de empresas/proveedores.
  - `quotationSchema` y `quotationItemSchema` (`src/features/quotations/schemas/quotation.schema.ts`): Validación estricta de insumos, cantidades, cálculos de IVA, precios de suministro y datos generales de cotización.

### 4.5. Estado Global con Zustand
- `useSettingsStore`: Controla modo oscuro, tamaño de fuente tipográfico, idioma activo (con sincronización en `i18n`), URL de API (`http://localhost:3000`), estado de conexión, versión de la app y telemetría del sistema obtenida por IPC.
- `useAuthStore`: Persistencia del token JWT de la API.
- `useCompaniesStore`: Gestión de proveedores, carga asíncrona (`fetchCompanies`), selección activa (`registration_number_id`) y operaciones de actualización (`updateSupplier`).
- `useQuotationStore`: Modo de edición/creación, flags de cálculo automático (IVA por ítem, precio de suministro, total antes de impuestos, IVA total y precio global) y envío a la API (`sendQuotationData` / `saveQuotation`).
- `useStepsStore`: Control de navegación secuencial por pasos en wizards.
