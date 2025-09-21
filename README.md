# HASAD - Bilingual Contact Management System

A comprehensive contact management system built with React, TypeScript, and Supabase, featuring full Arabic and English language support with RTL layout.

## Features

### 🌍 Internationalization
- Full bilingual support (Arabic/English)
- Right-to-left (RTL) layout for Arabic
- Dynamic language switching
- Localized validation messages

### 🔐 Authentication & Security
- Supabase authentication integration
- Row Level Security (RLS) for data protection
- User-specific contact isolation
- Secure file upload handling

### 📱 Contact Management
- Complete CRUD operations for contacts
- Saudi mobile number validation
- Multiple contact types (Consumer, Institutional, Corporate)
- File upload for nationality ID documents
- Advanced search and filtering
- Responsive card-based interface

### 🎨 Modern UI/UX
- Clean, professional design with Arabic-first approach
- Smooth animations and micro-interactions
- Mobile-responsive layout
- Comprehensive color system
- Accessible form designs

### ⚡ Performance
- In-memory caching for fast data access
- Optimized Supabase queries
- Lazy loading and code splitting ready
- Efficient state management

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Internationalization**: react-i18next
- **Form Handling**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Build Tool**: Vite

## Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new Supabase project
   - Click "Connect to Supabase" in the Bolt interface
   - Run the migration in your Supabase SQL editor:
     ```sql
     -- Copy and paste the content from supabase/migrations/001_create_contacts.sql
     ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Update with your Supabase credentials
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

The application uses a single `contacts` table with the following structure:

```sql
CREATE TABLE contacts (
  contact_id SERIAL PRIMARY KEY,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_mobile TEXT,
  contact_tel TEXT,
  contact_address TEXT,
  contact_postcode TEXT,
  contact_city TEXT,
  contact_country TEXT,
  contact_nationality TEXT,
  contact_nationality_id TEXT, -- File URL
  contact_type TEXT NOT NULL CHECK (contact_type IN ('consumer','institutional','corporate')),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Key Features

### Mobile Validation
Saudi mobile numbers are validated using the pattern:
```typescript
/^(\+966|966|0)?[5-9][0-9]{8}$/
```

### Caching Strategy
- In-memory caching with TTL support
- Cache invalidation on data mutations
- Pattern-based cache clearing

### File Upload
- Support for image files and PDFs
- File size and type validation
- Secure file handling with Supabase Storage

### Language Support
- Complete Arabic translations
- RTL-aware component layouts
- Cultural adaptations for Saudi market

## Project Structure

```
src/
├── components/          # React components
│   ├── auth/           # Authentication components
│   └── contacts/       # Contact management components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
├── i18n/               # Internationalization setup
└── App.tsx             # Main application component
```

## Contributing

1. Follow the existing code style and patterns
2. Add proper TypeScript types for new features
3. Include translations for both Arabic and English
4. Test RTL layout compatibility
5. Ensure mobile responsiveness

## License

This project is licensed under the MIT License.