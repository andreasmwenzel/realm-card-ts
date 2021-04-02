import React from "react";
import { Container, Segment } from "semantic-ui-react";
import Navbar from "./Navbar";

export default function AboutPage() {
  return (
    <Segment>
      <Navbar />
      <Container>
        <div>About Page</div>
      </Container>
    </Segment>
  );
}
