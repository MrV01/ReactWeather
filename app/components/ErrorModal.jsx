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
var ReactDOM = require('react-dom');   // to manipulate DOM ,  modal  in particular
var ReactDOMServer = require('react-dom/server');  // to render JSX to HTML text form.

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
  //  Important:  modal.open()  also  modifies the DOM in parallel ,
  // And React notices inconsistency, then generating an error.
  // Workaround is:  Render JSX of the Modal separately,
  // after React finish rendering  of empty div

  componentDidMount: function () {
    // Pull the props of the component
    var {title,message} = this.props;
    // JSX object to be rendered  by ReactDOMServer engine
      var modalMarkup = (
      <div id="error-modal" className=" reveal tiny text-center" data-reveal="">
          <h4>{title}</h4>
          <p>{message}</p>
          <p>
            <button className="button hollow" data-close=""> Okay</button>
          </p>
      </div>
    );

    //  Create copy of  rendered modal from JSX  to string format  using jQuery
    var $modal = $(ReactDOMServer.renderToString(modalMarkup));
    // Using jQuery convert string format to HTML
    //  Then  hook ut to DOM using  ReactDOM.findDOMNode selector, and jQuery .html method
    $(ReactDOM.findDOMNode(this)).html($modal);

    var modal = new Foundation.Reveal($('#error-modal'));   // definition of the modal
     modal.open();  // show the modal.
  },
  //React render .
  render:  function () {
    // JSX object to render by the engine .
    //  In this case, empty <div> element to be parent of modal
    // Cause jquery and Foundation will modify DOM after React render.
    return (
      <div></div>
        );
  }
});

module.exports = ErrorModal ;
