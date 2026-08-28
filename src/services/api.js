/**
 * Simulated Database & API Layer
 *
 * This module acts as an in-memory database and simulated REST API layer.
 * Data structures and models are designed following MongoDB/Mongoose schemas
 * for seamless future migration to a real production database.
 */

// Simulated Logged-In User ID (Session / Auth context)
export const CURRENT_USER_ID = 1;

// ==========================================
// 1. Simulated In-Memory Database Collections
// ==========================================

// Collection: Users
let users = [
  {
    id: 1,
    name: "Thura",
    username: "thura",
    email: "thura@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=thura",
    bio: "Passionate React & Node.js Developer.",
    createdAt: "2026-08-01T08:00:00.000Z",
    updatedAt: "2026-08-01T08:00:00.000Z",
  },
  {
    id: 2,
    name: "May Thin",
    username: "maythin",
    email: "maythin@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=maythin",
    bio: "Frontend UI/UX enthusiast and technical writer.",
    createdAt: "2026-08-02T09:00:00.000Z",
    updatedAt: "2026-08-02T09:00:00.000Z",
  },
  {
    id: 3,
    name: "Zaw Min",
    username: "zawmin",
    email: "zawmin@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=zawmin",
    bio: "Fullstack engineer passionate about clean architecture.",
    createdAt: "2026-08-03T10:00:00.000Z",
    updatedAt: "2026-08-03T10:00:00.000Z",
  },
  {
    id: 4,
    name: "Hla Hla",
    username: "hlahla",
    email: "hlahla@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=hlahla",
    bio: "Mobile and Single Page Application enthusiast.",
    createdAt: "2026-08-04T11:00:00.000Z",
    updatedAt: "2026-08-04T11:00:00.000Z",
  },
  {
    id: 5,
    name: "Kyaw Thu",
    username: "kyawthu",
    email: "kyawthu@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=kyawthu",
    bio: "Software Architect & Tech Instructor.",
    createdAt: "2026-08-05T12:00:00.000Z",
    updatedAt: "2026-08-05T12:00:00.000Z",
  },
  {
    id: 6,
    name: "Su Su",
    username: "susu",
    email: "susu@example.com",
    avatarUrl: "https://i.pravatar.cc/150?u=susu",
    bio: "React and Next.js Frontend Developer.",
    createdAt: "2026-08-06T13:00:00.000Z",
    updatedAt: "2026-08-06T13:00:00.000Z",
  },
];

