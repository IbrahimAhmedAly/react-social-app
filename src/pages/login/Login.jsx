import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

import "./login.scss";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [userInputs, setUserInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(userInputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);

      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            expedita aliquam rerum voluptatibus necessitatibus.
          </p>
          <Link to="/register" style={{ color: "white" }}>
            <span>Don't have an account?</span>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {error && <p style={{ color: "red", fontSize: "18px" }}>{error}</p>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
