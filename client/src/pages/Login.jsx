// import '../assets/auth.css';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../services/authService';

// function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login({ email, password });
//       localStorage.setItem('token', res.token);
//       localStorage.setItem('user', JSON.stringify(res.user));
//       console.log('Token stored:', localStorage.getItem('token'));
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="center-wrapper">
//         <div className="container" id="container">
//           <div className="form-container sign-in-container">
//             <form onSubmit={handleLogin}>
//               <h1>Sign in</h1>
//               <span>or use your account</span>
//               {error && <p className="error">{error}</p>}
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <a href="#">Forgot your password?</a>
//               <button type="submit">Sign In</button>
//             </form>
//           </div>

//           <div className="overlay-container">
//             <div className="overlay">
//               <div className="overlay-panel overlay-right">
//                 <h1>Welcome!</h1>
//                 <p>Enter your personal details and start your experience</p>
//                 <button
//                   type="button"
//                   className="ghost"
//                   onClick={() => navigate('/signup')}
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import "../assets/style.css";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      console.log("Token stored:", localStorage.getItem("token"));
      navigate("/dashboard");
    } catch (err) {
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