// Collection: Posts
let posts = [
  {
    id: 1,
    userId: 1, // References User.id (Mongoose: ObjectId ref: 'User')
    title: "Getting Started with React",
    body: "React is a JavaScript library for building user interfaces. It lets you create reusable components that manage their own state, then compose them to make complex UIs. React uses a virtual DOM to efficiently update the real DOM when your data changes.",
    imageUrl: "https://picsum.photos/seed/react-intro/600/350",
    likes: [2, 3, 4, 5], // Array of User IDs who liked this post (Mongoose: [{ type: ObjectId, ref: 'User' }])
    likesCount: 4,
    savedBy: [2], // Array of User IDs who saved this post
    isSaved: false,
    createdAt: "2026-08-20T10:00:00.000Z",
    updatedAt: "2026-08-20T10:00:00.000Z",
  },
  {
    id: 2,
    userId: 2, // References User.id
    title: "Understanding useState Hook",
    body: "The useState hook is one of the most important hooks in React. It lets you add state to functional components. When you call useState, it returns an array with two elements: the current state value and a function to update it.",
    imageUrl: "https://picsum.photos/seed/usestate-hook/600/350",
    likes: [1, 3, 4], // Current user (id: 1) has liked this post
    likesCount: 3,
    savedBy: [1, 3], // Current user (id: 1) has saved this post
    isSaved: true,
    createdAt: "2026-08-21T09:30:00.000Z",
    updatedAt: "2026-08-21T09:30:00.000Z",
  },
  {
    id: 3,
    userId: 3, // References User.id
    title: "Props and Component Communication",
    body: "Props are the way components talk to each other in React. A parent component can pass data down to its children through props. Props are read-only, meaning a child component should never modify the props it receives.",
    imageUrl: "https://picsum.photos/seed/props-react/600/350",
    likes: [1, 2], // Current user (id: 1) has liked this post
    likesCount: 2,
    savedBy: [2],
    isSaved: false,
    createdAt: "2026-08-22T14:15:00.000Z",
    updatedAt: "2026-08-22T14:15:00.000Z",
  },
  {
    id: 4,
    userId: 4, // References User.id
    title: "React Router for Navigation",
    body: "React Router lets you handle navigation in a single page application. Instead of loading a new HTML page from the server, React Router swaps components in and out based on the URL. This makes your app feel fast and responsive.",
    imageUrl: "https://picsum.photos/seed/react-router/600/350",
    likes: [2, 3, 5, 6],
    likesCount: 4,
    savedBy: [],
    isSaved: false,
    createdAt: "2026-08-23T11:45:00.000Z",
    updatedAt: "2026-08-23T11:45:00.000Z",
  },
  {
    id: 5,
    userId: 5, // References User.id
    title: "useEffect and Side Effects",
    body: "The useEffect hook lets you perform side effects in your components. Side effects include things like fetching data, setting up event listeners, or manually changing the DOM. useEffect runs after every render by default.",
    imageUrl: "https://picsum.photos/seed/useeffect-hook/600/350",
    likes: [1, 2, 4, 6], // Current user (id: 1) has liked this post
    likesCount: 4,
    savedBy: [1], // Current user (id: 1) has saved this post
    isSaved: true,
    createdAt: "2026-08-24T16:20:00.000Z",
    updatedAt: "2026-08-24T16:20:00.000Z",
  },
  {
    id: 6,
    userId: 6, // References User.id
    title: "Building Forms in React",
    body: "Forms in React work differently than regular HTML forms. In React, we use controlled components where form data is handled by the React state. Each input element has a value that is controlled by useState, and an onChange handler that updates the state.",
    imageUrl: "https://picsum.photos/seed/react-forms/600/350",
    likes: [2, 3],
    likesCount: 2,
    savedBy: [],
    isSaved: false,
    createdAt: "2026-08-25T08:00:00.000Z",
    updatedAt: "2026-08-25T08:00:00.000Z",
  },
];

// Collection: Comments
let comments = [
  {
    id: 101,
    postId: 1, // References Post.id
    userId: 2, // References User.id
    name: "May Thin",
    email: "maythin@example.com",
    body: "This is a great introduction to React! Very helpful for beginners.",
    createdAt: "2026-08-20T11:00:00.000Z",
  },
  {
    id: 102,
    postId: 1,
    userId: 3,
    name: "Zaw Min",
    email: "zawmin@example.com",
    body: "I learned a lot from this post. Thanks for sharing!",
    createdAt: "2026-08-20T12:30:00.000Z",
  },
  {
    id: 201,
    postId: 2,
    userId: 4,
    name: "Hla Hla",
    email: "hlahla@example.com",
    body: "useState is really easy to understand once you see examples like this.",
    createdAt: "2026-08-21T10:00:00.000Z",
  },
  {
    id: 202,
    postId: 2,
    userId: 1,
    name: "Aung Ko",
    email: "aungko@example.com",
    body: "Can you also explain useReducer? I heard it is similar to useState.",
    createdAt: "2026-08-21T11:15:00.000Z",
  },
  {
    id: 203,
    postId: 2,
    userId: 5,
    name: "Kyaw Thu",
    email: "kyawthu@example.com",
    body: "Very clear explanation. I finally understand how state works!",
    createdAt: "2026-08-21T14:45:00.000Z",
  },
  {
    id: 301,
    postId: 3,
    userId: 6,
    name: "Su Su",
    email: "susu@example.com",
    body: "Props are so important for building reusable components. Good article!",
    createdAt: "2026-08-22T15:00:00.000Z",
  },
  {
    id: 401,
    postId: 4,
    userId: 2,
    name: "May Thin",
    email: "maythin@example.com",
    body: "React Router makes single page apps feel like real websites.",
    createdAt: "2026-08-23T12:00:00.000Z",
  },
  {
    id: 402,
    postId: 4,
    userId: 1,
    name: "Aung Ko",
    email: "aungko@example.com",
    body: "I was confused about client-side routing before this. Now it makes sense!",
    createdAt: "2026-08-23T13:20:00.000Z",
  },
  {
    id: 501,
    postId: 5,
    userId: 3,
    name: "Zaw Min",
    email: "zawmin@example.com",
    body: "useEffect was the hardest hook for me to learn. This post helped a lot.",
    createdAt: "2026-08-24T17:00:00.000Z",
  },
  {
    id: 502,
    postId: 5,
    userId: 4,
    name: "Hla Hla",
    email: "hlahla@example.com",
    body: "The cleanup function part is really important. Thanks for including it!",
    createdAt: "2026-08-24T18:10:00.000Z",
  },
  {
    id: 601,
    postId: 6,
    userId: 5,
    name: "Kyaw Thu",
    email: "kyawthu@example.com",
    body: "Controlled components make forms so much easier to manage.",
    createdAt: "2026-08-25T09:30:00.000Z",
  },
];

