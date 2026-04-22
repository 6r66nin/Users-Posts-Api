# User Posts API

Una API RESTful para gestionar usuarios, posts (publicaciones) y likes, construida con **Express.js**, **TypeScript** y **PostgreSQL**.

## 🎯 Descripción General

Esta aplicación proporciona un backend completo para un sistema de red social básico. Permite crear usuarios, publicar contenido, ver posts de otros usuarios y hacer/quitar likes a las publicaciones.

## ✨ Características

- ✅ **Gestión de Usuarios**: Crear, leer, actualizar y eliminar usuarios
- ✅ **Gestión de Posts**: Crear, leer, actualizar y eliminar publicaciones
- ✅ **Sistema de Likes**: Agregar y eliminar likes en posts
- ✅ **Paginación**: Soporte para paginar usuarios y posts
- ✅ **Validación de Datos**: Validación de entrada para todas las operaciones
- ✅ **Manejo de Errores Centralizado**: Sistema robusto de gestión de errores
- ✅ **TypeScript**: Tipado estático para mayor confiabilidad

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** (v5.2.1) - Framework web
- **TypeScript** - Lenguaje tipado para JavaScript
- **PostgreSQL** - Base de datos relacional
- **pg** (v8.20.0) - Driver PostgreSQL para Node.js

## 📁 Estructura del Proyecto

```
src/
├── Classes/           # Clases personalizadas (AppError, DatabaseError)
├── Config/            # Configuración (conexión a BD)
├── Controllers/       # Controladores (lógica de rutas)
│   ├── usersController.ts
│   └── postsController.ts
├── Middleware/        # Middleware personalizado
│   ├── errorHandler.ts       # Manejo centralizado de errores
│   └── idparamHandler.ts     # Validación de parámetros ID
├── Models/            # Modelos de datos (consultas a BD)
│   ├── userdbModel.ts
│   ├── postdbModel.ts
│   └── likedbModel.ts
├── Routes/            # Definición de rutas
│   ├── usersRoutes.ts
│   └── postsRoutes.ts
├── Services/          # Lógica de negocio
│   ├── userServices.ts
│   ├── postsServices.ts
│   └── likesServices.ts
├── Types/             # Interfaces y tipos TypeScript
│   ├── User.ts
│   ├── Post.ts
│   ├── HttpResp.ts
│   └── Pagination.ts
├── Utils/             # Funciones utilitarias
│   ├── QueryExecuter.ts      # Ejecutor de consultas BD
│   ├── databaserrorsMap.ts   # Mapa de errores de BD
│   ├── utilsValidators.ts    # Validadores generales
│   ├── usersValidators.ts    # Validadores de usuarios
│   ├── postsValidator.ts     # Validadores de posts
│   └── pageValidator.ts      # Validador de paginación
└── index.ts           # Punto de entrada de la aplicación
```

## 📋 Prerequisitos

- **Node.js** (v16 o superior)
- **PostgreSQL** (v12 o superior)
- **npm** o **yarn**

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/user-posts-api.git
cd user-posts-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `envs/` con las siguientes variables:

```env
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
DB_NAME=user_posts_db
```

### 4. Crear la base de datos

Ejecuta los scripts SQL para crear las tablas necesarias:

```sql
-- Crear tabla de usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  age INT NOT NULL
);

-- Crear tabla de posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de likes
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  UNIQUE(user_id, post_id)
);
```

### 5. Compilar TypeScript

```bash
npm run start-ts
```

### 6. Iniciar el servidor

En otra terminal:

```bash
npm run start-server
```

El servidor estará disponible en `http://localhost:3000`

## 📡 Endpoints de la API

### 👥 Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/users` | Obtener lista de usuarios (paginado) |
| POST | `/users` | Crear nuevo usuario |
| GET | `/users/:id` | Obtener usuario específico |
| PUT | `/users/:id` | Actualizar usuario |
| DELETE | `/users/:id` | Eliminar usuario |

#### Ejemplos de uso:

