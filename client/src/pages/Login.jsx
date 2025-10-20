import React, { useState } from "react";
import "../assets/style.css";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

// 🧠 Helper to decode JWT safely
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log("Login response:", res);

      const token = res?.token;
      if (!token) throw new Error("No token received from server.");

      // ✅ Decode JWT (for id/role/name)
      const decoded = parseJwt(token);
      console.log("Decoded token payload:", decoded);

      // ✅ Build user object consistently
      const user = {
        id: decoded?.id || res.user?._id,
        name:
          decoded?.name ||
          res.user?.name ||
          res.user?.username ||
          res.user?.email?.split("@")[0] || // fallback to email prefix
          "User",
        email: res.user?.email,
        role: (decoded?.role || res.user?.role || "user").toLowerCase(),
      };

      // ✅ Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Stored user in localStorage:", user);

      // ✅ Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="center-wrapper login-page">
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <span>or use your account</span>
            {error && <p className="error">{error}</p>}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#">Forgot your password?</a>
            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>Welcome!</h1>
              <p>Enter your personal details and start your experience</p>
              <button
                className="login-btn ghost"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
