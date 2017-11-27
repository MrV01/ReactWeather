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
      <div>
        <h1 className="text-center page-title">About React Weather App</h1>
        <p>Demo React application for learning React by follow along. Software used in the project.</p>
        {/* Challenge "About": Take a second look to Examples Links to React , Foundation, Github repsitory, Copyright  Author. Couple of foundations features.  */}
        <div className="expanded button-group">
            <a className="hollow button" href= "https://reactjs.org">React JS framework</a>
            <a className="hollow button" href= "https://foundation.zurb.com/sites">Foundation Sites</a>
            <a className="hollow button" href= "https://github.com/">GitHub repository</a>
        </div>
        <div className="clearfix">
           <p>Copyright material</p>
        </div>

      </div>
    )
  };

module.exports = About;
