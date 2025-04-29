import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, voteArticle } from "../utils/api";
import { formatDate } from "../utils/formatDate";
import CommentList from "../components/CommentList";
import { useUser } from "../contexts/UserContext";

const ArticlePage = () => {
  const { article_id } = useParams();
  const { currentUser } = useUser();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [voteError, setVoteError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [article_id]);

  const handleVote = (change) => {
    if (!currentUser) {
      alert("Please log in to vote!");
      return;
    }

    if (!article) return;

    // Optimistic UI Update
    setArticle((prev) => ({
      ...prev,
      votes: prev.votes + change,
    }));

    voteArticle(article.article_id, change)
      .then(() => {
        setVoteError(false);
      })
      .catch(() => {
        // Revert UI on error
        setArticle((prev) => ({
          ...prev,
          votes: prev.votes - change,
        }));
        setVoteError(true);
      });
  };

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading article...</p>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-lg font-semibold">
          Article not found. Please check the URL or go back to Home.
        </p>
      </section>
    );
  }

  return (
    <section className="flex-1 flex items-start justify-center w-full min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50">
      <article className="w-full max-w-5xl flex flex-col gap-6 bg-white rounded-md shadow-md p-6">
        {/* Article Image */}
        <img
          src={article.article_img_url}
          alt={article.title}
          className="w-full h-60 object-cover rounded-md"
        />

        {/* Article Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          {article.title}
        </h1>

        {/* Article Metadata */}
        <div className="text-sm text-gray-500 flex flex-wrap gap-4">
          <span>By {article.author}</span>
          <span>{formatDate(article.created_at)}</span>
        </div>

        {/* Article Body */}
        <p className="text-gray-700 text-base leading-relaxed">
          {article.body}
        </p>

        {/* Voting Section */}
        <div className="flex flex-col items-center gap-2 mt-6">
          <p className="text-lg font-semibold text-gray-700">
            Votes: {article.votes}
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => handleVote(1)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
            >
              👍 Upvote
            </button>
            <button
              onClick={() => handleVote(-1)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              👎 Downvote
            </button>
          </div>
          {voteError && (
            <p className="text-red-500 text-sm mt-2">
              Failed to register your vote. Please try again.
            </p>
          )}
        </div>

        {/* Comment List */}
        <CommentList articleId={article.article_id} />
      </article>
    </section>
  );
};

export default ArticlePage;
