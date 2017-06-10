"use strict";

var React = require('react');
var Router = require('react-router');
var RegisterForm = require('./registerForm');
var RegistrActions = require('../../actions/registerActions');
var toastr = require('toastr');

var RegisterPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    statics: {
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    getInitialState: function() {
        return {
            registr: { img: '../images/default.jpg', login: '', password: '', name: '', surname: '', money: 0, flat1: 0, flat2: 0, flat3: 0, flat4plus: 0, pay: 0, pro: false, extra: false},
            errors: {},
            dirty: false
        };
    },



    setRegisterState: function(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.registr[field] = value;
        return this.setState({user: this.state.registr});
    },

    registerFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {}; //clear any previous errors.

        if (this.state.registr.name.length < 3) {
            this.state.errors.name = 'First name must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.registr.surname.length < 3) {
            this.state.errors.surname = 'Last name must be at least 3 characters.';
            formIsValid = false;
        }
        if (this.state.registr.login.length < 3) {
            this.state.errors.login = 'Login must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.registr.password.length < 3) {
            this.state.errors.password = 'Password must be at least 3 characters.';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },


    saveForm: function(event) {
        event.preventDefault();
        console.log(this.state);
        if (!this.registerFormIsValid()) {
            return;
        }

        if (this.state.registr.login) {
            RegistrActions.updateAuthor(this.state.registr);
        } else {
            RegistrActions.createAuthor(this.state.registr);
        }

        this.setState({dirty: false});
        toastr.success('You registered.');

        this.transitionTo('app');
    },

    render: function() {
        return (
            <RegisterForm
                registr={this.state.registr}
                onChange={this.setRegisterState}
                onSave={this.saveForm}
                errors={this.state.errors} />
        );
    }
});

module.exports = RegisterPage;

