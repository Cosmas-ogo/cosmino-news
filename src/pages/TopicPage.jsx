import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticles } from "../utils/api";
import ArticleList from "../components/ArticleList";

const ARTICLES_PER_PAGE = 9;

const TopicPage = () => {
  const { topic } = useParams();
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

    fetchArticles(topic, sortBy, order, page, ARTICLES_PER_PAGE)
      .then(({ articles, totalCount }) => {
        setArticles(articles);
        setTotalCount(totalCount);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [topic, sortBy, order, page]);

  const handleSortChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", e.target.value);
    newParams.set("page", 1); // Reset to first page
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
    return (
      <section className="flex flex-1 justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">
          Loading articles for "{topic}"...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500 text-lg font-semibold">
          Topic not found. Please check the URL or select another topic.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-8 w-full">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 capitalize">
          {topic} Articles
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Discover the latest on {topic}!
        </p>
      </div>

      {/* Sorting Controls */}
      <div className="flex flex-wrap justify-center gap-4 items-center">
        <div className="flex gap-2 items-center">
          <label htmlFor="sort" className="text-sm text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {articles.length > 0 ? (
        <>
          <ArticleList articles={articles} />

          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(
              (pg) => (
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
              )
            )}

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">
          No articles found for "{topic}".
        </p>
      )}
    </section>
  );
};

export default TopicPage;
