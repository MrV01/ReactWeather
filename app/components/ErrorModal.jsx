// Zurb foundatrion  plugin "reveal"  is used in this compinent
//  className="data-reveal" date-close , etc
//
// Note: By default Modal is hidden.
// To show the modal we use "React components life cycle"
// https://facebook.github.io  ( Reference: Component Specs and Lifecycle )
//
// jQuery $ function has been  defined in webpack configuration.
// therefore no "require(jquery)" is needed here.
//
var React = require('react');

var ErrorModal = React.createClass({
  // React Life cycle  function
  getDefaultProps: function() {
    return {
      title: 'Error'
    };
  },
  // React properties types. To watch types during run time.
  propTypes: {
    title: React.PropTypes.string,   // String ( is not required )
    message: React.PropTypes.string.isRequired // String is Required
  },
  // React Life Cycle function Which will run automatically
  //  After  the render finished and DOM has been updated.
  //  Then Foundation object is created, and modal open
  //  Important:  modal.open()  also  modifies the DOM, and React
  //  notices the inconsistency, then generating an error.
  //
  componentDidMount: function () {
     var modal = new Foundation.Reveal($('#error-modal'));   // definition of the modal
     modal.open();  // show the modal.
  },
  //React render
  render:  function () {
    // Pull the props of the component
    var {title,message} = this.props;
    // JSX object to render by the engine
    return (
      <div id="error-modal" className=" reveal tiny text-center" data-reveal="">
          <h4>{title}</h4>
          <p>{message}</p>
          <p>
            <button className="button hollow" data-close=""> Okay</button>
          </p>
      </div>
    );
  }
});

module.exports = ErrorModal ;
