# 📊 Project Management Dashboard

> Project management system with intelligent analysis powered by AI

A modern project management application built with React, TypeScript, Vite, and Tailwind CSS, which integrates Google Gemini AI to provide intelligent insights and recommendations about your project status.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?logo=tailwind-css)

---

## ✨ Main Features

### 🎯 Project Management

- ✅ **Complete CRUD**: Create, read, update and delete projects
- 📝 **Validated forms**: Client-side and server-side validations
- 🔴 **Visual feedback**: Inputs with error indicators in red
- 📅 **Date control**: Date validation (start date cannot be in the future)
- 📱 **Responsive design**: Optimized for mobile and desktop
- 🎨 **Modern UI**: Gradients, CSS animations and hover effects
- 📊 **Live statistics**: Cards with updated metrics

### 🤖 Artificial Intelligence

- 🧠 **Google Gemini AI**: Intelligent analysis with Gemini Pro
- 💡 **Recommendations**: Suggestions based on project status
- 📊 **AI Executive Summaries**: Analysis of each project via `/analytics/:id`
- 🎯 **Analytics Backend**: Aggregated statistics from the server
- 🤖 **Interactive Modal**: View of AI summaries in project table

### 📈 Data Visualization

- 📊 **Statistics from Backend**: `/analytics/graphics` with aggregated data
- 📉 **Interactive charts**: Recharts for advanced visualization
- 📅 **Project timeline**: Visual timeline
- 🥧 **Status distribution**: Charts with precise percentages
- 📋 **Recent list**: 5 most recent projects
- 🎨 **Modern Design**: Gradients, animations and hover effects

### 💾 Export

- 📄 **Export to PDF**: Reports in PDF format
- 📊 **Export to Excel/CSV**: Data in tabular format
- 🎨 **Custom reports**: Includes statistics and charts

---

## 🛠️ Technologies Used

### Frontend Core

- **React 19.1.1** - UI library
- **TypeScript 5.9.3** - Static typing
- **Vite 7.1.7** - Build tool and dev server
- **Tailwind CSS 4.1.14** - Styling framework

### Additional Libraries

- **@google/generative-ai** - Integration with Google Gemini AI
- **Recharts** - Charts and visualizations
- **React Router DOM** - Navigation between pages

### Development Tools

- **ESLint** - Code linter
- **TypeScript ESLint** - Linting rules for TS
- **PostCSS** - CSS processor
- **Autoprefixer** - Automatic CSS prefixes

---

## 📁 Project Structure

```
project-front-app/
├── src/
│   ├── app/
│   │   ├── components/           # Reusable components
│   │   │   ├── ai.recommendations.tsx
│   │   │   ├── export-report.tsx
│   │   │   ├── project-status.chart.tsx
│   │   │   ├── project-timeline.chart.tsx
│   │   │   ├── project.chart.tsx      # ✨ Uses analytics API
│   │   │   ├── project.form.tsx
│   │   │   └── project.table.tsx      # ✨ With AI Summary modal
│   │   ├── context/              # Context API
│   │   │   ├── analytics.context.tsx  # ✨ New: Analytics context
│   │   │   ├── project.context.tsx
│   │   │   ├── use.analytics.context.tsx  # ✨ Analytics hook
│   │   │   └── use.context.tsx
│   │   ├── core/                 # Services and logic
│   │   │   ├── ai.service.ts
│   │   │   ├── analytics.service.ts   # ✨ New: Analytics service
│   │   │   └── project.service.ts
│   │   ├── helpers/              # Utilities and models
│   │   │   ├── analytics.model.tsx    # ✨ New: Analytics types
│   │   │   └── project.model.tsx
│   │   └── pages/                # Main pages
│   │       ├── dashboard.tsx
│   │       └── projects.tsx       # ✨ Improved design
│   ├── environment/              # Environment variables
│   │   └── environment.ts
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # ✨ Styles + animations
│   └── vite-env.d.ts            # Vite types
├── .env                          # Environment variables
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # Tailwind configuration
└── package.json                 # Dependencies

```

---

## 🚀 Installation

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn** >= 1.22.x
- **Backend API** running on `http://localhost:3002` (configurable port)
  - Endpoint Projects: `/project`
  - Endpoint Analytics: `/analytics`

