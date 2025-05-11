import ArticleCard from "./ArticleCard";

const ArticleList = ({ articles }) => {
  return (
    <section className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 [@media(min-width:1920px)]:grid-cols-6 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default ArticleList;
