//  Rollback to React 14
//  Stick to Webpack 3.
var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');
var Weather = require('Weather');
var About = require('About');
var Examples = require('Examples');

// Import PostCSS SCSS stylesheets from static files.
import './app.pscss';
// Load Foundation framework into  SASS stylesheets bundle.
//  ( according to  Foundation site.)
import './app.scss';
// Or inject Foundation into app.jsx  JS bundle using style-loader   npm module
// require('style-loader!css-loader!foundation-sites/dist/foundation.min.css');

// Fire up Foundation, using jQuery module loaded by webpack.
$(document).foundation();

ReactDOM.render(
  <Router history={hashHistory}>
    {/*  history property  above instructs Router to enable Link feature */}
    {/*  root path below */}
      <Route path="/" component={Main}>
      {/*  path to about page (component) */}
        <Route path="about" component={About}/>
        {/*  path to examples page (component) */}
          <Route path="examples" component={Examples}/>
          {/*  Default route (does not match any path) URL and component in nav Menu */}
            <IndexRoute component={Weather}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
