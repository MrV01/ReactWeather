var React = require('react');

// var About = React.createClass({
//   render: function () {
//     return (
//       <h3>About Component</h3>
//     )
//   }
// });

///
///  Refactor can be done When:
///  Stateless functional component.
/// It  Only define method "render" AND does not keep "state"
///
var About = (props) => {
    return (
      <h3>About Component</h3>
    )
  };

module.exports = About;
