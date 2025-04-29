import { formatDate } from "../utils/formatDate";

const CommentCard = ({ comment, currentUser, onDelete, deleting }) => {
  const isOwnComment = comment.author === currentUser;

  return (
    <div className="border rounded-md shadow-sm p-4 bg-white flex flex-col gap-3 hover:shadow-md transition relative">
      {/* Author and Date */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>@{comment.author}</span>
        <span>{formatDate(comment.created_at)}</span>
      </div>

      {/* Body */}
      <p className="text-gray-700 text-sm leading-relaxed">{comment.body}</p>

      {/* Votes */}
      <div className="text-xs text-gray-400 flex gap-2">👍 {comment.votes}</div>

      {/* Delete button (only if user owns the comment) */}
      {isOwnComment && (
        <button
          onClick={() => onDelete(comment.comment_id)}
          disabled={deleting}
          className="absolute top-2 right-2 text-red-500 text-xs hover:underline disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </div>
  );
};

export default CommentCard;
