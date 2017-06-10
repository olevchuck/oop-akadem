"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _authors = [];

var AuthorStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllAuthors: function() {
		return _authors;
	},

	getAuthorByLogin: function(login) {
		return _.find(_authors, {login: login});
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_authors = action.initialData.authors;
			AuthorStore.emitChange();
			break;
		case ActionTypes.CREATE_AUTHOR:
			_authors.push(action.author);
			AuthorStore.emitChange();
			break;
		case ActionTypes.UPDATE_AUTHOR:
			var existingAuthor = _.find(_authors, {login: action.author.login});
			var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
			_authors.splice(existingAuthorIndex, 1, action.author);
			AuthorStore.emitChange();
			break;	
		case ActionTypes.DELETE_AUTHOR:
			_.remove(_authors, function(author) {
				return action.login === author.login;
			});
			AuthorStore.emitChange();
			break;

		default:
			// no op
	}
});

module.exports = AuthorStore;