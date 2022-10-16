import React from "react";
import "./App.css";
import Photo from "./components/Photo";
import { Col, Container, Row } from "react-bootstrap";
import { createClient } from "pexels";

const client = createClient(
  //hide api key
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Nature",
      photos: [],
      isLoaded: false,
      error: null,
      currentPage: 1,
      picsPerPage: 10,
    };
  }

  componentDidMount() {
    this.fetchPhotos();
  }
  fetchPhotos = () => {
    
    client.photos.curated({ per_page: 80 }).then(
      (photo) => {
        this.setState({
          photos: photo.photos.filter(pic => (!!pic.alt)),
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
    return (
      <Col key={index}>
        <Photo details={photo}></Photo>
      </Col>
    );
  };

  render() {
    const { error, isLoaded, photos } = this.state;
    const indexOfLastPic = this.state.currentPage * this.state.picsPerPage;
    const indexOfFirstPic = indexOfLastPic - this.state.picsPerPage;
    const currentPics = this.state.photos.slice(indexOfFirstPic, indexOfLastPic);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(this.state.photos.length / this.state.picsPerPage); i++) {
      pageNumbers.push(i);
    }

    const setPage = (pageNum) => {
      this.setState({ currentPage: pageNum })
    }


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
        <><div className="App">
          <header className="App-header">
            <Container className="mt-3">
              <Row>{currentPics.map(this.getPhoto)}</Row>
            </Container>
          </header>
        </div><div className="w-full flex justify-around">
            {
              pageNumbers.map((pageNum, index) => (
                <span key={index} className={pageNum === this.state.currentPage ? "cursor-pointer flex items-center justify-center w-12 h-12 border-2 rounded-full bg-blue-500 text-white" : "cursor-pointer flex items-center justify-center w-12 h-12 border-2 rounded-full"} onClick={() => { setPage(pageNum) }}>
                  {pageNum}
                </span>
              ))
            }
          </div></>
      );
    }


  }
}

export default App;
