import React, { useState } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { DASHBOARD } from "../../Routes";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API}/${data.accountType}/login`,
        data,
      });
      if (res) {
        console.log(res);
        // toast.success(res.data.message);
        toast(res.data.message, {
          type: res.data.status,
        });

        if (res.data.status === "success") {
          // redirect to dashboard
          history.push(DASHBOARD);
        }
        setLoading(false);
      } else {
        toast.error("An unknown error occurred, please try again");
        setLoading(false);
      }
    } catch (err) {
      toast.error(err);
      setLoading(false);
    }
  };

  return (
    <Card style={{ padding: "20px", marginTop: "5em" }}>
      <h2>Log In</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            placeholder="email@email.com"
            ref={register({
              required: true,
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="customError">Email is required</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="customError">Email is invalid</p>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="******"
            ref={register({
              required: true,
              minLength: 6,
              maxLength: 15,
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="customError">Password is required</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="customError">
              Password should be at least 6 characters
            </p>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <p className="customError">
              Password should be at most 15 characters
            </p>
          )}
        </Form.Group>

        <Form.Group controlId="accountType">
          <Form.Label>Account Type</Form.Label>
          <Form.Control
            as="select"
            name="accountType"
            defaultValue="Choose..."
            ref={register({
              required: true,
            })}
          >
            <option value="">Choose...</option>
            <option value="admin">Admin</option>
            <option value="lecturer">Lecturer</option>
            <option value="student">Student</option>
          </Form.Control>
          {errors.accountType && errors.accountType.type === "required" && (
            <p className="customError">Please choose an account type</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          {loading && (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default LoginForm;
