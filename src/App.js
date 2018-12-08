import React, { Component } from 'react';

import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      tempConvertor: function(num) {
        return `${((num - 273.15) * 9/5 + 32).toFixed()}°F`;
      },
      toUcfirst: function(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    };
  }
  

  componentDidMount() {
    const yourAppId = '4e6b68b8b4f82a75382e36b46b8df10d'; // Replace _xxxxx_ with your your appid. This is a required field
    const data = `https://api.openweathermap.org/data/2.5/weather?zip=90210,us&appid=${yourAppId}`;
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

      console.log(this.state.toUcfirst(items.weather[0].description));
      
      return (
        <div className="App">
          <h1 className="txt-center">{items.name}</h1>
          <div className="local__temp">
            <div className="col-6 txt-center">
              <h4 className="local__temp--title"><img src={mapIcon} alt="icon" /> {this.state.tempConvertor(items.main.temp)}</h4>
            </div>
            <div className="col-6">
              <p>
                Today: {this.state.toUcfirst(items.weather[0].description)}.&nbsp;
                The high temperature will be {this.state.tempConvertor(items.main.temp_max)}. {this.state.toUcfirst(items.weather[0].main)} tonight with a low temperature of {this.state.tempConvertor(items.main.temp_min)}
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
