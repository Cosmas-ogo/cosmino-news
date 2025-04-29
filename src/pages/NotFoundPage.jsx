import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="flex flex-col justify-center items-center min-h-screen text-center p-6 bg-gray-50">
      <h1 className="text-5xl font-bold text-blue-600 mb-6">404</h1>
      <p className="text-xl text-gray-700 mb-4">Page Not Found</p>
      <p className="text-gray-500 mb-8">
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Go back Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
