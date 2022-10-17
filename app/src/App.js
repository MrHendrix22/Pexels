import React from "react";
import "./App.css";
import Photo from "./components/Photo";
import { Col, Container, Row } from "react-bootstrap";
import { createClient } from "pexels";
import Navigation from "./components/Navigation";
import Search from "./components/Search";

const client = createClient(
  //hide api key
  "563492ad6f91700001000001825382c3f9f54537b004bec5091b15b1"
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      photos: [],
      isLoaded: false,
      error: null,
      currentPage: 1,
      picsPerPage: 10,
      pageName: "",
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
        <Photo details={photo} changePage={this.changePage}></Photo>
      </Col>
    );
  };

  changePage = (pageName, title = "Nature") => {
    this.setState({
      pageName: pageName,
      title: title,
    })
  }

  render() {
    const { error, isLoaded, photos, currentPage, picsPerPage } = this.state;
    const indexOfLastPic = currentPage * picsPerPage;
    const indexOfFirstPic = indexOfLastPic - picsPerPage;
    const currentPics = photos.slice(indexOfFirstPic, indexOfLastPic);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(this.state.photos.length / this.state.picsPerPage); i++) {
      pageNumbers.push(i);
    }

    const setPage = (pageNum) => {
      this.setState({ currentPage: pageNum })
    }
    if (this.state.pageName === "search") {
      return (
        <Search changePage={this.changePage}></Search>
      )
    } else {
      if (error) {
        //Caught an Error with the API fetch
        return (
          <Container>
            <div>Error: {error.message} </div>
          </Container>
        );
      } else if (!isLoaded) {
        //Is Loading
        return (
          <Container>
            <div>loading...</div>
          </Container>
        );
      } else {
        //Loaded Photo Data and Pagination
        return (
          <>
            <Navigation changePage={this.changePage}></Navigation>
            <div className="App">
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
}

export default App;
