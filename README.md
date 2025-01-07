# Macronutrients Calculator Backend

A backend service for calculating macronutrients built with NestJS.

## Prerequisites

- Node.js
- PostgreSQL
- npm

## Initial Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp .env.example .env
```

4. Add the following entry to your hosts file (/etc/hosts on Linux/Mac):

```
127.0.0.1 macal-postgres
```

## Database Setup

The project includes several database management commands:

- Create database: `npm run db:create`
- Run migrations: `npm run db:migrate`
- Seed database: `npm run db:seed`
- Reset database (drop, create, migrate, seed): `npm run db:reset`

## Running the Application

- Development mode: `npm run start:dev`
- Production mode: `npm run start:prod`
- Debug mode: `npm run start:debug`

## Testing

- Run tests: `npm test`
- Run tests with watch mode: `npm run test:watch`
- Run tests with coverage: `npm run test:cov`
- Run e2e tests: `npm run test:e2e`

## Additional Commands

- Format code: `npm run format`
- Lint code: `npm run lint`
- Build project: `npm run build`

## Technology Stack

- NestJS
- TypeORM
- PostgreSQL
- Passport JWT for authentication
- Jest for testing
