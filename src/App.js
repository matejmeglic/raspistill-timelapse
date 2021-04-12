import React, { Component } from "react";
import "./App.css";

// S3 bucket policy and CORS need to be set
// folders that are created on the S3 have to be Made public
// files that are uploaded have to be uploaded with a setting --acl public-read
// the latest files are shown (based on file name, not an actual lastModified date)
// use Moesif CORS Chrome plugin for localhost testing

class App extends Component {
  state = {
    last_modified: "",
  };

  // bucketPath:
  //   "https://camera1.s3.eu-central-1.amazonaws.com/camera_west/latest/", // set S3 bucket
  // folder: ["current", "newFolder"], // set S3 folders for different cameras you would like to show
  // currentImages: [],

  componentDidMount() {
    // this.loadXML();
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
      last_modified: this.fetchHeader(
        "https://camera1.s3.eu-central-1.amazonaws.com/camera_west/latest/camera_west_latest.jpg",
        "Last-Modified"
      ),
    });
  };

  // loadXML = () => {
  //   var XMLParser = require("react-xml-parser");

  //   fetch(this.state.bucketPath)
  //     .then((response) => response.text())
  //     .then((response) => {
  //       let xml = new XMLParser().parseFromString(response); // convert XML to JSON
  //       console.log(xml);
  //       let imageFolders = [];
  //       let isLastFolderPushed = true;
  //       let itemsInFolder = [];
  //       for (let i = 0; i < xml.children.length; i++) {
  //         if (xml.children[i].name === "Contents") {
  //           // check only files and folders
  //           let contentsObject = {
  //             folder: "",
  //             key: "",
  //             lastModified: "", // not sure if we need lastModified, currently not used as this is time of upload, not of capture
  //           };

  //           for (let j = 0; j < xml.children[i].children.length; j++) {
  //             // check for specific file parameters
  //             for (let k = 0; k < this.state.folder.length; k++) {
  //               // differentiate different folders in the process
  //               if (
  //                 (xml.children[i].children[j].name === "Key" &&
  //                   xml.children[i].children[j].value.slice(
  //                     0,
  //                     this.state.folder[k].length
  //                   ) === this.state.folder[k]) ||
  //                 xml.children[i].children[j].name === "LastModified"
  //               ) {
  //                 if (xml.children[i].children[j].name === "Key") {
  //                   contentsObject.key = xml.children[i].children[j].value;
  //                   contentsObject.folder = xml.children[i].children[j].value // add folder to the object for datetimestamp extraction
  //                     .substring(0, this.state.folder[k].length);
  //                 } else if (
  //                   xml.children[i].children[j].name === "LastModified"
  //                 ) {
  //                   contentsObject.lastModified =
  //                     xml.children[i].children[j].value;
  //                 }
  //               }
  //             }
  //           }
  //           if (
  //             // business logic to group images on the bucket per folder
  //             itemsInFolder.length === 0 ||
  //             itemsInFolder[itemsInFolder.length - 1].folder ===
  //               contentsObject.folder
  //           ) {
  //             itemsInFolder.push(contentsObject);
  //             isLastFolderPushed = false;
  //           } else {
  //             imageFolders.push(itemsInFolder);
  //             itemsInFolder = [];
  //             itemsInFolder.push(contentsObject);
  //             isLastFolderPushed = true;
  //           }
  //         }
  //       }
  //       if (isLastFolderPushed === false) {
  //         // safeguard that the last folder is also pushed
  //         imageFolders.push(itemsInFolder);
  //       }

  //       console.log(imageFolders);

  //       let currentImages = []; // extract latest images for each folder-camera, render HTML
  //       for (let l = 0; l < imageFolders.length; l++) {
  //         currentImages.push(
  // <div
  //   className="col-sm-10 col-md-6"
  //   key={imageFolders[l][imageFolders[l].length - 1].lastModified}
  // >
  //   <p>
  //     Trenutno stanje{" "}
  //     {imageFolders[l][imageFolders[l].length - 1].key.substring(
  //       imageFolders[l][imageFolders[l].length - 1].folder.length + 1,
  //       imageFolders[l][imageFolders[l].length - 1].key.length - 4
  //     )}
  //   </p>
  //   <img
  //     src={`${this.state.bucketPath}/${
  //       imageFolders[l][imageFolders[l].length - 1].key
  //     }`}
  //     alt={imageFolders[l][imageFolders[l].length - 1].lastModified}
  //   ></img>
  // </div>
  //         );
  //       }

  // this.setState({
  // set state
  // currentImages: currentImages,
  //   last_modified: this.fetchHeader(
  //     "https://camera1.s3.eu-central-1.amazonaws.com/camera_west/latest/camera_west_latest.jpg",
  //     "Last-Modified"
  //   ),
  // });
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
  // };

  render() {
    // const { currentImages } = this.state;
    const { last_modified } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h2>Najlepše je doma</h2>
        </header>
        <div className="container">
          <br />
          <div className="row">
            <div
              className="col-sm-10 col-md-6"
              // key={imageFolders[l][imageFolders[l].length - 1].lastModified}
            >
              <p>Trenutno stanje {last_modified}</p>
              <img
                src="https://camera1.s3.eu-central-1.amazonaws.com/camera_west/latest/camera_west_latest.jpg"
                alt="camera_west"
              ></img>
            </div>

            {/* {currentImages} */}
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
