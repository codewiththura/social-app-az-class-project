# Social App (React + Vite)

A modern social feed application built with React, React Router, and Tailwind CSS. The app features authentication, user-linked posts, protected routes, interactive likes/bookmarks, and an in-memory simulated database layer designed to mirror MongoDB/Mongoose schemas for straightforward migration to a production backend.

---

## 📌 Features

- **Authentication & Protected Routes**:
  - Sign Up (Registration) with name, username, email, password, and bio.
  - Log In with email/password validation.
  - **Auth Redirects & Protected Routes (`<ProtectedRoute>`)**: Automatically redirects unauthenticated guests to `/login` when accessing protected pages (e.g. `/create-post`).
  - Active session handling via **React Context API** (`AuthContext`) and custom `useAuth()` hook.
  - Top Navigation profile badge (avatar, user name, and logout button).
- **Feed & Post Browsing**:
  - View recent posts with responsive cards, media previews, and author metadata.
  - Detailed Post view with dynamic route matching (`/post/:id`).
- **Interactive Post Actions**:
  - `isLiked`: Tracks whether the active user liked a post (backed by user IDs array).
  - `isSaved`: Tracks personal bookmarks.
  - Real-time like counter updates.
  - Commenting system per post with user attribution.
- **Relational Data Modeling**: Posts and comments link directly to `userId` foreign keys and populate author information.
- **MongoDB / Mongoose Schema Ready**: Production-grade schemas equipped with password hashes, timestamps, and relational ObjectIds.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### Installation

```bash
# Clone or navigate to the project directory
cd social-app

# Install project dependencies
npm install
```

### Running in Development

```bash
# Start Vite development server with HMR
npm run dev
```

The app will be accessible at `http://localhost:5173`.

### Demo Login Accounts

| Name | Email | Password |
|---|---|---|
| **Thura** | `thura@example.com` | `password123` |
| **May Thin** | `maythin@example.com` | `password123` |
| **Zaw Min** | `zawmin@example.com` | `password123` |

---

## 🛡️ Protected Route & Auth Redirect Logic

### 1. `ProtectedRoute.jsx` (`src/components/ProtectedRoute.jsx`)
A clean wrapper component for routes requiring authentication:

```jsx
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center p-8 text-gray-500">Loading...</div>;
  }

  // If not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
```

### 2. Route Configuration in `App.jsx`

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route
    path="/create-post"
    element={
      <ProtectedRoute>
        <CreatePost />
      </ProtectedRoute>
    }
  />
  <Route path="/post/:id" element={<DetailPost />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
</Routes>
```

---

## 🔐 Authentication Architecture (Context API & Custom Hook)

### `AuthContext.jsx` (`src/context/AuthContext.jsx`)
Provides global authentication state to all components in the React tree:

```jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, login as apiLogin, register as apiRegister, logout as apiLogout } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAuth() {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    }
    loadAuth();
  }, []);

  async function login(email, password) {
    const loggedInUser = await apiLogin(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  }

  async function signup(userData) {
    const newUser = await apiRegister(userData);
    setUser(newUser);
    return newUser;
  }

  async function logout() {
    await apiLogout();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

---

## 🗄️ Data Architecture & Mongoose Schemas

All simulated database operations are defined in [`src/services/api.js`](file:///media/thura/DATA/My%20Folders/Code%20with%20Thura/Courses/Fullstack%20Live%20Class/Projects/Vite%20Project/social-app/src/services/api.js).

---

### 1. Users Model (`models/User.js`)

#### Production Mongoose Schema:
```javascript
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
```

---

### 2. Posts Model (`models/Post.js`)

#### Production Mongoose Schema:
```javascript
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },
    body: {
      type: String,
      required: [true, "Post body is required"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for likesCount
PostSchema.virtual("likesCount").get(function () {
  return this.likes ? this.likes.length : 0;
});

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
```

---

## 🛠️ Project Structure

```text
social-app/
├── public/
├── src/
│   ├── components/
│   │   ├── CommentSession.jsx  # Comments list & submission form
│   │   ├── Navbar.jsx          # Top navigation with auth & profile badge
│   │   ├── PostCard.jsx        # Post card with like/save/comment triggers
│   │   └── ProtectedRoute.jsx  # Auth redirect wrapper for protected routes
│   ├── context/
│   │   └── AuthContext.jsx     # Authentication Context & useAuth custom hook
│   ├── pages/
│   │   ├── CreatePost.jsx      # Protected Post creation form
│   │   ├── DetailPost.jsx      # Post detail view + comments
│   │   ├── Home.jsx            # Feed / Recent posts page
│   │   ├── Login.jsx           # Simple Login page (auto-redirects if logged in)
│   │   └── Signup.jsx          # Simple Sign Up page (auto-redirects if logged in)
│   ├── services/
│   │   └── api.js              # In-memory DB, Auth, and async API layer
│   ├── App.jsx                 # Main router, ProtectedRoute, & AuthProvider wrapper
│   ├── main.jsx                # DOM mounting
│   └── index.css               # Global Tailwind CSS styles
├── package.json
├── vite.config.js
└── README.md
```
