# User Posts API

A simple REST API for managing users, posts and likes. Built with **Express.js**, **TypeScript** and **PostgreSQL**.

> **This is a small learning project** It's meant for practice and learning purposes. Don't expect production code.

## What is this?

A basic social network backend where you can:
- Create and manage users
- Create posts and edit/delete them
- Like/unlike posts

## Features

- Create, read, update, delete users
- Create, read, update, delete posts
- Add/remove likes from posts
- Basic pagination for users and posts
- Data validation (could be better though)
- TypeScript for type safety
- Error handling 

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** (v5.2.1) - Web framework
- **TypeScript** - Type checking
- **PostgreSQL** - Database
- **pg** (v8.20.0) - PostgreSQL driver

## 📁 Project Structure

```
src/
├── Classes/           # Error classes (AppError, DatabaseError)
├── Config/            # Database pool config
├── Controllers/       # Route handlers
├── Middleware/        # Error handler, ID validation
├── Models/            # Database queries
├── Routes/            # Route definitions
├── Services/          # Business logic
├── Types/             # TypeScript interfaces
├── Utils/             # Helper functions & validators
└── index.ts           # Main file
```


### 3. Environment variables

Create `envs/.env`:

```env
PORT=3000
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=user_posts_db
```

## Endpoints

### Users

| Method | Endpoint | What it does |
|--------|----------|------------|
| GET | `/users?page=1` | Get all users (paginated) |
| POST | `/users` | Create new user |
| GET | `/users/:id` | Get specific user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Posts

| Method | Endpoint | What it does |
|--------|----------|------------|
| GET | `/posts?page=1` | Get all posts (paginated) |
| POST | `/posts` | Create new post |
| GET | `/posts/:id` | Get specific post |
| PATCH | `/posts/:id` | Edit post content |
| DELETE | `/posts/:id` | Delete post |

### Likes

| Method | Endpoint | What it does |
|--------|----------|------------|
| GET | `/posts/:id/likes` | Get all likes for a post |
| POST | `/posts/:id/likes` | Add a like |
| DELETE | `/posts/:id/likes` | Remove a like |



