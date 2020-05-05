import React, { Component } from "react";
import "./App.css";
class App extends Component {
  state = {
    imgSrc: null,
    imgName: null,
    width: 0, 
    height: 0,
  };

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 60000);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
   }

  loadData = () => {
    fetch(
      "https://api.github.com/repos/matejmeglic/ku_tl_cam/contents/public/img/"
    )
      .then((res) => res.json())
      .then((res) => {
        const [firstImg] = res;
        const { html_url } = firstImg;
        const { name } = firstImg;
        const nameShort = name.slice(0, name.length-4);

        if (html_url) {
          if (this.state.imgSrc !== html_url) {             
            this.setState({
              imgSrc: `${html_url}?raw=true`,
              imgName: `Trenutno stanje ${nameShort}`,
            });
          }
        }
      });
  }
  render() {
    const { imgSrc } = this.state;
    const { imgName } = this.state;
    const { width } = this.state;
    return (
      <div className="App">
        <header className="App-header">
        <h1>Najlepše je doma</h1>
        </header>
        
        <div className="row">
          <div className="column">
          {imgName ? (
            <p>{imgName}</p>
          ) : ("Trenutno stanje ni na voljo.")}
          <p></p>
          {imgSrc ? (
            <img src={imgSrc} className="timelapse" alt="timelapse" />
          ) : ("")}
          </div>
          <div className="column">
          <p>Posnetki preteklih dni</p>
          <div className="iframe-container">
          {( {width} < 600) ? (
              <iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=PLo2FhF1b8pqBma6paQWuzL6epRpj_THO6&autoplay=0&loop=1&rel=0&showinfo=0&color=white&iv_load_policy=3" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="ytlist" allowFullScreen></iframe>
            ) : (
              <iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=PLo2FhF1b8pqBma6paQWuzL6epRpj_THO6&autoplay=1&loop=1&rel=0&showinfo=0&color=white&iv_load_policy=3" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="ytlist" allowFullScreen></iframe>
            )}
          </div>
          </div>
        </div>
        <p className="footer">Fotografija v živo se osvežuje vsakih 5 minut med 05:00 in 21:00.</p>
        
       </div>
    );
  }
}
export default App;