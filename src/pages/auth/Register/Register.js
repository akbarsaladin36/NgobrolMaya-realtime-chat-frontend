import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";

function Register(props) {
  const [username, setUsername] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = (event) => {
    event.preventDefault();
    localStorage.setItem("token", username);
    props.history.push("/register");
  };

  const changeText = (event) => {
    const { name } = event.target;
    setUsername(event.target.value);
    setForm({ ...form, [name]: event.target.value });
  };

  return (
    <div>
      <Container>
        <Card className={`${styles.card_size} mt-5 mx-auto`}>
          <Card.Body>
            <Link to="/login" className={styles.back_button}>
              <h5>{"<"}</h5>
            </Link>
            <h3 className={`${styles.login_text} text-center mt-4`}>
              Register
            </h3>
            <p className="mt-3">Let's create your account!</p>
            <Form onSubmit={handleRegister} className="mt-4">
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(event) => changeText(event)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(event) => changeText(event)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button
                variant="primary"
                className={`${styles.login_button} mt-4`}
                type="submit"
              >
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Register;
