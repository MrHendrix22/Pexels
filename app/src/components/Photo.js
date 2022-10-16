import React from "react";
import { Card } from "react-bootstrap";

class Photo extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() { }


  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.details.src.original} />

        <Card.Body>
          <Card.Title>{this.props.details.alt}</Card.Title>

          <Card.Text>Photographer:
            <a href={this.props.details.photographer_url} rel="noreferrer">
              {this.props.details.photographer}
            </a>
          </Card.Text>

        </Card.Body>
      </Card>
    );
  }
}

export default Photo;
