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
      },
      windSpeed: function(speed) {
        return `${(speed  *  2.237).toFixed()} mph`;
      }
    };
  }
  
  componentDidMount() {
    const yourAppId = 'OPEN_WEATHER_APP_ID';
    const data = `https://api.openweathermap.org/data/2.5/weather?zip=98115,us&appid=${yourAppId}`;
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
      return (
        <div className="App">
          <h1 className="txt-center">{items.name}</h1>
          <div className="local__temp">
            <div className="col-6 txt-center">
              <h4 className="local__temp--title"><img src={mapIcon} alt="icon" /> {this.state.tempConvertor(items.main.temp)}</h4>
            </div>
            <div className="col-6">
              <h3>
                Today: {this.state.toUcfirst(items.weather[0].description)}.&nbsp;
                The high temperature will be {this.state.tempConvertor(items.main.temp_max)}. {this.state.toUcfirst(items.weather[0].main)} tonight with a low temperature of {this.state.tempConvertor(items.main.temp_min)}.
              </h3>
              <h4>Wind speed: {this.state.windSpeed(items.wind.speed)}.</h4> 
              <h4>Humidity: {items.main.humidity}%.</h4>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
