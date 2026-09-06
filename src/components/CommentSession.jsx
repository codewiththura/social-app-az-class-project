import { useEffect, useState } from "react";

export default function CommentSession({ postId }) {
  const [commentBody, setCommentBody] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      fetch(`https://api.codewiththura.com/api/posts/${postId}/comments`)
        .then((response) => response.json())
        .then((result) => {
          setComments(result);
        });
    }

    getComments();
  }, [postId]);

  async function handleAddComment(e) {
    e.preventDefault();
    try {
      console.log("POST to server");
      const response = await fetch(
        `https://api.codewiththura.com/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: commentBody }),
        },
      );

      if (!response.ok) {
        console.error("HTTP error");
      }

      const newComment = await response.json();

      setComments((prev) => [...prev, newComment]);
      setCommentBody("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Comments</h2>
      <form
        onSubmit={handleAddComment}
        className="mb-6 space-y-3 border-b border-gray-100 pb-6"
      >
        <textarea
          rows="3"
          placeholder="Write comments..."
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-blue-600"
        ></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700">
          Submit Comment
        </button>
      </form>

      <div className="spae-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border-b border-gray-100 pb-3 last:border-b-0"
          >
            <p className="text-sm font-semibold text-gray-800">
              {comment.name}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {comment.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
