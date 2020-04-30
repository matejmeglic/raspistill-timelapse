import React, { Component } from "react";
import "./App.css";
class App extends Component {
  state = {
    imgSrc: null,
  };
  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 10000);
  }
  loadData = () => {
    fetch(
      "https://api.github.com/repos/matejmeglic/raspistill-timelapse/contents/public/img/"
    )
      .then((res) => res.json())
      .then((res) => {
        const [firstImg] = res;
        const { html_url } = firstImg;
        if (html_url) {
          this.setState({
            imgSrc: `${html_url}?raw=true`,
          });
        }
      });
  }
  render() {
    const { imgSrc } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {imgSrc ? (
            <img src={imgSrc} className="timelapse" alt="timelapse" />
          ) : (
            "loading"
          )}
        </header>
      </div>
    );
  }
}
export default App;