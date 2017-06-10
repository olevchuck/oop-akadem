"use strict";

//This file is mocking a web API by hitting hard coded data.
var authors = require('./authorData').authors;
var _ = require('lodash');


var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var AuthorApi = {
	getAllAuthors: function() {
		return _clone(authors);
	},

	getAuthorBylogin: function(login) {
		var author = _.find(authors, {login: login});
		return _clone(author);
	},
	
	saveAuthor: function(author) {
		//pretend an ajax call to web api is made here
		console.log('Pretend this just saved the author to the DB via AJAX call...');
		
		if (author.login) {
			var existingAuthorIndex = _.indexOf(authors, _.find(authors, {login: author.login}));
			authors.splice(existingAuthorIndex, 1, author);
		} else {
			//Just simulating creation here.
			//The server would generate ids for new authors in a real app.
			//Cloning so copy returned is passed by value rather than by reference.
			authors.push(_clone(author));
		}

		return author;
	},

	deleteAuthor: function(login) {
		console.log('Pretend this just deleted the author from the DB via an AJAX call...');
		_.remove(authors, { login: login});
	}
};

module.exports = AuthorApi;