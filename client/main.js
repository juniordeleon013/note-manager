import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

//accounts config
Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});

import './main.html';

Template.body.helpers({

	notes(){
		return Notes.find({});
	}

});

Template.note.events({
	'click .delete-note': function(){
		Meteor.call('notes.remove', this);
	}
});

Template.addModal.events({
	'submit .add-form': function(event, template){
		event.preventDefault();
		//getting input value by id
		const textById = template.find('#text').value
		//getting input value by name html property
		const textByName = event.target.text.value;
		//getting equal
		var equalText = Notes.findOne(
		    { text: textByName}
		);

		if(equalText === undefined){
			if (textByName !== "" ) {
				//creating note
				Meteor.call('notes.insert', textByName);
				Materialize.toast(textByName + ' was created', 4000);
			}
		}else{
			Materialize.toast("Cannot insert the record because it exist");
		}

		//clear the input
		event.target.text.value = "";
		return false;
	}
});
