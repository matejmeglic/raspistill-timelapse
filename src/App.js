import React, { Component } from 'react';
import './App.css';

var image_link = ""

class App extends Component {


  componentDidMount() {
    this.loadData()
    setInterval(this.loadData, 30000);
  }

  loadData() {
     try {
      var request = new XMLHttpRequest();

      request.open('GET', 'https://api.github.com/repos/matejmeglic/raspistill-timelapse/contents/public/img/', true);
      
      request.onload = function() {
        var data = JSON.parse(this.response);
        // console.log(data);
        // console.log(data[0]);
        // console.log(data[0].download_url); 
        image_link = String(data[0].download_url)
      }
      
      

      request.send()
    

        this.setState({
          image_link: image_link,
           
        })
        
    } catch (e) {
        console.log(e);
    }
  }
  

  
render () {
 console.log(this.state)
  return (

    <div className="App">
      <header className="App-header">
        <img src={image_link} className="timelapse" alt="timelapse" />
      </header>
    </div>
  );
}
}


export default App;


