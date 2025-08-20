# Overview

This is a comprehensive React-based admin and user dashboard application for managing mini applications within a company. The system features role-based access control with different dashboard views for admins and regular users. The application uses Google OAuth for authentication and restricts access to users with specific organization domains.

The platform allows administrators to manage mini applications, users, roles, permissions, and departments through a modern web interface. Regular users can access their assigned mini applications through a personalized dashboard. The system includes features like employee directory, resource center, and products/services management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management and React Context for local state
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: OpenID Connect (OIDC) with Google OAuth integration via Replit Auth
- **Session Management**: Express sessions with PostgreSQL session store
- **API Design**: RESTful API endpoints with role-based access control

## Database Schema
- **Users**: Core user management with role-based permissions
- **Departments**: Organizational structure management
- **Roles & Permissions**: Granular permission system for access control
- **Mini Applications**: Application metadata and user assignments
- **Sessions**: Secure session storage for authentication

## Authentication & Authorization
- **OAuth Provider**: Google OAuth with domain restriction
- **Session Management**: Server-side sessions stored in PostgreSQL
- **Role-Based Access**: Three-tier system (admin, manager, user) with granular permissions
- **Domain Validation**: Organization email domain enforcement

## Component Structure
- **Layout Components**: Sidebar navigation and header with search functionality
- **Card Components**: Reusable cards for displaying applications and users
- **Modal Components**: Form modals for CRUD operations
- **UI Components**: Comprehensive design system with shadcn/ui

# External Dependencies

## Database
- **Neon Database**: PostgreSQL-compatible serverless database via `@neondatabase/serverless`
- **Connection Pooling**: Built-in connection management for serverless environments

## Authentication Services
- **Google OAuth**: OAuth 2.0 integration for user authentication
- **Replit Auth**: OIDC implementation for secure authentication flow

## UI & Styling
- **Radix UI**: Headless UI components for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide Icons**: Icon library for consistent iconography

## Development Tools
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds
- **Vite**: Development server and build tool with HMR

## Runtime Environment
- **Node.js**: Server runtime environment
- **Express.js**: Web framework for API endpoints
- **React Query**: Data fetching and caching library