### 1. Clone the repository

```bash
git clone https://github.com/your-username/project-management-dashboard.git
cd project-management-dashboard/project-front-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
# API Backend URL (must include /project at the end)
VITE_API_URL=http://localhost:PORT/project

# Google Gemini AI API Key (Optional - only for AiRecommendations)
# Get your key at: https://aistudio.google.com/app/apikey
VITE_GEMINI_API_KEY=your-api-key-here
```

**Important Notes:**

- `VITE_API_URL`: Must point to `/project`. The `AnalyticsService` automatically builds `/analytics` from this URL
- `VITE_GEMINI_API_KEY`: Optional - only used in `AiRecommendations`. Project AI summaries use the backend (which has its own key)

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code quality
npm run lint         # Run ESLint
```

---

## 🔧 Configuration

### Environment Variables

| Variable              | Description                      | Required | Default                         |
| --------------------- | -------------------------------- | -------- | ------------------------------- |
| `VITE_API_URL`        | Backend API URL                  | ✅ Yes   | `http://localhost:PORT/project` |
| `VITE_GEMINI_API_KEY` | Google Gemini API key (frontend) | ❌ No    | -                               |

**Note**: Analytics endpoints (`/analytics/graphics` and `/analytics/:id`) use the API key configured in the **backend**, not the frontend.

### Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create an account or log in
3. Click on "Create API Key"
4. Copy the key (format: `AIzaSy...`)
5. Paste it in your `.env` file

**Benefits with API Key:**

- ✅ Intelligent analysis with generative AI
- ✅ Personalized recommendations
- ✅ Contextual insights

**Without API Key:**

- ✅ Basic programmatic analysis
- ✅ Predefined recommendations
- ✅ All other functions operational

---

## 🎨 Main Components

### 📋 ProjectForm

Form to create/edit projects with validations:

- Required name (min 3 characters)
- Start date cannot be in the future
- End date must be after start date
- Visual feedback with red borders on errors
- Clear error messages from backend

### 📊 ProjectChart

Visual statistics consuming `/analytics/graphics`:

- **Total projects** from backend
- **Projects in progress** with real percentages
- **Completed projects** with precise calculations
- **Animated progress bars** with API data
- **Percentage distribution** calculated on the server

### 📋 ProjectTable (Enhanced)

Project table with new functionality:

- **"AI Summary" column** with 🤖 View button
- **Interactive modal** showing AI summary
- Consumes backend `/analytics/:id` endpoint
- **Loading states** during generation
- **Responsive design** with visual effects

### 🤖 AiRecommendations

Intelligent recommendations:

- Productivity analysis
- Suggestions based on project status
- Detection of overdue projects
- Upcoming deadline alerts

### 📅 ProjectTimelineChart

Timeline chart:

- Visualization with Recharts
- Creation trends
- Temporal distribution

### 📊 ProjectStatusChart

Distribution chart:

- Status pie chart
- Visual percentages
- Distinctive colors

### 📄 ExportReport

Data export:

- PDF with statistics
- Excel/CSV for analysis
- Quick download button

---

## 🔌 API Services

### ProjectService

```typescript
// Get all projects
await projectService.getProjects();

// Get project by ID
await projectService.getProjectById(id);

// Create project
await projectService.createProject(projectData);

// Update project
await projectService.updateProject(id, projectData);

// Delete project
await projectService.deleteProject(id);
```

### AnalyticsService (✨ New)

```typescript
// Get aggregated data for charts
await analyticsService.getGraphicsData();
// Returns: {
//   totalProjects,
//   projectsByStatus: [{ status, count, percentage }],
//   completedProjects,
//   inProgressProjects
// }

// Get AI analysis of a project
await analyticsService.getProjectAnalysis(projectId);
// Returns: {
//   summary: "AI generated summary...",
//   totalProjects: 1,
//   generatedAt: Date
// }
```

### AiService

```typescript
// Generate insights with AI
await aiService.generateInsights(projects);
```

---

## 🎯 Usage

### Dashboard

Navigate to `/` to view:

- **Real-time statistics** from `/analytics/graphics`
- **Personalized AI recommendations**
- **Advanced charts** (Timeline and Status)
- **Recent projects** sorted by date
- **Modern design** with gradients and animations

