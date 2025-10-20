# 📊 Project Management Dashboard

> Sistema de gestión de proyectos con análisis inteligente impulsado por IA

Una aplicación moderna de gestión de proyectos construida con React, TypeScript, Vite y Tailwind CSS, que integra Google Gemini AI para proporcionar insights y recomendaciones inteligentes sobre el estado de tus proyectos.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?logo=tailwind-css)

---

## ✨ Características Principales

### 🎯 Gestión de Proyectos

- ✅ **CRUD completo**: Crear, leer, actualizar y eliminar proyectos
- 📝 **Formularios validados**: Validaciones client-side y server-side
- 🔴 **Feedback visual**: Inputs con indicadores de error en rojo
- 📅 **Control de fechas**: Validación de fechas (inicio no puede ser futura)
- 📱 **Diseño responsivo**: Optimizado para móvil y desktop
- 🎨 **UI Moderna**: Gradientes, animaciones CSS y efectos hover
- 📊 **Estadísticas en vivo**: Tarjetas con métricas actualizadas

### 🤖 Inteligencia Artificial

- 🧠 **Google Gemini AI**: Análisis inteligente con Gemini Pro
- 💡 **Recomendaciones**: Sugerencias basadas en el estado de proyectos
- 📊 **Resúmenes Ejecutivos AI**: Análisis de cada proyecto vía `/analytics/:id`
- 🎯 **Analytics Backend**: Estadísticas agregadas desde el servidor
- 🤖 **Modal Interactivo**: Vista de resúmenes AI en tabla de proyectos

### 📈 Visualización de Datos

- 📊 **Estadísticas desde Backend**: `/analytics/graphics` con datos agregados
- 📉 **Gráficos interactivos**: Recharts para visualización avanzada
- 📅 **Timeline de proyectos**: Línea de tiempo visual
- 🥧 **Distribución de estados**: Gráficos con porcentajes precisos
- 📋 **Lista de recientes**: 5 proyectos más recientes
- 🎨 **Diseño Moderno**: Gradientes, animaciones y efectos hover

### 💾 Exportación

- 📄 **Exportar a PDF**: Reportes en formato PDF
- 📊 **Exportar a Excel/CSV**: Datos en formato tabular
- 🎨 **Reportes personalizados**: Incluye estadísticas y gráficos

---

## 🛠️ Tecnologías Utilizadas

### Frontend Core

- **React 19.1.1** - Biblioteca de UI
- **TypeScript 5.9.3** - Tipado estático
- **Vite 7.1.7** - Build tool y dev server
- **Tailwind CSS 4.1.14** - Framework de estilos

### Librerías Adicionales

- **@google/generative-ai** - Integración con Google Gemini AI
- **Recharts** - Gráficos y visualizaciones
- **React Router DOM** - Navegación entre páginas

### Herramientas de Desarrollo

- **ESLint** - Linter de código
- **TypeScript ESLint** - Reglas de linting para TS
- **PostCSS** - Procesador de CSS
- **Autoprefixer** - Prefijos CSS automáticos

---

## 📁 Estructura del Proyecto

```
project-front-app/
├── src/
│   ├── app/
│   │   ├── components/           # Componentes reutilizables
│   │   │   ├── ai.recommendations.tsx
│   │   │   ├── export-report.tsx
│   │   │   ├── project-status.chart.tsx
│   │   │   ├── project-timeline.chart.tsx
│   │   │   ├── project.chart.tsx      # ✨ Usa analytics API
│   │   │   ├── project.form.tsx
│   │   │   └── project.table.tsx      # ✨ Con AI Summary modal
│   │   ├── context/              # Context API
│   │   │   ├── analytics.context.tsx  # ✨ Nuevo: Analytics context
│   │   │   ├── project.context.tsx
│   │   │   ├── use.analytics.context.tsx  # ✨ Hook analytics
│   │   │   └── use.context.tsx
│   │   ├── core/                 # Servicios y lógica
│   │   │   ├── ai.service.ts
│   │   │   ├── analytics.service.ts   # ✨ Nuevo: Analytics service
│   │   │   └── project.service.ts
│   │   ├── helpers/              # Utilidades y modelos
│   │   │   ├── analytics.model.tsx    # ✨ Nuevo: Tipos analytics
│   │   │   └── project.model.tsx
│   │   └── pages/                # Páginas principales
│   │       ├── dashboard.tsx
│   │       └── projects.tsx       # ✨ Diseño mejorado
│   ├── environment/              # Variables de entorno
│   │   └── environment.ts
│   ├── App.tsx                   # Componente raíz
│   ├── main.tsx                  # Punto de entrada
│   ├── index.css                 # ✨ Estilos + animaciones
│   └── vite-env.d.ts            # Tipos de Vite
├── .env                          # Variables de entorno
├── vite.config.ts               # Configuración de Vite
├── tsconfig.json                # Configuración de TypeScript
├── tailwind.config.js           # Configuración de Tailwind
└── package.json                 # Dependencias

```

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x o **yarn** >= 1.22.x
- **Backend API** corriendo en `http://localhost:3002` (puerto configurable)
  - Endpoint Projects: `/project`
  - Endpoint Analytics: `/analytics`

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/project-management-dashboard.git
cd project-management-dashboard/project-front-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# API Backend URL (debe incluir /project al final)
VITE_API_URL=http://localhost:PORT/project

