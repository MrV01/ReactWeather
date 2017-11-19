var React = require('react');

var WeatherForm = React.createClass({

  onFormSubmit: function (e) { // e - JS event object
    e.preventDefault();  // Prevent browser from refreshing

    var refInput = {};
    for ( var key in this.refs ) {
       var val =this.refs[key].value; // get value of  Form input field (ref="")
       if( val.length > 0 ) { // Valid input received
          this.refs[key].value = ''; // erase string from the input element
          refInput[key] = val;
       }
    }
    // console.log(refInput);
    if(Object.keys(refInput).length > 0) {
      this.props.onRefUpdate(refInput);   // call parent's  method with new value of  location
      // by using  callback function , which was assigned to  property onRefUpdate
    }
  },
  render: function () {
    return (
      <form onSubmit={this.onFormSubmit}>
        <ul className="menu">
          <li>
            <input type="text" ref="location"  placeholder="Enter location"/>
          </li>
          <li>
            <button type="submit" className="button" value="submit">Get Weather</button>
          </li>
          </ul>
      </form>
    );
  }
});

module.exports = WeatherForm;
