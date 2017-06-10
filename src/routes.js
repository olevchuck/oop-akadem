"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/homePage')} />
    <Route name="help" handler={require('./components/help/helpPage')} />
    <Route name="login" handler={require('./components/login/loginPage')} />
    <Route name="register" handler={require('./components/register/registerPage')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />
    <Route name="profile" path="profile/:login" handler={require('./components/login/profile')}/>
    <Route name="flats" path="profile/:login/:func" handler={require('./components/login/flats')}/>
    <NotFoundRoute handler={require('./components/notFoundPage')} />
    <Redirect from="about-us" to="about" />
    <Redirect from="awthurs" to="authors" />
    <Redirect from="about/*" to="about" />
  </Route>
);

module.exports = routes;