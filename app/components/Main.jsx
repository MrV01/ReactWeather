// Rollback to React 14
// Webpack 3.
var React = require('react');
var Nav = require('Nav');

// Import sampleImage
var sampleImage  = require( '../assets/images/sampleimage.jpg');

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
      {/* Including  Legacy Float Grid */}
      <div className="row">
        {/* medium screen = 6 columns out of 12, large =3 /12 , small = centered , takes 12/12 coumns */}
        <div className="columns medium-6 large-4 small-centered">
          {props.children}
        </div>
      </div>
      {/* My little extra.  */}
      <img src={ sampleImage } alt='Sample Image' />
      <p className="sample__paragraph">lorem ipsum Semple text</p>
    </div>
  );
};

module.exports = Main;
