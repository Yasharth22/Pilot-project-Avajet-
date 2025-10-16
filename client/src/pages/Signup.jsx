// import React, { useState } from 'react';
// import '../assets/auth.css';
// import { signup } from '../services/authService';
// import { useNavigate } from 'react-router-dom';

// function Signup() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'Staff'
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signup(form);
//       navigate('/login');
//     } catch (err) {
//       setError(err.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="center-wrapper">
//         <div className="container" id="container">
//           <div className="form-container sign-in-container">
//             <form onSubmit={handleSubmit}>
//               <h1>Create Account</h1>
//               {error && <p className="error">{error}</p>}

//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//               />

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />

//               <select
//                 name="role"
//                 value={form.role}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="Staff">Staff</option>
//                 <option value="Admin">Admin</option>
//               </select>

//               <button type="submit">Sign Up</button>
//             </form>
//           </div>

//           <div className="overlay-container">
//             <div className="overlay">
//               <div className="overlay-panel overlay-right">
//                 <h1>Welcome Back!</h1>
//                 <p>Already have an account?</p>
//                 <button
//                   type="button"
//                   className="ghost"
//                   onClick={() => navigate('/login')}
//                 >
//                   Sign In
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;



import React, { useState } from 'react';
import '../assets/style.css'; // ✅ Make sure this path is correct
import { signup } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Staff'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem' }}>Signup</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        >
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;