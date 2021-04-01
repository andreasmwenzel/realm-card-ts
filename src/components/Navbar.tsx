import React, { useContext } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import * as Realm from "realm-web";
import {RealmUserContext, UserContextType} from "../realm/UserContext";


const Navbar:React.FC = ()=>{
  const userContext:UserContextType|null = useContext(RealmUserContext)
  const user = userContext?.user;
  console.log(userContext?.user?.profile.name);
  let history = useHistory();

  return (
    <Menu
      fixed="top"
      size="large"
      id="Navbar"
    >
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
                    {user?.profile.name}
                </Button>
            </Menu.Item>
        ):(
            <Menu.Item position="right">
                <Button as="a" onClick={() => history.push("/login")}>
                    Log in
                </Button>
            </Menu.Item>
        )}
      </Container>
    </Menu>
  );
}

export default Navbar