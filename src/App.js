import React from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  // Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://api.github.com/repos/matejmeglic/raspistill-timelapse/contents/public/img/', true);

request.onload = function() {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  console.log(data);

}

// Send request
request.send()



  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