**GET /users?page=1**
```json
[
  {
    "id": 1,
    "username": "juan_perez",
    "age": 28
  }
]
```

**POST /users**
```json
{
  "username": "nuevo_usuario",
  "age": 25
}
```

**PUT /users/1**
```json
{
  "username": "usuario_actualizado",
  "age": 30
}
```

---

### 📝 Posts

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/posts` | Obtener lista de posts (paginado) |
| POST | `/posts` | Crear nuevo post |
| GET | `/posts/:id` | Obtener post específico |
| PATCH | `/posts/:id` | Editar post |
| DELETE | `/posts/:id` | Eliminar post |

#### Ejemplos de uso:

**GET /posts?page=1**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "content": "Este es mi primer post",
    "created_at": "2026-04-21T10:30:00Z"
  }
]
```

**POST /posts**
```json
{
  "user_id": 1,
  "content": "Mi nuevo contenido"
}
```

**PATCH /posts/1**
```json
{
  "content": "Contenido actualizado"
}
```

---

### ❤️ Likes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/posts/:id/likes` | Obtener likes de un post |
| POST | `/posts/:id/likes` | Agregar like a un post |
| DELETE | `/posts/:id/likes` | Quitar like de un post |

#### Ejemplos de uso:

**GET /posts/1/likes**
```json
{
  "likescount": 5,
  "likes": [
    {
      "id": 1,
      "user_id": 2,
      "post_id": 1
    }
  ]
}
```

**POST /posts/1/likes**
```json
{
  "userId": 2
}
```

**DELETE /posts/1/likes**
```json
{
  "userId": 2
}
```

## 📦 Estructura de Datos

### Usuario (User)
```typescript
interface Usercreate {
  username: string;   // Nombre único del usuario
  age: number;        // Edad del usuario
}
```

### Post (Publicación)
```typescript
interface Postcreate {
  user_id: number;      // ID del usuario que crea el post
  content: string;      // Contenido del post
  created_at?: Date;    // Fecha de creación (opcional)
}
```

### Like
```typescript
{
  id: number;
  user_id: number;      // ID del usuario que hace like
  post_id: number;      // ID del post
}
```

## ⚠️ Manejo de Errores

La API implementa un sistema centralizado de gestión de errores mediante:

- **AppError**: Clase personalizada para errores de aplicación
- **DatabaseError**: Clase para mapear errores de PostgreSQL a respuestas HTTP
- **Error Handler Middleware**: Middleware que captura y responde a todos los errores

### Códigos de Error Comunes

| Código HTTP | Descripción |
|-------------|------------|
| 400 | Solicitud inválida (validación fallida) |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

## 🔧 Scripts Disponibles

```bash
# Compilar TypeScript en modo observador
npm run start-ts

# Iniciar servidor con recarga automática
npm run start-server

# Ejecutar tests (no configurado)
npm test
```

## 🏗️ Arquitectura

La aplicación sigue una arquitectura en capas:

1. **Routes** → Define las rutas HTTP
2. **Controllers** → Maneja las solicitudes y respuestas
3. **Services** → Contiene la lógica de negocio
4. **Models** → Interactúa con la base de datos
5. **Middleware** → Procesa solicitudes/respuestas y errores
6. **Validators** → Valida datos de entrada
7. **Utils** → Funciones auxiliares

Esta estructura facilita el mantenimiento, testeo y escalabilidad de la aplicación.

## 📝 Notas de Desarrollo

- Los validadores aseguran que los datos cumplan con los requisitos antes de procesarlos
- Las consultas a la base de datos se ejecutan a través de `QueryExecuter`
- El manejo de errores de PostgreSQL se mapea a códigos HTTP apropiados
- La paginación utiliza limit y offset para optimizar consultas
- Los parámetros ID se validan antes de procesarse

## 📄 Licencia

ISC

## 👨‍💻 Autor

Desarrollado como proyecto educativo de Node.js y Express.

---

**¿Preguntas o sugerencias?** Abre un issue en el repositorio.
