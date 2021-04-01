import React from "react";
import { useHistory } from "react-router-dom";
import { Segment, Container, Icon, Button, Header } from "semantic-ui-react";
import Navbar from "./Navbar";

export default function LandingPage() {
    return (
      <Segment
        inverted
        textAlign="center"
        style={{ minHeight: 700, padding: "1em 0em" }}
        vertical
      >
          <Navbar />
          <LandingPageContent />
      </Segment>
    );
}

function LandingPageContent() {
  let history = useHistory();
  const mobile = false;

  return (
    <Container text>
      <Header
        as="h1"
        content="Realm of Cards"
        inverted
        style={{
          fontSize: mobile ? "2em" : "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: mobile ? "1.5em" : "3em",
        }}
      />
      <Header
        as="h2"
        content="A Serverless Card Game App build on MongoDB Realms"
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "1.5em",
        }}
      />
      <Button
        primary
        size="huge"
        onClick={() => {
          history.push("/games");
        }}
      >
        {/* Browse Tables
        <Icon name="right arrow" /> */}
      </Button>
    </Container>
  );
}
