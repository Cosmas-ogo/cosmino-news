import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const ArticleCard = ({ article }) => {
  return (
    <div className="border rounded-lg shadow p-4 flex flex-col hover:shadow-lg transition">
      <Link to={`/articles/${article.article_id}`}>
        <img
          src={article.article_img_url}
          alt={`Image for article ${article.title}`}
          className="h-40 w-full object-cover rounded mb-4"
        />
      </Link>

      <h2 className="text-lg font-semibold mb-2">
        <Link
          to={`/articles/${article.article_id}`}
          className="text-blue-600 hover:underline"
        >
          {article.title}
        </Link>
      </h2>

      <p className="text-sm text-gray-600 mb-2">
        by {article.author} • {formatDate(article.created_at)}
      </p>

      <div className="flex justify-between text-sm text-gray-600 mt-auto">
        <div>👍 {article.votes}</div>
        <div>💬 {article.comment_count}</div>
        <div>#{article.topic}</div>
      </div>
    </div>
  );
};

export default ArticleCard;
