import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateToken, updateUser } = useAuth(); // Using Auth context
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.token) {
          console.log("token", data.token, "user", data.user);
          updateUser(data.user);
          updateToken(data.token); // Save the token using context
          navigate("/dashboard"); // Navigate to the dashboard
        } else {
          alert(data.error); // Show error message
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <h1 className="text-4xl font-bold text-blue-500 mb-6">Login</h1>
      <form
        className="bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={handleLogin}
      >
        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 text-gray-300 bg-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
