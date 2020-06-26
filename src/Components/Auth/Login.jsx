import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Container>
      <Row
        style={{
          width: "50%",
          margin: "auto",
        }}
      >
        <Col style={{ marginTop: "5em" }}>
          <h1 style={{ textAlign: "center" }}>Portal</h1>
        </Col>
        <Col sm={12}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