# Google Gemini AI API Key (Opcional - solo para AiRecommendations)
# Obtén tu clave en: https://aistudio.google.com/app/apikey
VITE_GEMINI_API_KEY=tu-api-key-aqui
```

**Notas Importantes:**

- `VITE_API_URL`: Debe apuntar a `/project`. El servicio `AnalyticsService` automáticamente construye `/analytics` desde esta URL
- `VITE_GEMINI_API_KEY`: Opcional - solo usado en `AiRecommendations`. Los resúmenes AI de proyectos usan el backend (que tiene su propia clave)

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Compila para producción
npm run preview      # Previsualiza build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

---

## 🔧 Configuración

### Variables de Entorno

| Variable              | Descripción                         | Requerido | Default                         |
| --------------------- | ----------------------------------- | --------- | ------------------------------- |
| `VITE_API_URL`        | URL del backend API                 | ✅ Sí     | `http://localhost:PORT/project` |
| `VITE_GEMINI_API_KEY` | API key de Google Gemini (frontend) | ❌ No     | -                               |

**Nota**: Los endpoints de Analytics (`/analytics/graphics` y `/analytics/:id`) usan la API key configurada en el **backend**, no en el frontend.

### Obtener Google Gemini API Key

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crea una cuenta o inicia sesión
3. Click en "Create API Key"
4. Copia la clave (formato: `AIzaSy...`)
5. Pégala en tu archivo `.env`

**Beneficios con API Key:**

- ✅ Análisis inteligente con IA generativa
- ✅ Recomendaciones personalizadas
- ✅ Insights contextuales

**Sin API Key:**

- ✅ Análisis programático básico
- ✅ Recomendaciones predefinidas
- ✅ Todas las demás funciones operativas

---

## 🎨 Componentes Principales

### 📋 ProjectForm

Formulario para crear/editar proyectos con validaciones:

- Nombre requerido (mín. 3 caracteres)
- Fecha de inicio no puede ser futura
- Fecha de fin debe ser posterior a fecha de inicio
- Feedback visual con bordes rojos en errores
- Mensajes de error claros del backend

### 📊 ProjectChart

Estadísticas visuales consumiendo `/analytics/graphics`:

- **Total de proyectos** desde el backend
- **Proyectos en progreso** con porcentajes reales
- **Proyectos completados** con cálculos precisos
- **Barras de progreso animadas** con datos del API
- **Distribución porcentual** calculada en el servidor

### 📋 ProjectTable (Mejorado)

Tabla de proyectos con nueva funcionalidad:

- **Columna "AI Summary"** con botón 🤖 View
- **Modal interactivo** que muestra resumen de IA
- Consume endpoint `/analytics/:id` del backend
- **Loading states** durante la generación
- **Diseño responsive** con efectos visuales

### 🤖 AiRecommendations

Recomendaciones inteligentes:

- Análisis de productividad
- Sugerencias basadas en estado de proyectos
- Detección de proyectos vencidos
- Alertas de deadlines próximos

### 📅 ProjectTimelineChart

Gráfico de línea de tiempo:

- Visualización con Recharts
- Tendencias de creación
- Distribución temporal

### 📊 ProjectStatusChart

Gráfico de distribución:

- Pie chart de estados
- Porcentajes visuales
- Colores distintivos

### 📄 ExportReport

Exportación de datos:

- PDF con estadísticas
- Excel/CSV para análisis
- Botón de descarga rápida

---

## 🔌 API Services

### ProjectService

```typescript
// Obtener todos los proyectos
await projectService.getProjects();

// Obtener proyecto por ID
await projectService.getProjectById(id);

// Crear proyecto
await projectService.createProject(projectData);

// Actualizar proyecto
await projectService.updateProject(id, projectData);

// Eliminar proyecto
await projectService.deleteProject(id);
```

### AnalyticsService (✨ Nuevo)

```typescript
// Obtener datos agregados para gráficos
await analyticsService.getGraphicsData();
// Retorna: {
//   totalProjects,
//   projectsByStatus: [{ status, count, percentage }],
//   completedProjects,
//   inProgressProjects
// }

// Obtener análisis AI de un proyecto
await analyticsService.getProjectAnalysis(projectId);
// Retorna: {
//   summary: "AI generated summary...",
//   totalProjects: 1,
//   generatedAt: Date
// }
```

### AiService

```typescript
// Generar insights con IA
await aiService.generateInsights(projects);
```

---

## 🎯 Uso

### Dashboard

Navega a `/` para ver:

