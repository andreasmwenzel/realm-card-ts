import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import validator from "validator";
import Navbar from "./Navbar";
import { useUserContext } from "../realm/UserContext";
import { Credentials } from "realm-web";

import { app } from "../realm/RealmApp";

type LoginProps = {
  initialMode: string;
};

const LoginPage = ({ initialMode }: LoginProps) => {
  return (
    <Segment>
      <Navbar loginButtons={false} />
      <LoginBody initialMode={initialMode} />
    </Segment>
  );
};

type ValidationError = {
  email?: string;
  password?: string;
};

const LoginBody = ({ initialMode }: LoginProps) => {
  const { user, setUser } = useUserContext()!;
  let history = useHistory();

  if (user) {
    history.push("/");
  }

  const [mode, setMode] = React.useState(initialMode); //states "login" or "register"
  console.log(`Mode: ${mode}`);
  const toggleMode = () => {
    setMode((oldMode) => (oldMode === "login" ? "register" : "login"));
  };

  // Keep track of form input state
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  // Keep track of input validation/errors
  const [error, setError] = React.useState<ValidationError>({});

  // Whenever the mode changes, clear the form inputs
  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setError({});
  }, [mode]);

  function handleAuthenticationError(err: Error) {
    console.error(err);
    const { status, message } = parseAuthenticationError(err);
    const errorType = message || status;
    switch (errorType) {
      case "invalid username":
        setError((prevErr) => ({
          ...prevErr,
          email: "Invalid email address.",
        }));
        break;
      case "invalid username/password":
      case "invalid password":
      case "401":
        setError((err) => ({ ...err, password: "Incorrect password." }));
        break;
      case "name already in use":
      case "409":
        setError((err) => ({ ...err, email: "Email is already registered." }));
        break;
      case "password must be between 6 and 128 characters":
      case "400":
        setError((err) => ({
          ...err,
          password: "Password must be between 6 and 128 characters.",
        }));
        break;
      default:
        break;
    }
    setSubmitting(false);
  }

  const handleLogin = async () => {
    setSubmitting(true);
    setError((e) => ({ ...e, password: undefined }));
    try {
      const creds = Credentials.emailPassword(email, password);
      const user = await app.logIn(creds);
      setUser(user);
      history.push("/games/");
    } catch (err) {
      return handleAuthenticationError(err);
    }
  };

  const handleRegistration = async () => {
    const isValidEmailAddress = validator.isEmail(email);
    setError((e) => ({ ...e, password: undefined }));
    if (isValidEmailAddress) {
      try {
        setSubmitting(true);
        // Register the user and, if successful, log them in
        await app.emailPasswordAuth.registerUser(email, password);
        //TODO: Show a need confirmation message
        history.push("/user/confirm");
      } catch (err) {
        handleAuthenticationError(err);
      }
    } else {
      setError((err) => ({ ...err, email: "Email is invalid." }));
    }
  };

  const parseAuthenticationError = (err: Error) => {
    const parts = err.message.split(":");
    const reason = parts[parts.length - 1].trimStart();
    if (!reason) return { status: "", message: "" };
    const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
    const match = reason.match(reasonRegex);
    const { status, message } = match?.groups ?? {};
    return { status, message };
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="grey" textAlign="center">
          {mode === "login" ? "Log In" : "Register an Account"}
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={(e) => {
                setError((e) => ({ ...e, email: undefined }));
                setEmail(e.target.value);
              }}
              value={email}
              error={error.email}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              error={error.password}
            />
            {mode === "login" ? (
              <Button
                color="grey"
                fluid
                size="large"
                disabled={submitting}
                loading={submitting}
                onClick={() => handleLogin()}
              >
                Login
              </Button>
            ) : (
              <Button
                color="grey"
                fluid
                size="large"
                disabled={submitting}
                loading={submitting}
                onClick={() => handleRegistration()}
              >
                Sign Up
              </Button>
            )}
          </Segment>
        </Form>
        <Message style={{ cursor: "pointer" }}>
          <a
            href="login mode"
            onClick={(e) => {
              e.preventDefault();
              toggleMode();
            }}
          >
            {mode === "login" ? "I don't have an account" : "Log in instead."}
          </a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
