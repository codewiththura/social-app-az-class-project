/**
 * Frontend API Service Layer
 * Native Fetch API ကို အသုံးပြုပြီး Express Backend (http://localhost:5000/api) နှင့် ချိတ်ဆက်ထားပါသည်။
 */

export const API_BASE_URL =
  import.meta.env?.VITE_API_URL || "http://localhost:5000/api";

// Active Session State (လက်ရှိ Login ဝင်ထားသော User ID)
export let CURRENT_USER_ID = null;

/**
 * Image URL Helper
 * Static uploaded images (/uploads/...) များသည် Backend Server တွင် ရှိသောကြောင့်
 * Full URL (http://localhost:5000/uploads/...) သို့ တွဲစပ်ပေးပါသည်။
 */
export function getImageUrl(url) {
  if (!url) return "";
  // အကယ်၍ external link (https://... သို့မဟုတ် http://) သို့မဟုတ် blob/data ဖြစ်ပါက မူလအတိုင်းထားမည်
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:") ||
    url.startsWith("data:")
  ) {
    return url;
  }
  // Backend Base Origin ကို ယူခြင်း (ဥပမာ- http://localhost:5000/api မှ /api ကို ဖယ်ထုတ်ခြင်း)
  const serverOrigin = API_BASE_URL.replace(/\/api\/?$/, "");
  return `${serverOrigin}${url.startsWith("/") ? "" : "/"}${url}`;
}

// ==========================================
// 1. Authentication API Endpoints
// ==========================================

/**
 * Log in with email and password
 */
export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  CURRENT_USER_ID = data.id;
  return data;
}

/**
 * Register / Sign up a new user account
 */
export async function register(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  CURRENT_USER_ID = data.id;
  return data;
}

/**
 * Get current authenticated user profile
 */
export async function getCurrentUser() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`);
    if (!response.ok) {
      CURRENT_USER_ID = null;
      return null;
    }
    const user = await response.json();
    CURRENT_USER_ID = user.id;
    return user;
  } catch {
    CURRENT_USER_ID = null;
    return null;
  }
}

/**
 * Log out active user
 */
export async function logout() {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
    });
    CURRENT_USER_ID = null;
    return await response.json();
  } catch {
    CURRENT_USER_ID = null;
    return { success: true };
  }
}

// ==========================================
// 2. Posts & Likes API Endpoints
// ==========================================

/**
 * Fetch all posts with populated authors and user-specific like/saved state
 */
export async function getPosts(currentUserId) {
  const query = currentUserId ? `?userId=${currentUserId}` : "";
  const response = await fetch(`${API_BASE_URL}/posts${query}`);
  return await response.json();
}

/**
 * Fetch a single post by ID with populated author and user-specific flags
 */
export async function getPostById(id, currentUserId = CURRENT_USER_ID) {
  const query = currentUserId ? `?userId=${currentUserId}` : "";
  const response = await fetch(`${API_BASE_URL}/posts/${id}${query}`);
  if (!response.ok) return null;
  return await response.json();
}

/**
 * Fetch all posts written by a specific user (author)
 */
export async function getPostsByUserId(
  userId,
  currentUserId = CURRENT_USER_ID,
) {
  const allPosts = await getPosts(currentUserId);
  return allPosts.filter((post) => Number(post.userId) === Number(userId));
}

/**
 * Create a new post linked to an author user
 */
export async function createPost(postData, authorUserId = CURRENT_USER_ID) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: postData.title,
      body: postData.body || postData.content || "",
      imageUrl: postData.imageUrl || postData.image || "",
      userId: postData.userId || authorUserId || CURRENT_USER_ID,
      isSaved: postData.isSaved,
    }),
  });
  return await response.json();
}

/**
 * Update an existing post by ID
 */
export async function updatePost(postId, postData) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: postData.title,
      body: postData.body,
      imageUrl: postData.imageUrl,
    }),
  });
  return await response.json();
}

/**
 * Upload an image file for a post (Post Image Upload)
 * @param {number|string} postId - Post ID
 * @param {File} file - Selected image file from input[type="file"]
 */
export async function uploadPostPhoto(postId, file) {
  // Multipart Form Data အဖြစ် ပြောင်းလဲတည်ဆောက်ခြင်း
  const formData = new FormData();
  // Backend multer middleware မှ 'photo', 'image', 'avatar', 'file' အားလုံးလက်ခံပါသည်
  formData.append("photo", file);

  // မှတ်ချက်: File upload လုပ်ရာတွင် Content-Type header ကို manual မသတ်မှတ်ရပါ။
  // Browser မှ multipart/form-data boundary ကို အလိုအလျောက် သတ်မှတ်ပေးပါမည်။
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/photo`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to upload post photo");
  }
  return data;
}

/**
 * Upload user profile avatar photo
 * @param {number|string} userId - User ID
 * @param {File} file - Selected image file
 */
export async function uploadUserPhoto(userId, file) {
  const formData = new FormData();
  formData.append("photo", file);

  const response = await fetch(`${API_BASE_URL}/users/${userId}/photo`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to upload user photo");
  }
  return data;
}

/**
 * Delete a post by ID
 */
export async function deletePost(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "DELETE",
  });
  return await response.json();
}

/**
 * Fetch all saved posts of the logged-in user
 */
export async function getSavedPosts() {
  const allPosts = await getPosts();
  return allPosts.filter((post) => post.isSaved);
}

/**
 * Toggle like for a user on a post
 */
export async function toggleLikePost(postId, userId = CURRENT_USER_ID) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: userId || CURRENT_USER_ID }),
  });
  if (!response.ok) return null;
  return await response.json();
}

/**
 * Increment or decrement likes count
 */
export async function updatePostLikes(
  postId,
  delta = 1,
  userId = CURRENT_USER_ID,
) {
  void delta;
  return toggleLikePost(postId, userId);
}

/**
 * Toggle or set the isSaved status for a user on a post
 */
export async function toggleSavePost(
  postId,
  userId = CURRENT_USER_ID,
  forcedStatus = null,
) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId || CURRENT_USER_ID,
      forcedStatus,
    }),
  });
  if (!response.ok) return null;
  return await response.json();
}

// ==========================================
// 3. Comments API Endpoints
// ==========================================

/**
 * Fetch comments for a specific post
 */
export async function getCommentsByPostId(postId) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
  return await response.json();
}

/**
 * Create a new comment on a post
 */
export async function createComment(
  postId,
  commentData,
  authorUserId = CURRENT_USER_ID,
) {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: commentData.name,
      email: commentData.email,
      body: commentData.body || "",
      userId: commentData.userId || authorUserId || CURRENT_USER_ID,
    }),
  });
  return await response.json();
}

// ==========================================
// 4. Users CRUD API Endpoints
// ==========================================

/**
 * Fetch all users
 */
export async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);
  return await response.json();
}

/**
 * Fetch a single user by ID
 */
export async function getUserById(id) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) return null;
  return await response.json();
}

/**
 * Create a new user (CRUD Create)
 */
export async function createUser(userData) {
  return register(userData);
}

/**
 * Update an existing user by ID (CRUD Update)
 */
export async function updateUser(id, updateData) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) return null;
  return await response.json();
}

/**
 * Delete a user by ID (CRUD Delete)
 */
export async function deleteUser(id) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
