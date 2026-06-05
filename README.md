# ticktock - Timesheet Management Application

A responsive timesheet management web application built with React, Vite, and Tailwind CSS.

## Demo Credentials

- **Email:** user@tentwenty.com
- **Password:** password123

## Setup and Installation

```bash
# Clone the repository
git clone <repo-url>
cd ticktock

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Frameworks and Libraries

- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Inter** - Google Font (sans-serif typeface)

## Features

### 1. Login Page
- Split layout: white form (left) + blue branding (right)
- Email and password inputs with validation
- "Remember me" checkbox
- Dummy authentication with sessionStorage
- Error message on invalid credentials
- Automatic redirect to dashboard on success

### 2. Dashboard (Your Timesheets)
- Top navbar with logo, "Timesheets" label, user dropdown
- "Your Timesheets" card with filterable table
- Date Range and Status filter dropdowns
- Table columns: WEEK #, DATE, STATUS, ACTIONS
- Color-coded status badges (green/yellow/pink)
- Contextual action buttons (View/Update/Create)
- Full pagination (500+ timesheets, 5 per page, 100 pages)
- Previous/Next buttons with ellipsis and page numbers

### 3. Weekly Timesheet Detail
- Same navbar as dashboard
- "This week's timesheet" heading with date range
- Progress bar with dynamic color:
  - Red (< 50%)
  - Orange (50%–79%)
  - Green (≥ 80%)
- Entries grouped by day
- Each entry: task name, hours, blue project badge, "..." menu
- Edit and Delete actions from menu
- "+ Add new task" button with dashed border per day

### 4. Add/Edit Entry Modal
- Dark overlay with centered white modal
- Title switches between "Add New Entry" and "Edit Entry"
- Fields: Task name, Select Project, Type of Work, Task description, Hours
- Hours input with -/+ buttons
- All required fields marked with *
- Form validation with inline error messages
- Dynamic add/update without page reload

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Top navigation bar
│   ├── Footer.jsx              # Page footer
│   ├── StatusBadge.jsx         # Status badge component
│   ├── TimesheetTable.jsx      # Timesheets table with filters/pagination
│   ├── ProgressBar.jsx         # Dynamic progress bar
│   ├── DayGroup.jsx            # Day-grouped entries
│   ├── EntryModal.jsx          # Add/Edit entry modal
│   ├── Pagination.jsx          # Page navigation component
│   └── ProtectedRoute.jsx      # Auth guard wrapper
├── pages/
│   ├── LoginPage.jsx           # Login screen
│   ├── DashboardPage.jsx       # Timesheets list
│   └── WeekDetailPage.jsx      # Weekly detail view
├── hooks/
│   ├── useAuth.js              # Auth context consumer
│   ├── useTimesheets.js        # Timesheets data hook
│   └── useWeekDetail.js        # Week detail data hook
├── context/
│   └── AuthContext.jsx          # Auth state provider
├── data/
│   └── mockData.js             # Mock data (500+ timesheets)
├── utils/                      # Utility functions
├── App.jsx                     # Router configuration
├── main.jsx                    # Entry point
└── index.css                   # Tailwind CSS + theme
```

## Data Flow

1. **Mock data** lives in `src/data/mockData.js` — never imported directly in components
2. **Custom hooks** (`useTimesheets`, `useWeekDetail`) act as the data layer between mock data and components
3. **AuthContext** manages authentication state via React Context API
4. All state management uses React hooks (`useState`, `useEffect`, `useContext`, `useCallback`)

## Responsive Breakpoints

- **320px–424px** — Small mobile (iPhone SE)
- **425px–767px** — Large mobile (Android phones)
- **768px–1023px** — Tablet (iPad, Android tablets)
- **1024px–1279px** — Small laptop
- **1280px–1439px** — Standard desktop
- **1440px+** — Large desktop

## Assumptions

- Mock data is sufficient for demonstration; a real backend would replace the data layer
- 500 timesheets are generated to demonstrate pagination across 100 pages
- Entries are generated deterministically based on week data (COMPLETED weeks have entries, MISSING weeks have none)
- Authentication uses sessionStorage (cleared when browser tab closes); localStorage could be used for persistent sessions
- The app uses a simulated network delay (500ms) on login for realistic UX
- Progress bar colors follow the specification: red < 50%, orange 50–79%, green ≥ 80%

## Time Spent

Approximately 5–6 hours for the complete React + Vite conversion including project setup, all components, pages, hooks, context, mock data generation, routing, responsive design, and documentation.
