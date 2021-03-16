import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    imgSrc:
      "https://camera1.s3.eu-central-1.amazonaws.com/current/2021-03-14_210555.jpg",
    imgName: "",
  };

  componentDidMount() {
    this.setState({
      imgName: this.fetchHeader(this.state.imgSrc, "Last-Modified"),
    });
    setInterval(this.updatePicture, 60000);
  }

  fetchHeader = (url, wch) => {
    try {
      var req = new XMLHttpRequest();
      req.open("HEAD", url, false);
      req.send(null);
      if (req.status === 200) {
        return req.getResponseHeader(wch).substring(5);
      } else return false;
    } catch (er) {
      return er.message;
    }
  };

  updatePicture = () => {
    var myImageElement = document.getElementById("currentImage");
    myImageElement.src = this.state.imgSrc;
  };

  render() {
    const { imgSrc } = this.state;
    const { imgName } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Najlepše je doma</h1>
        </header>

        <div className="row">
          <div className="column">
            <p>Trenutno stanje {imgName}</p>
            <img src={imgSrc} alt="currentImage" id="currentImage"></img>
          </div>
          <div className="column">
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
    );
  }
}
export default App;
