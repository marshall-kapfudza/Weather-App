import React, { Component } from 'react';

import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }
  

  componentDidMount() {
    const appid = 'appid=4e6b68b8b4f82a75382e36b46b8df10d';
    const data = `https://api.openweathermap.org/data/2.5/weather?zip=11217,us&${appid}`;
    fetch(data)
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json,
      })
    })
    .catch(error => console.log(error));
  }

  render() {
    var { isLoaded, items } = this.state;


    if(!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      var mapIcon = `http://openweathermap.org/img/w/${items.weather[0].icon}.png`;
      
      // This function return the tempetature in Fahrenheit format
      function tempConvertor(num) {
        return `${((num - 273.15) * 9/5 + 32).toFixed()}°F`;
      }
      
      // This code snippet will allow you to capitalize the first letter of a string using JavaScript.
      function toUcfirst(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }
      
      return (
        <div className="App">
          {console.log(items)}
          <h1 className="txt-center">{items.name}</h1>
          <div className="local__temp">
            <div className="col-6 txt-center">
              <h4 className="local__temp--title"><img src={mapIcon} alt="icon" /> {tempConvertor(items.main.temp)}</h4>
            </div>
            <div className="col-6">
              <p>
                Today: {toUcfirst(items.weather[0].description)}.&nbsp;
                The high Temperature will be {tempConvertor(items.main.temp_max)}. {toUcfirst(items.weather[0].main)} tonight with a low Temperature of {tempConvertor(items.main.temp_min)}
              </p>
              <h4><small>Wind speed:</small> {(items.wind.speed *  2.237).toFixed()} mph</h4> 
              <h4>Humidity: <small>{items.main.humidity}%</small></h4>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
