var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal'); // for ErrorModal we need to keep state here.

var Weather = React.createClass({
  // React internal function
  getInitialState: function () {
  // return initial state object (this.state... )
    return {
      // set value of  this.state.isLoading  to identify status of AJAX data fetching.
        isLoading: false
    };
  } ,

//  Custom callback function to communicate with Form presentaional component
  handleSearch: function (update) {
    // The callback function is going to get data ( temp) from a remote API, ( AJAX  or something)
    var location = update.location;
    var that = this; // Save "this" variable to modify state of  this container component.
    // debugger;
    // Set state of AJAX data fetching.
    this.setState({
      isLoading: true,
      errorMessage: undefined
    });
    // Run API function to fetch AJAX data.
    openWeatherMap.getTemp(location)
      .then( function (temperature) {
          // Store new ref(s) states into  container component (this.state.)
          // by calling internal React setState() method
          that.setState( {...update,
            location: location,
            temp: temperature,
            isLoading: false
          });
      }, function (e) {
          that.setState( {
            isLoading: false,
            errorMessage: e.message  //  update error's state
           } );    // updates only fetching status, previos search is
          // console.log("Error Message", e);

     });
  },

  render: function () {
    // Get properties value from the internal state Object-attribute of the component.
    var {isLoading, location, temp, errorMessage } = this.state;
    // Conditional rendering depends on: Loading / Loaded
    function renderMessage () {
      // debugger;
      if(isLoading) {
          return <h3 className="text-center">Fetching weather......</h3>
      } else if ( temp && location) {
          return <WeatherMessage location={location} temp={temp}/>
      }
    };
    //  Render Error message.
    function renderError() {
        if (typeof errorMessage === 'string') {
          return (
            <ErrorModal message={errorMessage}/>
          )
        }
    };
    // React Render
    return (
      <div>
      <h1 className="text-center page-title">Get Weather</h1>
      {/* Callback function this.handleSearch  handles  new search requests, and set state of Weather component */}
      <WeatherForm onRefUpdate={this.handleSearch}/>
      {/* Conditional rendering function returns appropriate component (Fetching... or WeatherMessage) */}
      {renderMessage()}
      {renderError()}
      </div>
    );
  }
});

module.exports = Weather;
