import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchArticles } from "../utils/api";
import ArticleList from "../components/ArticleList";

const ARTICLES_PER_PAGE = 12;

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetchArticles(undefined, sortBy, order, page, ARTICLES_PER_PAGE)
      .then(({ articles, totalCount }) => {
        setArticles(articles);
        setTotalCount(totalCount);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [sortBy, order, page]);

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    newParams.set("page", 1);
    setSearchParams(newParams);
  };

  const handleOrderChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", e.target.value);
    newParams.set("page", 1);
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };

  const totalPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  if (loading) {
    return <p className="text-gray-600 text-center">Loading articles...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Failed to load articles.</p>;
  }

  return (
    <main className="flex flex-col gap-6">
      {/* Sort and Order Controls */}
      <div className="flex flex-wrap justify-center gap-4 items-center mb-6">
        <div className="flex gap-2 items-center">
          <label htmlFor="sort" className="text-sm text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <label htmlFor="order" className="text-sm text-gray-600">
            Order:
          </label>
          <select
            id="order"
            value={order}
            onChange={handleOrderChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* Articles */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
        All Articles
      </h1>

      <ArticleList articles={articles} />

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pg) => (
          <button
            key={pg}
            onClick={() => handlePageChange(pg)}
            className={`px-3 py-2 rounded ${
              page === pg
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-sm"
            }`}
          >
            {pg}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default HomePage;
