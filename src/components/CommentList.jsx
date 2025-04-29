import { useEffect, useState } from "react";
import {
  fetchCommentsByArticleId,
  postComment,
  deleteComment,
} from "../utils/api";
import CommentCard from "./CommentCard";
import { useUser } from "../contexts/UserContext"; // ✅ Correct import

const CommentList = ({ articleId }) => {
  const { currentUser } = useUser(); // ✅ Correct usage

  const [comments, setComments] = useState([]);
  const [newCommentBody, setNewCommentBody] = useState("");
  const [posting, setPosting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [postError, setPostError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCommentsByArticleId(articleId)
      .then((data) => {
        setComments(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [articleId]);

  const handlePostComment = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("Please login to post a comment!");
      return;
    }

    if (!newCommentBody.trim()) {
      setPostError(true);
      return;
    }

    setPosting(true);
    setPostError(false);

    postComment(articleId, newCommentBody, currentUser)
      .then((newComment) => {
        setComments((prev) => [newComment, ...prev]);
        setNewCommentBody(""); // Clear input
      })
      .catch(() => {
        setPostError(true);
      })
      .finally(() => {
        setPosting(false);
      });
  };

  const handleDeleteComment = (commentId) => {
    setDeletingCommentId(commentId);
    setDeleteError(false);

    deleteComment(commentId)
      .then(() => {
        setComments((prev) =>
          prev.filter((comment) => comment.comment_id !== commentId)
        );
      })
      .catch(() => {
        setDeleteError(true);
      })
      .finally(() => {
        setDeletingCommentId(null);
      });
  };

  if (loading) {
    return <p className="text-gray-600 text-center">Loading comments...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Failed to load comments.</p>;
  }

  return (
    <section className="flex flex-col gap-6 mt-8">
      <h2 className="text-lg sm:text-xl font-bold text-gray-700 text-center">
        Comments
      </h2>

      {/* Comment Form */}
      <form
        onSubmit={handlePostComment}
        className="flex flex-col gap-4 bg-white p-4 rounded shadow"
      >
        <textarea
          value={newCommentBody}
          onChange={(e) => setNewCommentBody(e.target.value)}
          placeholder="Write your comment here..."
          rows={4}
          className="border rounded p-2 w-full resize-none bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={posting}
        ></textarea>

        <button
          type="submit"
          disabled={posting || !newCommentBody.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:opacity-50"
        >
          {posting ? "Posting..." : "Post Comment"}
        </button>

        {postError && (
          <p className="text-red-500 text-sm mt-2">
            Failed to post your comment. Please make sure you've entered text
            and try again.
          </p>
        )}
      </form>

      {/* Comments List */}
      <div className="flex flex-col gap-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center">
            No comments yet. Be the first!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              currentUser={currentUser}
              onDelete={handleDeleteComment}
              deleting={deletingCommentId === comment.comment_id}
            />
          ))
        )}
      </div>

      {deleteError && (
        <p className="text-red-500 text-sm text-center">
          Failed to delete comment. Please try again.
        </p>
      )}
    </section>
  );
};

export default CommentList;
