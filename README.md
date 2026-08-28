# Social App (React + Vite)

A modern social feed application built with React, React Router, and Tailwind CSS. The app features an in-memory simulated database layer designed to mirror MongoDB/Mongoose schemas for straightforward migration to a production backend.

---

## 📌 Features

- **Feed & Post Browsing**: View recent posts with responsive layouts, media cards, and populated author profiles.
- **Detailed Post View**: Inspect individual post details with dynamic route matching (`/post/:id`).
- **User-Specific Post Interactions**:
  - `isLiked`: Tracks whether the authenticated user has liked a post (backed by an array of user IDs).
  - `isSaved`: Tracks bookmarks per user (backed by `savedBy` user ID array).
  - Real-time like counter updates.
- **User-Post Relational Linking**: Posts reference `userId` as their foreign author key, which is automatically populated with user metadata (`name`, `username`, `avatarUrl`).
- **In-Memory Simulated Database (`api.js`)**: Real async Promise-based API emulation with latency simulation (`FAKE_DELAY`), mutable state, and full CRUD operations for Users and Posts.
- **MongoDB / Mongoose Schema Ready**: Normalized data models equipped with timestamps, relational IDs, and standard field types.

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

### Building for Production

```bash
# Create production build in dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 🗄️ Data Architecture & Mongoose Schemas

All simulated database operations are encapsulated in [`src/services/api.js`](file:///media/thura/DATA/My%20Folders/Code%20with%20Thura/Courses/Fullstack%20Live%20Class/Projects/Vite%20Project/social-app/src/services/api.js).

---

### 1. Users Model (`models/User.js`)

#### Simulated Document:
```javascript
{
  id: 1, // Will map to _id (ObjectId) in MongoDB
  name: "Aung Ko",
  username: "aungko",
  email: "aungko@example.com",
  avatarUrl: "https://i.pravatar.cc/150?u=aungko",
  bio: "Passionate React & Node.js Developer.",
  createdAt: "2026-08-01T08:00:00.000Z",
  updatedAt: "2026-08-01T08:00:00.000Z"
}
```

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

Posts are linked to Users via `userId` (author reference) and track user likes via a `likes` array of User ObjectIds (`$addToSet` / `$pull`).

#### Simulated Document:
```javascript
{
  id: 1,
  userId: 1, // References User.id
  author: {
    id: 1,
    name: "Aung Ko",
    username: "aungko",
    avatarUrl: "https://i.pravatar.cc/150?u=aungko"
  },
  title: "Getting Started with React",
  body: "React is a JavaScript library for building user interfaces...",
  imageUrl: "https://picsum.photos/seed/react-intro/600/350",
  likes: [2, 3, 4], // Array of User IDs who liked this post
  likesCount: 3,
  isLiked: false,   // Computed: likes.includes(CURRENT_USER_ID)
  savedBy: [1],     // Array of User IDs who saved this post
  isSaved: true,    // Computed: savedBy.includes(CURRENT_USER_ID)
  createdAt: "2026-08-20T10:00:00.000Z",
  updatedAt: "2026-08-20T10:00:00.000Z"
}
```

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

### 3. Comments Model (`models/Comment.js`)

#### Production Mongoose Schema:
```javascript
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
```

---

## 🔌 API Service Interface (`src/services/api.js`)

### Posts & Likes API

| Function | Parameters | Return Type | Description |
|---|---|---|---|
| `getPosts(currentUserId?)` | `currentUserId = 1` | `Promise<Array<Post>>` | Fetches all posts with populated authors & `isLiked`/`isSaved` |
| `getPostById(id, currentUserId?)` | `id, currentUserId = 1` | `Promise<Post \| null>` | Fetches single post with populated author & user state |
| `getPostsByUserId(userId, currentUserId?)` | `userId, currentUserId = 1` | `Promise<Array<Post>>` | Fetches posts written by specific author |
| `createPost(postData, authorUserId?)` | `postData, authorUserId = 1` | `Promise<Post>` | Creates a post linked to an author user |
| `toggleLikePost(postId, userId?)` | `postId, userId = 1` | `Promise<Post \| null>` | Toggles user like ($addToSet / $pull) |
| `updatePostLikes(postId, delta, userId?)` | `postId, delta, userId = 1` | `Promise<Post \| null>` | Increments/decrements user like status |
| `likePost(postId, userId?)` | `postId, userId = 1` | `Promise<Post \| null>` | Adds user like to post |
| `unlikePost(postId, userId?)` | `postId, userId = 1` | `Promise<Post \| null>` | Removes user like from post |
| `toggleSavePost(postId, userId?, status?)` | `postId, userId = 1, status?` | `Promise<Post \| null>` | Toggles user bookmark/saved status |

### Users CRUD API

| Function | Parameters | Return Type | Description |
|---|---|---|---|
| `getUsers()` | None | `Promise<Array<User>>` | (Read All) Fetches all users |
| `getUserById(id)` | `id: number \| string` | `Promise<User \| null>` | (Read One) Fetches user by ID |
| `createUser(userData)` | `userData: Object` | `Promise<User>` | (Create) Creates a new user |
| `updateUser(id, updateData)` | `id, updateData: Object` | `Promise<User \| null>` | (Update) Updates user fields |
| `deleteUser(id)` | `id: number \| string` | `Promise<{ success, deletedUser }>` | (Delete) Deletes user by ID |
