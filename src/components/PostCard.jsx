import { useEffect, useState } from "react";
import { Link } from "react-router";

function PostCard({
  id,
  title,
  description,
  imageUrl,
  showDetailsLink,
  likeCounts,
  initialIsLiked,
}) {
  const [likes, setLikes] = useState(likeCounts);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isSaved, setIsSaved] = useState(false);

  // console.log("likes, isLike", likes, isLiked);
  // console.log("likeCounts, initialIsLiked", likeCounts, initialIsLiked);

  useEffect(() => {
    setLikes(likeCounts);
    setIsLiked(initialIsLiked);
  }, [likeCounts, initialIsLiked]);

  async function updatePostLikes() {
    const response = await fetch(
      `https://api.codewiththura.com/api/posts/${id}/like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) return null;
    return await response.json();
  }

  async function handleLike() {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
      await updatePostLikes();
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      await updatePostLikes();
    }
  }

  function handleSave() {
    if (isSaved) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-5 mb-4">
      <h2 className="text-md font-bold text-gray-900 mb-3">{title}</h2>
      <div>
        <img src={imageUrl} alt="Image" className="w-full h-64 object-cover" />
      </div>
      <p className="text-sm my-4">{description}</p>

      <div className="flex justify-between items-center py-2">
        <span>{likes} likes</span>
        {showDetailsLink && <Link to={`/post/${id}`}>View Details</Link>}
      </div>
      <div className="flex justify-between items-center border-t border-gray-100 pt-2 text-sm">
        <button
          onClick={handleLike}
          className={`py-1.5 font-medium text-center rounded hover:bg-gray-50 ${isLiked ? "text-blue-600" : "text-gray-600"} hover:cursor-pointer`}
        >
          {isLiked ? "Liked" : "Like"}
        </button>
        <button className="py-1.5 font-medium text-center rounded hover:bg-gray-50 text-gray-600 hover:cursor-pointer">
          Comment
        </button>
        <button
          onClick={handleSave}
          className={`py-1.5 font-medium text-center rounded hover:bg-gray-50 ${isSaved ? "text-blue-600" : "text-gray-600"} hover:cursor-pointer`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default PostCard;
