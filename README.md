## Project Overview

D' Capitale is a residential area management application with separate user (resident) and admin (employee) interfaces.

### Frontend 
cd frontend
npm install      # Install dependencies
npm start        # Run dev server on localhost:3000
npm run build    # Production build

- **React 19** with **Material UI v7** and **react-router-dom v7**
- Two layouts: `AppLayout` (residents) and `AdminLayout` (employees)
- Auth context in `contexts/AuthContext.tsx`
- Protected routes via `ProtectedRoute.jsx`
- User data stored in `localStorage` under key `"user"`

### Backend (PHP)
Requires XAMPP with Apache and MySQL running. The project is served from `C:\xamppreal\htdocs\digi-capitale\`.

Single entry point: `backend/api/index.php` routes by `?action=` parameter.

### Database
- MySQL database: `digicapitale`
- Connection config: `backend/api/config/database.php`
- Schema files: `database/` directory
- For XAMPP: DB_PASS = '' (empty)
- Stored procedures in `database/` SQL files 
- Call procedures via: `$conn->prepare('CALL ProcedureName(?, ?)')`
- Tables use foreign keys with CASCADE

### Frontend Patterns
- Pages fetch data in `useEffect` on mount
- API base: `http://localhost/digi-capitale/backend/api/index.php?action=`
- Pagination uses MUI `Pagination` component with
- Filters combine checkbox (items) + dropdown (month) + search
- Theme defined in `frontend/src/theme.js`

## Two User Types

1. **Residents** (AppLayout): Home, Utility, Services, History, Profile, MakeIncidents
2. **Employees** (AdminLayout): Dashboard, AdminRequest, Report, ViewIncidents, EmployeeProfile

Authentication stores user type and routes accordingly.