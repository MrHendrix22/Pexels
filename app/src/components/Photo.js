import React from "react";
import { Button, Card } from "react-bootstrap";

const pexelsSite = "https://www.pexels.com";

class Photo extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.details.src.original} />
        <Card.Body>
          <Card.Title>{this.props.details.alt}</Card.Title>
          <Card.Text></Card.Text>
          <Button variant="primary">Check out</Button>
        </Card.Body>
        <a href={pexelsSite}> Photos provided by Pexels </a>
      </Card>
    );
  }
}

export default Photo;
