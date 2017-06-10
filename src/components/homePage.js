"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
	Home: function(){
		if(Home.instance){ return Home.instance; }
		Home.instance = this;
	},
	render: function() {
		return (
			<div className="row" >
				<div className="col-md-6 jek"><img src="../images/jek.jpeg"/></div>
				<div className="col-md-6 text-center vcenter">
					<Link to="login" className="btn btn-primary btn-lg"><div>Войти</div></Link>
					<Link to="register"><div>Зарегистрироваться</div></Link>
				</div>

			</div>
		);
	}
});

module.exports = Home;