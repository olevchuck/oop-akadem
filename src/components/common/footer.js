"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Footer = React.createClass({
    render: function() {
        return (
            <nav className="navbar navbar-default text-center">
                <div className="container-fluid">
                    <Link to="app" className="navbar-brand">
                        <img src="images/Megapolis.png" />
                    </Link>
                    <adress>
                        <strong>ЖЭК, Inc</strong><br/>
                        Киев, переулок Ковальский 123
                    </adress>
                </div>
            </nav>
        );
    }
});

module.exports = Footer;