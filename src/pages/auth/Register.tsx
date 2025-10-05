import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    navigate("/home");
  };
  return (
    <div className="min-h-screen bg-gradient-to-r flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Create an Account
          </h2>
          <p className="text-gray-600">
            Welcome! Please fill in the details to register.
          </p>
        </div>

        <form className="space-y-4" autoComplete="off" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:stroke-neutral-600"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:stroke-neutral-600"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:stroke-neutral-600"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:stroke-neutral-600"
              autoComplete="new-password"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:stroke-neutral-600"
              autoComplete="new-password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:stroke-neutral-600"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already a user?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
