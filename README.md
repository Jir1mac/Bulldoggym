This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Database Setup

This project uses Prisma with SQLite for database management and bcrypt for password encryption.

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma Client:

```bash
npx prisma generate
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Seed the database with initial admin user:

```bash
npm run seed
```

Default admin credentials:
- Username: `admin`
- Password: `heslo123`

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Database Schema

The application uses Prisma ORM with the following schema:

### User Model
- `id`: Auto-increment integer (primary key)
- `username`: Unique string
- `password`: String (hashed with bcrypt)
- `createdAt`: DateTime (auto-generated)
- `updatedAt`: DateTime (auto-updated)

## Authentication

The login system uses:
- **Prisma** for database operations
- **bcrypt** for secure password hashing (10 salt rounds)
- HTTP-only cookies for session management

Login endpoint: `POST /api/login`

Request body:
```json
{
  "username": "admin",
  "password": "heslo123"
}
```

