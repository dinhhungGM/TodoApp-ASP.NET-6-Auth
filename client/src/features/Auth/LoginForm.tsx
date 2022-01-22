import "./AuthForm.scss";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../utils/axiosClient";
import Toast from "../../utils/Toast";
const LoginForm = () => {
  const [formAuth, setFormAuth] = useState({
    username: "",
    password: "",

  });
  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormAuth({
      ...formAuth,
      [name]: value,
    });
  };

  const handleSubmitForm = async (event: any) => {
    event.preventDefault();
    try {
      const response: string = await axiosClient.post("/auth/login", formAuth);
      
      localStorage.setItem("token", response);
    } catch (error: any) {
      console.log(error.response);
      Toast.fire({
        icon: "error",
        title: error.response.data || "Login failed"
      });
    }
    setFormAuth({
      username: "",
      password: "",
    });
  };
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>LOGIN</h1>
        <h3>Please enter your login and password!</h3>
        <Form onSubmit={handleSubmitForm} className="auth-form__content">
          <Form.Group className="mb-3 form-group" >
            <Form.Control
              type="username"
              placeholder="Enter email"
              className="rounded-pill input-form"
              name="username"
              onChange={handleFormChange}
              value={formAuth.username}
            />
          </Form.Group>

          <Form.Group className="mb-3 form-group" >
            <Form.Control
              type="password"
              placeholder="Password"
              className="rounded-pill input-form"
              name="password"
              onChange={handleFormChange}
              value={formAuth.password}
            />
          </Form.Group>

          <Link to="/register">
              I don't have an account yet - register here!
          </Link>
          <Button variant="primary" type="submit" className="rounded-pill auth-form-btn">
            Login
          </Button>

        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
