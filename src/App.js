import React from 'react';
import logo from './logo.svg';
import './App.css';



function App() {

  function getImage() {

  var request = new XMLHttpRequest();

  request.open('GET', 'https://api.github.com/repos/matejmeglic/raspistill-timelapse/contents/public/img/', true);
  
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(data);
    console.log(data[0]);
    console.log(data[0].download_url);
    var image_link = String(data[0].download_url)
  }
  

  request.send()
}
  
 
  return (

    <div className="App">
      <header className="App-header">
        <img src={image_link} className="Image" alt="Image" />
      </header>
    </div>
  );
}

export default App;
