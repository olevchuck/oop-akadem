"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorStore = require('../../stores/authorStore');
var AuthorForm = require('./loginForm');
var toastr = require('toastr');

var AuthorPage = React.createClass({
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

    componentWillMount: function() {
        AuthorStore.addChangeListener(this._onChange);
    },

    //Clean up when this component is unmounted
    componentWillUnmount: function() {
        AuthorStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({ author: AuthorStore.getAuthorByLogin() });
    },

    getInitialState: function() {
        return {
            author: { login: '', password: '' },
            errors: {},
            dirty: false
        };
    },


    setAuthorState: function(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    authorFormIsValid: function() {
        var formIsValid = true;
        this.state.errors = {}; //clear any previous errors.

        if (this.state.author.login.length < 3) {
            this.state.errors.login = 'Login must be at least 3 characters.';
            formIsValid = false;
        }

        if (this.state.author.password.length < 3) {
            this.state.errors.password = 'Password must be at least 3 characters.';
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;
    },

    saveAuthor: function(event) {
        event.preventDefault();

        if (!this.authorFormIsValid()) {
            return;
        }
        this.setState({dirty: false});
        var author = AuthorStore.getAuthorByLogin(this.state.author.login);

        var thisIcon = this;

        var PreLogin = function () {
            this.login = function(){};
        };

        var Login = function () {
            this.login = function(){
                toastr.success('You logined.');
                thisIcon.transitionTo("profile", {login: thisIcon.state.author.login});
            };
        };

        Login.prototype = new PreLogin();
        Login.prototype.constructor = Login;

        var LoginPro = function() {
            var temp = new Login();
            this.login = function(){
                if(!author)
                {
                    toastr.error("Sorry, you are not registered :(");
                    thisIcon.transitionTo("app");
                }
                if(author.name !== '') {
                    temp.login();
                }
            };
        };
        var test = new LoginPro();
        test.login();

    },

    render: function() {
        return (
            <AuthorForm
                author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors} />
        );
    }
});

module.exports = AuthorPage;