### Project Management

Navigate to `/projects` to:

- **View projects in table** with AI Summary column
- **Visual statistics** (Total, In Progress, Completed)
- **Create new project** with validated form
- **Edit existing project**
- **View AI summary** of each project (interactive modal)
- **Delete project** with confirmation
- **Export data** to PDF/Excel
- **Modern design** with improved header and gradients

---

## 🔐 Validations

### Client-Side (Frontend)

- ✅ Required name (min 3 characters)
- ✅ Start date ≤ current date
- ✅ End date > start date
- ✅ Optional description

### Server-Side (Backend)

- ✅ Data type validation
- ✅ Date format validation
- ✅ Valid status validation
- ✅ Descriptive error handling

---

## 🐛 Troubleshooting

### AI is not working

```bash
# Verify you have a valid API key
# In the browser console you should see:
# 🔑 Gemini API Key configured: YES ✅
# 🤖 Calling Gemini AI...
# ✅ Gemini AI response received: ...

# If you see "NO ❌", configure VITE_GEMINI_API_KEY in .env
```

### Styles are not loading

```bash
# Make sure you have Tailwind CSS configured
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss

# Restart the server
npm run dev
```

### Backend connection error

```bash
# Verify the backend is running
# By default at: http://localhost:PORT

# Test the endpoints manually:
curl http://localhost:PORT/project
curl http://localhost:PORT/analytics/graphics
```

### Analytics not showing data

```bash
# Verify the backend has Gemini API key configured
# In project-api-rest/.env should exist:
GEMINI_API_KEY=your-api-key-here

# The /analytics endpoints require this configuration in the backend
```

---

## 📦 Production Build

```bash
# 1. Build
npm run build

# 2. The 'dist' folder will contain the static files
# 3. Deploy 'dist' to your preferred server

# 4. Preview locally
npm run preview
```

### Recommended Deployment

- **Vercel** - Automatic deploy from Git
- **Netlify** - Integrated CI/CD
- **AWS S3 + CloudFront** - Scalable
- **GitHub Pages** - Free for open source projects

---

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'feat: add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

### Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting changes
- `refactor:` Code refactoring
- `test:` Add tests
- `chore:` Build or dependency changes

---

## 📄 License

This project is under the MIT License. See the `LICENSE` file for more details.

---

## 👨‍💻 Author

Developed with ❤️ by **Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Profile](https://linkedin.com/in/your-profile)
- Email: your-email@example.com

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI framework
- [Vite](https://vite.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Google Gemini](https://ai.google.dev/) - Generative AI
- [Recharts](https://recharts.org/) - Charts

---

## 🆕 What's New in This Version

### ✨ New Features

#### 📊 Backend Analytics Integration

- **AnalyticsService**: New service that consumes backend endpoints
- **GET `/analytics/graphics`**: Aggregated statistics (total, by status, percentages)
- **GET `/analytics/:id`**: AI summaries generated with Gemini Pro

#### 🎨 Visual Improvements

- **Renovated Projects Page**:

  - Header with blue-purple gradients
  - Real-time statistics cards
  - Improved icons and badges
  - Smooth CSS animations (fadeIn)
  - Hover effects with scaling

- **Improved Project Table**:
  - New "AI Summary" column with 🤖 View button
  - Interactive modal to display summaries
  - Loading states during AI generation
  - Improved responsive design

#### 🔄 Refactorings

- **ProjectChart**: Now consumes `/analytics/graphics` instead of calculating locally
- **Contexts**: New `AnalyticsContext` for analytics state management
- **Models**: New TypeScript types in `analytics.model.tsx`
- **Removed**: `AiPredictions` component (obsolete)

#### 🚀 Performance

- Statistics calculations moved to backend
- Reduced frontend processing
- More accurate and consistent data

---

## 📚 Additional Documentation

- [Backend Installation Guide](../project-api-rest/README.md)
- [Google Gemini AI Configuration](./AI_SETUP.md)
- [Project Architecture](./ARCHITECTURE.md)
- [Contributing Guide](./CONTRIBUTING.md)

---

**⭐ If this project was useful to you, consider giving it a star on GitHub!**
