import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../utils/api";
import { useUser } from "../contexts/UserContext";
import Logo from "../assets/cosmino-news-logo.png"; // Your logo

const LoginPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (selectedUser) {
      setCurrentUser(selectedUser);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-center">
        <div className="p-4">
          <p className="text-lg font-semibold mb-4">Failed to load users.</p>
          <p className="text-sm text-gray-400">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-sm bg-black text-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={Logo}
            alt="Cosmino News Logo"
            className="h-12 sm:h-16 md:h-20 w-auto object-contain"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center">
          Sign in to Cosmino News
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border border-gray-700 rounded p-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select your user</option>
            {users.map((user) => (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={!selectedUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition disabled:opacity-50"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <span className="text-blue-400 underline">Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
