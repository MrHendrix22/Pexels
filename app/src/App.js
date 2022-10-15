import React from "react";
import "./App.css";
import Photo from "./components/Photo";
import { Col, Container, Row } from "react-bootstrap";
import { createClient } from "pexels";

const client = createClient(
  "563492ad6f91700001000001825382c3f9f54537b004bec5091b15b1"
);
const query = "Nature";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "Nature",
      photos: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    this.searchForPhoto();
  }

  searchForPhoto = () => {
    client.photos.search({ query, per_page: 1 }).then(
      (photo) => {
        console.log(photo);
        this.setState({
          photos: photo.photos,
          isLoaded: true,
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error: error,
        });
      }
    );
  };

  getPhoto = (photo, index) => {

    return(
      <Col key={index}>
      <Photo details={photo}></Photo>
      </Col>
    );
  }

  render() {
    const { error, isLoaded, photos } = this.state;

    if (error) {
      return (
        <Container>
          <div>Error: {error.message} </div>
        </Container>
      );
    } else if (!isLoaded) {
      return (
        <Container>
          <div>loading...</div>
        </Container>
      );
    } else {
      return (
        <Container>
             <Row>
              {this.state.photos.map(this.getPhoto)}
             </Row>
        </Container>
      );
    }
  }
}

export default App;
