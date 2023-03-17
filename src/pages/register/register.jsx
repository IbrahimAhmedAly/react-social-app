import { useState } from "react";
import "./register.scss";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/BASE_URL";

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setUserInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/auth/register`, userInputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);

      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>IB Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <Link to="/login" style={{ color: "white" }}>
            <span>Do you have an account?</span>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {error && <p style={{ color: "red", fontSize: "18px" }}>{error}</p>}
            <button onClick={handleRegister}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