- **Estadísticas en tiempo real** desde `/analytics/graphics`
- **Recomendaciones de IA** personalizadas
- **Gráficos avanzados** (Timeline y Status)
- **Proyectos recientes** ordenados por fecha
- **Diseño moderno** con gradientes y animaciones

### Gestión de Proyectos

Navega a `/projects` para:

- **Ver proyectos en tabla** con columna AI Summary
- **Estadísticas visuales** (Total, In Progress, Completed)
- **Crear nuevo proyecto** con formulario validado
- **Editar proyecto existente**
- **Ver resumen AI** de cada proyecto (modal interactivo)
- **Eliminar proyecto** con confirmación
- **Exportar datos** a PDF/Excel
- **Diseño moderno** con header mejorado y gradientes

---

## 🔐 Validaciones

### Client-Side (Frontend)

- ✅ Nombre requerido (min 3 caracteres)
- ✅ Fecha inicio ≤ fecha actual
- ✅ Fecha fin > fecha inicio
- ✅ Descripción opcional

### Server-Side (Backend)

- ✅ Validación de tipos de datos
- ✅ Validación de formato de fechas
- ✅ Validación de estados válidos
- ✅ Manejo de errores descriptivo

---

## 🐛 Solución de Problemas

### La IA no funciona

```bash
# Verifica que tengas una API key válida
# En la consola del navegador deberías ver:
# 🔑 Gemini API Key configured: YES ✅
# 🤖 Calling Gemini AI...
# ✅ Gemini AI response received: ...

# Si ves "NO ❌", configura VITE_GEMINI_API_KEY en .env
```

### Estilos no se cargan

```bash
# Asegúrate de tener Tailwind CSS configurado
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss

# Reinicia el servidor
npm run dev
```

### Error de conexión al backend

```bash
# Verifica que el backend esté corriendo
# Por defecto en: http://localhost:PORT

# Prueba manualmente los endpoints:
curl http://localhost:PORT/project
curl http://localhost:PORT/analytics/graphics
```

### Analytics no muestra datos

```bash
# Verifica que el backend tenga configurada la API key de Gemini
# En project-api-rest/.env debe existir:
GEMINI_API_KEY=tu-api-key-aqui

# Los endpoints /analytics requieren esta configuración en el backend
```

---

## 📦 Build para Producción

```bash
# 1. Compilar
npm run build

# 2. La carpeta 'dist' contendrá los archivos estáticos
# 3. Despliega 'dist' en tu servidor preferido

# 4. Previsualizar localmente
npm run preview
```

### Despliegue Recomendado

- **Vercel** - Deploy automático desde Git
- **Netlify** - CI/CD integrado
- **AWS S3 + CloudFront** - Escalable
- **GitHub Pages** - Gratis para proyectos open source

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Convención de Commits

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Cambios de formato
- `refactor:` Refactorización de código
- `test:` Agregar tests
- `chore:` Cambios en build o dependencias

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

Desarrollado con ❤️ por **Tu Nombre**

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- Email: tu-email@ejemplo.com

---

## 🙏 Agradecimientos

- [React](https://react.dev/) - Framework de UI
- [Vite](https://vite.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [Google Gemini](https://ai.google.dev/) - IA Generativa
- [Recharts](https://recharts.org/) - Gráficos

---

## 🆕 Novedades en esta Versión

### ✨ Nuevas Funcionalidades

#### 📊 Integración con Backend Analytics

- **AnalyticsService**: Nuevo servicio que consume endpoints del backend
- **GET `/analytics/graphics`**: Estadísticas agregadas (total, por estado, porcentajes)
- **GET `/analytics/:id`**: Resúmenes AI generados con Gemini Pro

#### 🎨 Mejoras Visuales

- **Página Projects Renovada**:

  - Header con gradientes azul-púrpura
  - Tarjetas de estadísticas en tiempo real
  - Iconos y badges mejorados
  - Animaciones CSS suaves (fadeIn)
  - Efectos hover con escalado

- **Tabla de Proyectos Mejorada**:
  - Nueva columna "AI Summary" con botón 🤖 View
  - Modal interactivo para mostrar resúmenes
  - Loading states durante generación AI
  - Diseño responsive mejorado

#### 🔄 Refactorizaciones

- **ProjectChart**: Ahora consume `/analytics/graphics` en lugar de calcular localmente
- **Contexts**: Nuevo `AnalyticsContext` para gestión de estado de analytics
- **Models**: Nuevos tipos TypeScript en `analytics.model.tsx`
- **Eliminado**: Componente `AiPredictions` (obsoleto)

#### 🚀 Rendimiento

- Cálculos de estadísticas movidos al backend
- Reducción de procesamiento en el frontend
- Datos más precisos y consistentes

---

## 📚 Documentación Adicional

- [Guía de instalación del Backend](../project-api-rest/README.md)
- [Configuración de Google Gemini AI](./AI_SETUP.md)
- [Arquitectura del proyecto](./ARCHITECTURE.md)
- [Guía de contribución](./CONTRIBUTING.md)

---

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!**