// Network latency simulation (milliseconds)
const FAKE_DELAY = 500;

/**
 * Simulates network latency with a Promise
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Helper to populate user/author details and compute user-specific flags (isLiked, isSaved)
 * Mirrors Mongoose .populate('author') or .populate('userId')
 *
 * @param {Object} post - Raw post document
 * @param {number} currentUserId - The current user's ID
 * @returns {Object} Formatted post with populated author and isLiked/isSaved flags
 */
function formatPost(post, currentUserId = CURRENT_USER_ID) {
  const authorUser = users.find((u) => u.id === Number(post.userId));
  const likesList = Array.isArray(post.likes) ? post.likes : [];
  const savedList = Array.isArray(post.savedBy) ? post.savedBy : [];

  const isLiked = likesList.includes(Number(currentUserId));
  const isSaved =
    savedList.includes(Number(currentUserId)) || Boolean(post.isSaved);

  return {
    ...post,
    userId: post.userId,
    author: authorUser
      ? {
          id: authorUser.id,
          name: authorUser.name,
          username: authorUser.username,
          avatarUrl: authorUser.avatarUrl,
        }
      : { id: post.userId || 0, name: "Unknown Author" },
    likes: [...likesList],
    likesCount: likesList.length,
    isLiked: isLiked,
    savedBy: [...savedList],
    isSaved: isSaved,
  };
}

// ==========================================
// 2. Posts & Likes API Endpoints
// ==========================================

/**
 * Fetch all posts with populated authors and user-specific like/saved state
 * @param {number|string} [currentUserId=CURRENT_USER_ID] - The requesting user ID
 * @returns {Promise<Array>} Array of populated post objects
 */
export async function getPosts(currentUserId = CURRENT_USER_ID) {
  await delay(FAKE_DELAY);
  return posts.map((post) => formatPost(post, currentUserId));
}

/**
 * Fetch a single post by ID with populated author and user-specific flags
 * @param {number|string} id - Post ID
 * @param {number|string} [currentUserId=CURRENT_USER_ID] - The requesting user ID
 * @returns {Promise<Object|null>} Populated post object or null if not found
 */
export async function getPostById(id, currentUserId = CURRENT_USER_ID) {
  await delay(FAKE_DELAY);
  const post = posts.find((p) => p.id === Number(id));
  return post ? formatPost(post, currentUserId) : null;
}

/**
 * Fetch all posts written by a specific user (author)
 * @param {number|string} userId - Author User ID
 * @param {number|string} [currentUserId=CURRENT_USER_ID] - The requesting user ID
 * @returns {Promise<Array>} Array of author's post objects
 */
export async function getPostsByUserId(
  userId,
  currentUserId = CURRENT_USER_ID,
) {
  await delay(FAKE_DELAY);
  const userPosts = posts.filter((p) => p.userId === Number(userId));
  return userPosts.map((post) => formatPost(post, currentUserId));
}

/**
 * Create a new post linked to a user (author) (simulated database insert)
 * @param {Object} postData - { title, body, imageUrl, userId, isSaved }
 * @param {number|string} [authorUserId=CURRENT_USER_ID] - Author User ID
 * @returns {Promise<Object>} Created and populated post object
 */
