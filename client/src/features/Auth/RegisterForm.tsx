import "./AuthForm.scss";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import React from "react";
import { registerAsync, selectAuthenticated } from "./AuthSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const LoginForm = () => {
  const authenticated = useAppSelector(selectAuthenticated);
  const dispatch = useAppDispatch();
  const [formAuth, setFormAuth] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });
  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormAuth({
      ...formAuth,
      [name]: value,
    });
  };

  const handleSubmitForm = (event: any) => {
    event.preventDefault();
    console.log(formAuth);
    dispatch(registerAsync(formAuth));
    setFormAuth({
      username: "",
      password: "",
      repeatPassword: ""
    });
  };
  return authenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="auth-container">
      <div className="auth-form">
        <h1>REGISTER</h1>
        <Form onSubmit={handleSubmitForm} className="auth-form__content">
          <Form.Group className="mb-3 form-group">
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

          <Form.Group className="mb-3 form-group" >
              <Form.Control
                type="password"
                placeholder="Password"
                className="rounded-pill input-form"
                name="repeatPassword"
                onChange={handleFormChange}
                value={formAuth.repeatPassword}
              />
            </Form.Group>

          <Button variant="primary" type="submit" className="rounded-pill auth-form-btn">
            Register
          </Button>

          <Link to="/login">Already have an account?</Link>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
