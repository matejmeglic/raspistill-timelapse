import React, { Component } from "react";
import "./App.css";

// S3 bucket policy and CORS need to be set
// folders that are created on the S3 have to be Made public
// files that are uploaded have to be uploaded with a setting --acl public-read
// the latest files are shown (based on file name, not an actual lastModified date)
// use Moesif CORS Chrome plugin for localhost testing

class App extends Component {
  state = {
    latest_west:
      "https://camera1.s3.eu-central-1.amazonaws.com/camera_west/latest/camera_west_latest.jpg",
    latest_east:
      "https://camera1.s3.eu-central-1.amazonaws.com/camera_east/latest/camera_east_latest.jpg",
    latest_south:
      "https://camera1.s3.eu-central-1.amazonaws.com/camera_south/latest/camera_south_latest.jpg",
    last_modified_west: "",
    last_modified_east: "",
    last_modified_south: "",
  };

  componentDidMount() {
    this.loadState();
    setInterval(this.loadXML, 60000); // define refresh rate
  }

  fetchHeader = (url, wch) => {
    try {
      var req = new XMLHttpRequest();
      req.open("HEAD", url, false);
      req.send(null);
      if (req.status === 200) {
        return req.getResponseHeader(wch);
      } else return false;
    } catch (er) {
      return er.message;
    }
  };

  loadState = () => {
    this.setState({
      last_modified_west: this.fetchHeader(
        "https://camera1.s3.eu-central-1.amazonaws.com/camera_west/latest/camera_west_latest.jpg",
        "Last-Modified"
      ),
    });
    this.setState({
      last_modified_east: this.fetchHeader(
        "https://camera1.s3.eu-central-1.amazonaws.com/camera_east/latest/camera_east_latest.jpg",
        "Last-Modified"
      ),
    });

    this.setState({
      last_modified_east: this.fetchHeader(
        "https://camera1.s3.eu-central-1.amazonaws.com/camera_south/latest/camera_south_latest.jpg",
        "Last-Modified"
      ),
    });
  };

  render() {
    const {
      latest_west,
      latest_east,
      latest_south,
      last_modified_west,
      last_modified_east,
      last_modifiet_south,
    } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h2>Najlepše je doma</h2>
        </header>
        <div className="container">
          <br />
          <div className="row">
            <div className="col-sm-12">
              <p>Trenutno stanje {last_modified_west}</p>
              <img src={latest_west} alt="camera_west"></img>
            </div>
            <div className="col-sm-12">
              <p>Trenutno stanje {last_modified_east}</p>
              <img src={latest_east} alt="camera_east"></img>
            </div>
            <div className="col-sm-12">
              <p>Trenutno stanje {last_modifiet_south}</p>
              <img src={latest_south} alt="camera_east"></img>
            </div>

            <div className="col-sm-10 col-md-12">
              <br />
              <p>Posnetki preteklih dni</p>
              <div className="iframe-container">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/videoseries?list=PLo2FhF1b8pqBma6paQWuzL6epRpj_THO6&autoplay=0&loop=1&rel=0&showinfo=0&color=white&iv_load_policy=3"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  title="ytlist"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
          <p className="footer">
            Fotografija v živo se osvežuje vsakih 5 minut med 04:00 in 22:00.
          </p>
        </div>
      </div>
    );
  }
}
export default App;