export async function createPost(postData, authorUserId = CURRENT_USER_ID) {
  await delay(FAKE_DELAY);

  const now = new Date().toISOString();
  const linkedUserId = Number(
    postData.userId || authorUserId || CURRENT_USER_ID,
  );

  const newPost = {
    id: Date.now(),
    userId: linkedUserId,
    title: postData.title,
    body: postData.body || postData.content || "",
    imageUrl:
      postData.imageUrl ||
      postData.image ||
      "https://picsum.photos/seed/" + Date.now() + "/600/350",
    likes: [],
    likesCount: 0,
    savedBy: postData.isSaved ? [linkedUserId] : [],
    isSaved: Boolean(postData.isSaved || false),
    createdAt: now,
    updatedAt: now,
  };

  posts.unshift(newPost);
  return formatPost(newPost, linkedUserId);
}

/**
 * Toggle like for a user on a post ($addToSet / $pull simulation)
 * @param {number|string} postId - Target Post ID
 * @param {number|string} [userId=CURRENT_USER_ID] - User who is liking/unliking
 * @returns {Promise<Object|null>} Updated post object or null
 */
export async function toggleLikePost(postId, userId = CURRENT_USER_ID) {
  await delay(FAKE_DELAY);
  const postIndex = posts.findIndex((p) => p.id === Number(postId));
  if (postIndex === -1) return null;

  const targetUserId = Number(userId);
  const post = posts[postIndex];

  if (!Array.isArray(post.likes)) {
    post.likes = [];
  }

  const likeIdx = post.likes.indexOf(targetUserId);
  if (likeIdx > -1) {
    // User already liked -> unlike ($pull)
    post.likes.splice(likeIdx, 1);
  } else {
    // User hasn't liked -> like ($addToSet)
    post.likes.push(targetUserId);
  }

  post.likesCount = post.likes.length;
  post.updatedAt = new Date().toISOString();

  return formatPost(post, targetUserId);
}

/**
 * Increment or decrement likes count (with user association)
 * @param {number|string} postId - Post ID
 * @param {number} delta - (+1 or -1)
 * @param {number|string} [userId=CURRENT_USER_ID] - User ID
 * @returns {Promise<Object|null>} Updated post object
 */
export async function updatePostLikes(
  postId,
  delta = 1,
  userId = CURRENT_USER_ID,
) {
  await delay(FAKE_DELAY);
  const postIndex = posts.findIndex((p) => p.id === Number(postId));
  if (postIndex === -1) return null;

  const targetUserId = Number(userId);
  const post = posts[postIndex];

  if (!Array.isArray(post.likes)) {
    post.likes = [];
  }

  const likeIdx = post.likes.indexOf(targetUserId);

  if (delta > 0) {
    if (likeIdx === -1) post.likes.push(targetUserId);
  } else {
    if (likeIdx > -1) post.likes.splice(likeIdx, 1);
  }

  post.likesCount = post.likes.length;
  post.updatedAt = new Date().toISOString();

  return formatPost(post, targetUserId);
}

/**
 * Increment like on a post for a user
 * @param {number|string} postId - Post ID
 * @param {number|string} [userId=CURRENT_USER_ID] - User ID
 * @returns {Promise<Object|null>} Updated post object
 */
export async function likePost(postId, userId = CURRENT_USER_ID) {
  return updatePostLikes(postId, 1, userId);
}

/**
 * Decrement like on a post for a user
 * @param {number|string} postId - Post ID
 * @param {number|string} [userId=CURRENT_USER_ID] - User ID
 * @returns {Promise<Object|null>} Updated post object
 */
export async function unlikePost(postId, userId = CURRENT_USER_ID) {
  return updatePostLikes(postId, -1, userId);
}

/**
 * Toggle or set the isSaved status for a user on a post
 * @param {number|string} postId - Post ID
 * @param {number|string} [userId=CURRENT_USER_ID] - User ID
 * @param {boolean} [forcedStatus] - Optional explicit boolean status
 * @returns {Promise<Object|null>} Updated post object or null
 */
export async function toggleSavePost(
  postId,
  userId = CURRENT_USER_ID,
  forcedStatus = null,
) {
  await delay(FAKE_DELAY);
  const postIndex = posts.findIndex((p) => p.id === Number(postId));
  if (postIndex === -1) return null;

  const targetUserId = Number(userId);
  const post = posts[postIndex];

  if (!Array.isArray(post.savedBy)) {
    post.savedBy = [];
  }

  const savedIdx = post.savedBy.indexOf(targetUserId);
  const isCurrentlySaved = savedIdx > -1;
  const shouldSave =
    forcedStatus !== null ? Boolean(forcedStatus) : !isCurrentlySaved;

  if (shouldSave) {
    if (savedIdx === -1) post.savedBy.push(targetUserId);
  } else {
    if (savedIdx > -1) post.savedBy.splice(savedIdx, 1);
  }

  post.isSaved = shouldSave;
  post.updatedAt = new Date().toISOString();

  return formatPost(post, targetUserId);
}

