## Introduction

![image](https://github.com/user-attachments/assets/c3e4eb9e-6347-4f50-a941-1846addbe4cf)

PetSOS is a compassionate platform dedicated to reuniting lost pets with their owners and helping homeless animals find loving homes. Built with a modern tech stack, PetSOS connects pet lovers with an intuitive interface to post, search, and manage pet listings—because every pet deserves a safe and happy home.

## Features

- Find Pets: Search for lost or adoptable pets with an easy-to-use interface.
- Post Pet: Share details about missing pets or those needing homes.
- User Authentication: Secure sign-up and sign-in using JWT for personalized experiences.
- Profile Management: View and manage your pet postings (for authenticated users).
- Responsive Design: Fully responsive UI for seamless use on desktop and mobile.

## Tech Stack

- Frontend: React.js, TypeScript, React Hooks, React Router
- Styling: TailwindCSS
- Build Tool: Vite
- Authentication: JWT (JSON Web Tokens)
- Database: Supabase
- Language: JavaScript (with TypeScript for type safety)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v8 or higher) or yarn
- A Supabase account for database and authentication setup

## Installation

Clone the Repository

```
git clone https://github.com/your-username/petsos.git
cd petsos
```

## Install Dependencies

```
npm install
```

or

```
yarn install
```

## Set Up Environment Variables

Create a .env file in the root directory and add your Supabase and JWT configuration:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_JWT_SECRET=your-jwt-secret
```

- Get SUPABASE_URL and SUPABASE_ANON_KEY from your Supabase project settings.
- Define a secure JWT_SECRET for token generation/validation.

###Run the Development Server

```
npm run dev
```

or

```
yarn dev
```

- Open http://localhost:5173 to view the app in your browser.
