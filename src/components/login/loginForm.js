"use strict";

var React = require('react');
var Input = require('../common/textInput');

var AuthorForm = React.createClass({
    propTypes: {
        author:	React.PropTypes.object.isRequired,
        onSave:	React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render: function() {
        return (
            <form>
                <h1>
                    Log in
                </h1>
                <Input
                    name="login"
                    label="Login"
                    value={this.props.author.login}
                    onChange={this.props.onChange}
                    error={this.props.errors.login} />

                <Input
                    name="password"
                    label="Password"
                    value={this.props.author.password}
                    onChange={this.props.onChange}
                    error={this.props.errors.password} />

                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave}/>
            </form>
        );
    }
});

module.exports = AuthorForm;