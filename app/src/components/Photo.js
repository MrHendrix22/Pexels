import React from "react";
import { Button, Card } from "react-bootstrap";

function Photo() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src="https://pbs.twimg.com/profile_images/443395572783800322/nXTuit5o_400x400.jpeg"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          This is the storyline
        </Card.Text>
        <Button variant="primary">Check out</Button>
      </Card.Body>
    </Card>
  );
}

export default Photo;
