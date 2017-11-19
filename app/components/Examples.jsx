var React = require('react');
var {Link} = require('react-router');

// var Examples = React.createClass({
//   render: function () {
//     return (
//       <h3>Examples Component</h3>
//     )
//   }
// });

var Examples = (props) => {
  return (
    <div>
    <h1 className="text-center">Examples Component</h1>
    <p>Here are a few example locations to try out: </p>
    <ol>
      <li>
          <Link to='/?location=Atlanta'>Atlanta, GA</Link>
      </li>
      <li>
        <Link to='/?location=Rio'>Rio, Brasil</Link>
      </li>
    </ol>
    </div>
  )
};


module.exports = Examples;
