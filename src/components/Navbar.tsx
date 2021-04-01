import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../realm/UserContext";
import { app } from "../realm/RealmApp";

const Navbar: React.FC = () => {
  const { user, setUser } = useUserContext()!;
  let history = useHistory();
  async function handleLogOut() {
    await app.currentUser?.logOut();
    setUser(null);
  }
  return (
    <Menu fixed="top" size="large" id="Navbar">
      <Container>
        <Menu.Item as="a" onClick={() => history.push("/")}>
          Home
        </Menu.Item>
        <Menu.Item as="a" onClick={() => history.push("/about")}>
          About
        </Menu.Item>
        {user ? (
          <Menu.Item poition="right">
            <Button
              as="a"
              style={{ marginLeft: "0.5em" }}
              onClick={() => history.push("/user")}
            >
              {user?.profile.email}
            </Button>
            <Button
              as="a"
              style={{ marginLeft: "0.5em" }}
              onClick={() => {
                handleLogOut();
              }}
            >
              Log Out
            </Button>
          </Menu.Item>
        ) : (
          <Menu.Item position="right">
            <Button as="a" onClick={() => history.push("/login")}>
              Log in
            </Button>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default Navbar;
