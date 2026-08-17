# DESIGN.md - Documento de Arquitectura Visual y Sistema de Diseño (WND)

Este documento define la arquitectura visual, el sistema de diseño, el inventario de componentes y las especificaciones de interfaz de usuario para el proyecto **WND (Windows & Doors)**. Está diseñado como el contexto canónico para **Stitch** (y diseñadores/agentes de UI/UX) para guiar una renovación visual completa (*UI/UX revamp*) manteniendo la lógica de negocio y los contratos de datos intactos.

---

## 1. Sistema de Diseño Global y Temas

### 1.1. Configuración de Ant Design 5
El sistema utiliza [Ant Design 5](https://ant.design/) con tokens de diseño (*Design Tokens*) configurados dinámicamente en [`src/providers/theme/ThemeProvider.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/providers/theme/ThemeProvider.tsx).

El tema conmuta entre dos algoritmos base de Ant Design:
- **Tema Claro**: `theme.defaultAlgorithm`
- **Tema Oscuro**: `theme.darkAlgorithm`

Ambos temas se alimentan de paletas semánticas definidas en [`src/providers/theme/theme.ts`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/providers/theme/theme.ts):

| Token Semántico | Tema Claro (`lightTheme`) | Tema Oscuro (`darkTheme`) | Propósito UI |
| :--- | :--- | :--- | :--- |
| `colorPrimary` | `#0176D3` (Azul corporativo) | `#0176D3` (Azul corporativo) | Color de acción principal, botones primarios, focus y selección activa |
| `colorBgBase` | `#EAEAEA` (Gris neutro suave) | `#252525` (Gris carbón) | Fondo general de la aplicación |
| `colorBgContainer` | `#FCFCFC` (Blanco puro satinado) | `#2E2E2E` (Gris oscuro elevado) | Fondo de las tarjetas principales y contenedores de vista |
| `colorBgElevated` | `#F9F9F9` (Gris claro) | `#1E1E1E` (Gris casi negro) | Fondo de Header, Menús flotantes y popovers |
| `colorTextBase` | `#464747` (Gris grafito) | `#D9D9D9` (Gris plateado) | Color de texto principal |
| `colorTextHeading` | `#404040` (Gris antracita) | `#CED4DA` (Gris claro nítido) | Títulos y encabezados tipográficos |

#### Overrides por Componente en Ant Design Tokens:
- **Layout**:
  - `headerBg`: Vinculado a `color_1` (`#F9F9F9` / `#1E1E1E`).
  - `headerHeight`: `45px` (altura compacta para la barra de título frameless).
  - `headerPadding`: `0px`.
  - `bodyBg`: Vinculado a `color_2` (`#EAEAEA` / `#252525`).
- **Menu**:
  - `colorBgContainer`: Transparente o heredado del header (`#F9F9F9` / `#1E1E1E`).
  - `horizontalItemBorderRadius`: `10px`.
- **Tabs**:
  - `verticalItemMargin`: `10px 40px 5px 0px`.
  - `verticalItemPadding`: `5px 0px`.
  - `itemSelectedColor` / `itemHoverColor`: `#0176D3`.
  - `inkBarColor`: `#0176D3` o `colorTextBase`.

---

### 1.2. Tipografía Dinámica y Reglas Globales (CSS/SCSS)
- **Tipografía Dinámica**: Inyectada en el `token.fontSize` del `ConfigProvider` desde el store de Zustand (`useSettingsStore.fontSize`, valor por defecto: `15px`). La tipografía escala armónicamente en todos los componentes de Ant Design.
- **Reglas Globales ([`src/main.scss`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/main.scss))**:
  - `html, body, #root`: Ocupan el `100%` de altura con `overflow-y: hidden` y `border-radius: 10px` en la ventana principal.
  - `.shadow`: Sombra suave con elevación `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15)`.
  - `.scroll`: Scrollbar personalizado moderno con esquinas redondeadas (`width: 8px`, `border-radius: 20px`, `thumb: #acacac`, `track: #f1f1f1`).

---

### 1.3. Animaciones y Micro-interacciones
- **Framer Motion 12**:
  - Encapsulado en [`AnimatedPage.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/components/layout/AnimatedPage.tsx) mediante `<motion.div>` con variantes de opacidad (`initial: { opacity: 0 }`, `animate: { opacity: 1 }`, `exit: { opacity: 0 }`, `duration: 0.3s`).
  - Orquestado en [`WNDLayout.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/components/layout/WNDLayout.tsx) con `<AnimatePresence mode="wait">` donde cada página se renderiza según la ruta activa (`key={location.pathname}`).
- **Lottie React**:
  - Renderizado mediante [`AnimationProvider.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/providers/animation/AnimationProvider.tsx).
  - Recursos Lottie disponibles en `src/assets/animations/`:
    - `file_transfer.json`: Animación de transferencia/creación de archivos Excel/PDF en el paso final de cotizaciones.
    - `404Error.json`: Pantalla de fallback y rutas no encontradas (`Error.tsx`).
    - `underConstruction.json`: Secciones en desarrollo.

---

## 2. Estructura de Layout Principal (Shell)

El layout de la aplicación es frameless (sin bordes nativos del sistema operativo) y se compone de dos áreas principales dentro de [`WNDLayout.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/components/layout/WNDLayout.tsx):

```text
+-------------------------------------------------------------------------------+
| Header (TitleBar.tsx - Frameless Drag Region: -webkit-app-region: drag)       |
| [Logo] [< > Navegación] [Cotizaciones | Facturación | Empresas]  [⚙] [-] [□] [X] |
+-------------------------------------------------------------------------------+
| Content Area (.main-view-div)                                                 |
|  +-------------------------------------------------------------------------+  |
|  | Card Contenedor Principal (.main-view-div-card con border-radius: 20px) |  |
|  |  +-------------------------------------------------------------------+  |  |
|  |  | <AnimatedPage> (Framer Motion AnimatePresence por Route Key)       |  |  |
|  |  | [Contenido dinámico de la vista activa: Dashboard/Form/Wizard]   |  |  |
|  |  +-------------------------------------------------------------------+  |  |
|  +-------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------+
```

### 2.1. TitleBar Personalizado ([`TitleBar.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/components/organisms/titlebar/TitleBar.tsx))
- **Región de Arrastre (`.drag-region`)**: Permite mover la ventana en el escritorio (`-webkit-app-region: drag`).
- **Regiones Interactivas (`.no-drag-region`)**:
  - **Izquierda**: Logo de WND (`logo_2.webp`), botones de navegación histórica (Home `/`, GoBack `-1` en [`NavigationButtons.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/components/molecules/navigationButtons/NavigationButtons.tsx)), y Menú horizontal con enlaces a `/quotations`, `/invoices` y `/companies`.
  - **Derecha ([`ControlButtons.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/components/molecules/controlButtons/ControlButtons.tsx))**:
    - Menú Popover de ajustes rápidos (Dark mode switch, selector de idioma y enlace a `/settings`).
    - Botones de control de ventana: Minimizar (`-`), Maximizar/Restaurar (`□`), Cerrar (`X` con hover en rojo).

---

## 3. Inventario de Componentes (Atomic Design)

Todos los componentes de interfaz reutilizables residen en `src/components/`:

### 3.1. Atoms (`src/components/atoms/`)
Wrappers estandarizados sobre Ant Design que aseguran el paso de props consistentes:
- **`Button`**: Wrapper de `antd.Button` con soporte de variantes (`primary`, `default`, `dashed`, `link`, `text`).
- **`IconButton`**: Botón circular/cuadrado especializado para iconos de acción.
- **`Input` / `InputNumber`**: Wrappers de `antd.Input` y `antd.InputNumber` con soporte para formateo monetario coreano (KRW).
- **`Card`**: Contenedor con soporte de elevación y bordes redondeados.
- **`Checkbox` / `Switch` / `Slider`**: Controles de selección y ajuste (usados en cálculo automático y ajustes).
- **`Table`**: Wrapper de `antd.Table` tipado con soporte de paginación y scroll vertical.
- **`Tabs`**: Wrapper de `antd.Tabs` con orientación horizontal o vertical.
- **`Title` / `Text`**: Wrappers tipográficos de `antd.Typography` vinculados a la jerarquía visual del tema.
- **`DatePicker`**: Selector de fechas de Ant Design.
- **`Descriptions`**: Visualizador de datos clave-valor para resúmenes.
- **`Divider`**: Separador visual con soporte para etiquetas de sección (`orientation="left"`).
- **`Flex` / `Row` / `Col`**: Primitivas de maquetación Flexbox y Grid de 24 columnas.
- **`Image`**: Wrapper para logos y recursos gráficos.
- **`Menu`**: Menú de navegación horizontal para el TitleBar.
- **`App`**: Proveedor contextual de Ant Design para toasts (`message`), alertas (`notification`) y modales (`Modal`).

### 3.2. Molecules (`src/components/molecules/`)
- **`TitleWithDescription`**: Cabecera de vista con título (`level={2}`) y subtítulo descriptivo (`Text type="secondary"`).
- **`NavigationButtons`**: Agrupación de botones para volver atrás y regresar a la vista raíz.
- **`ControlButtons`**: Agrupación de controles de ventana y menú popover de ajustes rápidos.
- **`IconButtonMenu`**: Popover que despliega una lista de opciones al hacer clic en un icono.

### 3.3. Organisms (`src/components/organisms/`)
- **`TitleBar`**: Cabecera completa de la ventana frameless.
- **`CompanyDataSelector`**: Organismo compuesto por:
  - `CompanyDocumentCard`: Tarjeta de identificación con logo de la empresa, selector dropdown y distintivo visual.
  - `CompanyDetailsForm`: Formulario de 2 columnas con los datos de registro (nombre comercial, representante legal, dirección, teléfono, web).
- **`Steps`**: Wizard secuencial para flujos guiados con botones de avance, retroceso y finalización.
- **`PopConfirm`**: Diálogo de confirmación para acciones críticas.
- **`LoadingScreen`**: Pantalla completa de carga con spinner y mensaje de hidratación inicial.
- **`Error`**: Vista de error (ErrorBoundary y rutas 404) con animación Lottie.

---

## 4. Análisis de Vistas por Feature (El Núcleo para Stitch)

### 4.1. Home / Dashboard ([`src/features/home/Home.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/features/home/Home.tsx))
- **Propósito**: Pantalla de bienvenida y panel principal de accesos rápidos y actividad reciente.
- **Datos Mostrados**:
  - Tarjetas de acceso directo a los 3 módulos clave: **Cotizaciones** (`/quotations`), **Facturación** (`/invoices`), **Mis empresas** (`/companies`).
  - Tabla de "Últimos documentos creados": columnas de Empresa, Cliente, Fecha, Precio Total y Acciones.
- **Elementos Interactivos**:
  - `LinkCard`: Tarjetas interactivas con efecto hover que navegan a los módulos.
  - `Table`: Tabla paginada con acciones de previsualización, edición y eliminación de cotizaciones recientes.

---

### 4.2. Companies / Mis Empresas ([`src/features/companies/`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/features/companies/))

#### A. Vista de Listado ([`src/features/companies/pages/main/Home.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/features/companies/pages/main/Home.tsx))
- **Propósito**: Visualizar y gestionar todas las empresas y proveedores registrados.
- **Datos Mostrados**: Vinculado al store `useCompaniesStore.companyData`. Muestra Número de registro (`registration_number`), Nombre comercial (`comercial_name`), Representante Legal (`legal_representative`).
- **Elementos Interactivos**:
  - Tabla con acciones: Icono de ver detalles (`companiesForm/view/:reg`) e icono de editar (`companiesForm/edit/:reg`).

#### B. Vista de Formulario / Detalle ([`CompaniesForm.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/features/companies/pages/companiesForm/CompaniesForm.tsx))
- **Propósito**: Ver o editar el perfil completo de una empresa/proveedor.
- **Datos Mostrados**: `registration_number`, `comercial_name`, `legal_representative`, `address`, `type_of_business`, `category`, `tel_fax`, `website`, `img`.
- **Elementos Interactivos**:
  - `CompanyDataSelector`: Componente en dos paneles (tarjeta izquierda con preview de logo y selector; formulario derecho con campos editables o bloqueados según el modo `view` o `edit`).
  - Botón "Volver" (regresa al listado) y Botón "Actualizar" (dispara `updateSupplier` en Zustand, muestra toast de éxito y retorna).

---

### 4.3. Quotations / Cotizaciones ([`src/features/quotations/`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/features/quotations/))

#### A. Listado de Cotizaciones ([`src/features/quotations/pages/main/Home.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/features/quotations/pages/main/Home.tsx))
- **Propósito**: Panel de cotizaciones existentes con botón de creación.
- **Elementos Interactivos**: Botón CTA "Nueva Cotización" (`/quotations/new`) y tabla con histórico de cotizaciones.

#### B. Flujo Wizard de Creación ([`QuoteForm.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/features/quotations/components/quoteForm/QuoteForm.tsx))
El flujo de cotización se organiza en **4 pasos secuenciales**:

```text
[Paso 1: Proveedor] -> [Paso 2: Detalles e Items] -> [Paso 3: Resumen] -> [Paso 4: Exportar Archivo]
```

1. **Paso 1: Información del Proveedor (`CompanyDataSelector`)**:
   - Selección de la empresa emisora mediante selector dropdown.
   - Autocompletado de los datos fiscales del proveedor.
2. **Paso 2: Detalles de la Cotización (`QuoteBody`)**:
   - **Información General**: Fecha (`date`), Cliente (`customer`), Concepto de trabajo (`work_concept`), Duración (`duration_of_work`).
   - **Lista de Insumos (`QuoteItemList` con `Form.List`)**:
     - Filas dinámicas con campos: Descripción, Especificación, Unidad, Cantidad, Precio Unitario, Precio Suministro, IVA, Observaciones.
     - Botón "Agregar" fila (`+`) y botón eliminar fila (`X`).
     - Toggles de cálculo automático de insumos (`CalculateItemCheck`): switches para calcular automáticamente precio de suministro (`calculateSupplyPrice`) e IVA por item (`calculateVatperItem`).
   - **Totales de Cotización (`QuoutePricing`)**:
     - Campos calculados/editables: Precio antes de impuestos (`price_before_taxes`), IVA total (`vat_total`), Precio total numérico (`total_price_number`), Precio total en letras (`total_price_letter`).
     - Toggles de cálculo automático global (`CalculateTotalCheck`): switches para auto-calcular precio antes de impuestos, IVA total y precio final.
3. **Paso 3: Resumen de la Cotización (`QuoteInformationReview`)**:
   - Lectura integral de los datos ingresados en paneles `Descriptions` organizados por bloques: General, Proveedor, Tabla completa de insumos y Precios Totales formateados en Won Coreano (`formatKRW`).
4. **Paso 4: Obtener Archivo (`QuoteGetFile`)**:
   - Animación Lottie (`file_transfer.json`).
   - Botón interactivo "Abrir archivo" que se activa una vez generado el archivo Excel/PDF en el backend.

---

### 4.4. Settings / Configuración ([`src/features/settings/Settings.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/features/settings/Settings.tsx))
- **Propósito**: Panel de personalización y diagnóstico de la aplicación organizado en pestañas verticales (`tabPosition="left"`):
- **Pestañas y Contenido**:
  1. **Sistema (`System.tsx`)**:
     - *Tema*: `DarkModeSwitch` (alterna tema Claro / Oscuro en tiempo real).
     - *Tamaño de Fuente*: `FontSizeSlider` (slider numérico que actualiza el font size global de la UI).
     - *Idioma*: `LanguageSelect` (selector entre Español `ES`, Inglés `EN`, Coreano `KR`).
  2. **Conexión al API (`APIConnection.tsx`)**:
     - *URL del API*: `APIInpuForm` (input de la URL base del servidor backend con validación).
     - *Autenticación del API*: `APIAccessForm` (campo de contraseña maestra para solicitar token JWT).
     - *Estado de Conexión*: `APIConnectionStatus` (badge de estado verde/rojo que ejecuta ping al endpoint `/api/test/ping`).
  3. **Acerca de (`About.tsx`)**:
     - Logo oficial de WND, nombre del producto y lista de telemetría de hardware/sistema (Versión API, Versión UI, Versión Electron, Versión Chrome, SO, Versión del SO, Arquitectura CPU).

---

### 4.5. Invoices / Facturación ([`src/features/invoices/Invoices.tsx`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/features/invoices/Invoices.tsx))
- **Propósito**: Módulo de facturación comercial (en fase de maquetación/diseño).
- **Alcance para Stitch**: Diseñar la interfaz de facturas con una estructura armónica con la vista de cotizaciones (listado, estado de pago, cliente y emisión).

---

## 5. Restricciones Técnicas para el Rediseño (Directrices para Stitch)

Para asegurar que cualquier rediseño visual se integre directamente en el código existente sin romper la funcionalidad, **Stitch debe cumplir estrictamente las siguientes reglas**:

### 🚫 Lo que NO se debe alterar:
1. **Contratos de Formularios Ant Design**:
   - Los nombres de campo (`name="fieldName"`) en `Form.Item` y `Form.List` (`name="quotation_item"`) deben mantenerse idénticos porque mapean directamente al esquema de backend (`Quotation` y `Supplier` en Mongoose).
   - Mantener las referencias a `Form.useFormInstance()` y `useFormList()`.
2. **Estructura Frameless de Electron**:
   - Las clases `.drag-region` (`-webkit-app-region: drag`) en el TitleBar y `.no-drag-region` (`-webkit-app-region: no-drag`) en botones/menús interactivos son obligatorias para que la ventana de escritorio se pueda arrastrar y controlar.
3. **Manejadores de Estado (Zustand)**:
   - No alterar las firmas de métodos en los stores: `useSettingsStore`, `useCompaniesStore`, `useQuotationStore`, `useAuthStore`, `useStepsStore`.
4. **Internacionalización (i18next)**:
   - Todo texto visual debe seguir consumiendo la función `t('clave')` con los namespaces existentes (`common`, `home`, `header`, `settings`).
5. **Transiciones de Página**:
   - La etiqueta contenedora `<AnimatedPage>` y la envoltura `<AnimatePresence mode="wait">` en `WNDLayout` deben preservarse para garantizar transiciones suaves entre rutas.

### ✨ Oportunidades Clave para el Rediseño Visual:
1. **Refinamiento de Superficies y Elevación**:
   - Modernizar la jerarquía visual de las tarjetas (`.main-view-div-card`, `.company-card`, `.quoteReview-card`) utilizando bordes más sutiles, micro-sombras y acabados de cristal/acrílico (*soft depth*).
2. **Jerarquía Visual en Tablas y Dashboards**:
   - Mejorar el diseño de las tablas de datos (estados con `Tag` de color, tipografía de números monoespaciada para montos en KRW, botones de acción más limpios).
3. **Experiencia Wizard (Cotizaciones)**:
   - Pulir los pasos del wizard para que la barra de progreso de `Steps` sea más moderna y dinámica.
   - Diseñar una visualización más compacta y ergonómica para la lista dinámica de insumos (`QuoteItemList`).
4. **Consistencia de Tokens Ant Design**:
   - Proponer ajustes en [`theme.ts`](file:///C:/Users/jesus/Documents/Proyectos/NodeJs/React/WND/src/providers/theme/theme.ts) para optimizar radios de borde (`borderRadius: 8px | 12px`), colores neutros y contraste accesible en ambos modos (Claro/Oscuro).
