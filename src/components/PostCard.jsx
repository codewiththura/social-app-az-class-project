import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { updatePostLikes, toggleSavePost } from "../services/api";

function PostCard({
  id,
  author,
  title,
  imageUrl,
  description,
  likesCount = 0,
  initialIsLiked = false,
  initialIsSaved = false,
  showDetailsLink = true,
}) {
  const [likes, setLikes] = useState(likesCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const navigate = useNavigate();

  // reload လုပ်ရင် state refresh ဖြစ်ဖို့
  useEffect(() => {
    setLikes(likesCount);
    setIsLiked(initialIsLiked);
    setIsSaved(initialIsSaved);
  }, [likesCount, initialIsLiked, initialIsSaved]);

  async function handleLike() {
    if (isLiked) {
      setLikes((prev) => Math.max(0, prev - 1));
      setIsLiked(false);
      await updatePostLikes(id, -1);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      await updatePostLikes(id, 1);
    }
  }

  async function handleSave() {
    setIsSaved((prev) => !prev);
    await toggleSavePost(id);
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5 mb-4 shadow-sm">
      <p className="text-xs text-gray-500 mb-2">Posted by {author}</p>

      <h2 className="text-md font-bold text-gray-900 mb-3">{title}</h2>
      <div>
        <img
          src={imageUrl}
          alt={title || "Post image"}
          className="w-full h-64 object-cover rounded"
        />
      </div>
      <p className="text-sm my-4 text-gray-700">{description}</p>

      <div className="flex justify-between items-center py-2">
        <span className="text-sm font-medium text-gray-600">{likes} likes</span>
        {showDetailsLink && id && (
          <Link
            to={`/post/${id}`}
            className="text-sm text-gray-600 font-medium hover:underline"
          >
            View Details
          </Link>
        )}
      </div>
      <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-sm">
        <button
          onClick={handleLike}
          className={`flex-1 py-1.5 font-medium text-center rounded hover:bg-gray-50 transition-colors ${
            isLiked ? "text-blue-600 font-semibold" : "text-gray-600"
          } hover:cursor-pointer`}
        >
          {isLiked ? "Liked" : "Like"}
        </button>
        <button
          onClick={() => navigate(`/post/${id}`)}
          className="flex-1 py-1.5 font-medium text-center rounded hover:bg-gray-50 text-gray-600 hover:cursor-pointer"
        >
          Comment
        </button>
        <button
          onClick={handleSave}
          className={`flex-1 py-1.5 font-medium text-center rounded hover:bg-gray-50 transition-colors ${
            isSaved ? "text-blue-600 font-semibold" : "text-gray-600"
          } hover:cursor-pointer`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default PostCard;
