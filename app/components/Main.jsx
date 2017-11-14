// Rollback to React 14
// Webpack 3.
var React = require('react');
var Nav = require('Nav');

// Import sampleImage
import sampleImage from '../assets/images/sampleimage.jpg';

// var Main = React.createClass({
//   render: function () {
//     return (
//       <div>
//         <Nav/>
//         <h2>Main Component</h2>
//         {this.props.children}
//         <img src={ sampleImage } alt='SAAAAAAample Image' />
//         <p className="sample__paragraph">lorem ipsum Semple text</p>
//
//       </div>
//     );
//   }
// });

// Refactored version:
var Main = (props) => {
  return (
    <div>
      <Nav/>
      <h2>Main Component</h2>
      {props.children}
      <img src={ sampleImage } alt='Sample Image' />
      <p className="sample__paragraph">lorem ipsum Semple text</p>
    </div>
  );
};

module.exports = Main;
