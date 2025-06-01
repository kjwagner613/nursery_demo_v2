import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const API_URL = import.meta.env.VITE_API_URL; // ✅ Gets backend URL from .env

const RegisterPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        body: JSON.stringify({ firstName: formData.firstName, lastName: formData.lastName, email: formData.email, password: formData.password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.token) {
        login(data.token); // Automatically log in on success
        localStorage.setItem("token", data.token);
        navigate("/pages/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Error registering");
    }
  };

  return (
    <div className="auth-container flex items-center mt-[15px] border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
<form className="formSubmit grid grid-cols-3 gap-2 items-center mt-[15px] border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4" onSubmit={handleSubmit}>
        <input className="inputFirstName border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4" type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input className="inputLastName border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4 ml-2" type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input className="inputEmail border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4 ml-2" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="inputPassword border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input className="inputConfirmPass border border-[color:var(--secondary-brown)] rounded-[var(--border-radius)] p-4 ml-2" type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>

      <p>Already have an account? <a href="/pages/loginpage">Login</a></p>
    </div>
  );
};

export default RegisterPage;