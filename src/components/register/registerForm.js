"use strict";

var React = require('react');
var Input = require('../common/textInput');

var AuthorForm = React.createClass({
    propTypes: {
        registr: React.PropTypes.object.isRequired,
        onSave:	React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render: function() {
        return (
            <form>
                <h1>
                    Registration
                </h1>
                <Input
                    name="name"
                    label="Name"
                    value={this.props.registr.name}
                    onChange={this.props.onChange}
                    error={this.props.errors.name} />

                <Input
                    name="surname"
                    label="Surname"
                    value={this.props.registr.surname}
                    onChange={this.props.onChange}
                    error={this.props.errors.surname} />

                <Input
                    name="login"
                    label="Login"
                    value={this.props.registr.login}
                    onChange={this.props.onChange}
                    error={this.props.errors.login} />

                <Input
                    name="password"
                    label="Password"
                    value={this.props.registr.password}
                    onChange={this.props.onChange}
                    error={this.props.errors.password} />

                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = AuthorForm;