var React = require('react');

// var WeatherMessage = React.createClass({
//   render: function () {
//     var {temp, location} = this.props;
//     // console.log(this.props);
//     return (
//       <div>
//       <h3>Weather in {location}</h3>
//       <p> It's {temp} in {location}</p>
//       </div>
//     );
//   }
// });

var WeatherMessage = ({temp, location}) => {
    // debugger;
    return (
      <div>
        <h3 className="text-center">It's {temp} in {location}</h3>
      </div>
    );
  };

module.exports = WeatherMessage;