// ==========================================
// 3. Comments API Endpoints
// ==========================================

/**
 * Fetch comments for a specific post
 * @param {number|string} postId - Post ID
 * @returns {Promise<Array>} Array of comment objects
 */
export async function getCommentsByPostId(postId) {
  await delay(FAKE_DELAY);
  const postComments = comments.filter((c) => c.postId === Number(postId));
  return postComments.map((comment) => ({ ...comment }));
}

/**
 * Create a new comment on a post (simulated database insert)
 * @param {number|string} postId - Target Post ID
 * @param {Object} commentData - { name, email, body, userId }
 * @param {number|string} [authorUserId=CURRENT_USER_ID] - Author User ID
 * @returns {Promise<Object>} Created comment object
 */
export async function createComment(
  postId,
  commentData,
  authorUserId = CURRENT_USER_ID,
) {
  await delay(FAKE_DELAY);

  const linkedUserId = Number(
    commentData.userId || authorUserId || CURRENT_USER_ID,
  );
  const user = users.find((u) => u.id === linkedUserId);

  const newComment = {
    id: Date.now(),
    postId: Number(postId),
    userId: linkedUserId,
    name: commentData.name || (user ? user.name : "Anonymous"),
    email: commentData.email || (user ? user.email : "user@example.com"),
    body: commentData.body || "",
    createdAt: new Date().toISOString(),
  };

  comments.push(newComment);
  return { ...newComment };
}

// ==========================================
// 4. Users CRUD API Endpoints
// ==========================================

/**
 * Fetch all users
 * @returns {Promise<Array>} Array of all users
 */
export async function getUsers() {
  await delay(FAKE_DELAY);
  return users.map((user) => ({ ...user }));
}

/**
 * Fetch a single user by ID
 * @param {number|string} id - User ID
 * @returns {Promise<Object|null>} User object or null if not found
 */
export async function getUserById(id) {
  await delay(FAKE_DELAY);
  const user = users.find((u) => u.id === Number(id));
  return user ? { ...user } : null;
}

/**
 * Create a new user (Create)
 * @param {Object} userData - { name, username, email, avatarUrl, bio }
 * @returns {Promise<Object>} Created user object
 */
export async function createUser(userData) {
  await delay(FAKE_DELAY);

  const now = new Date().toISOString();
  const newUser = {
    id: Date.now(),
    name: userData.name || "",
    username: userData.username || `user_${Date.now()}`,
    email: userData.email || "",
    avatarUrl:
      userData.avatarUrl ||
      `https://i.pravatar.cc/150?u=${userData.username || Date.now()}`,
    bio: userData.bio || "",
    createdAt: now,
    updatedAt: now,
  };

  users.push(newUser);
  return { ...newUser };
}

/**
 * Update an existing user by ID (Update)
 * @param {number|string} id - User ID
 * @param {Object} updateData - User fields to update
 * @returns {Promise<Object|null>} Updated user object or null
 */
export async function updateUser(id, updateData) {
  await delay(FAKE_DELAY);

  const userIndex = users.findIndex((u) => u.id === Number(id));
  if (userIndex === -1) return null;

  users[userIndex] = {
    ...users[userIndex],
    ...updateData,
    id: users[userIndex].id, // Protect immutable ID
    updatedAt: new Date().toISOString(),
  };

  return { ...users[userIndex] };
}

/**
 * Delete a user by ID (Delete)
 * @param {number|string} id - User ID
 * @returns {Promise<{ success: boolean, deletedUser: Object | null }>} Deletion result
 */
export async function deleteUser(id) {
  await delay(FAKE_DELAY);

  const userIndex = users.findIndex((u) => u.id === Number(id));
  if (userIndex === -1) {
    return { success: false, deletedUser: null };
  }

  const [deletedUser] = users.splice(userIndex, 1);
  return { success: true, deletedUser };
}
