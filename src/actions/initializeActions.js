"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorApi = require('../api/authorApi');

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				authors: AuthorApi.getAllAuthors()
			}
		});
	},
    updateAuthor: function (login) {
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_AUTHOR,
            initialData: {
                authors: AuthorApi.getAuthorBylogin(login)
            }
        });
    }
};

module.exports = InitializeActions;