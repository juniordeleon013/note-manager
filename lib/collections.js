import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
	'notes.insert'(text){

		//check if user if logged in
		if(!Meteor.userId()){
			Materialize.toast('Not-authorized', 4000);
			throw new Meteor.Error('Not-authorized');
		}

		Notes.insert({
			text: text,
			owner: Meteor.userId(),
			username: Meteor.user().username,
			createAt: new Date()
		});


	},
	'notes.remove'(note){
		check(note._id, String);

		if(note.owner !== Meteor.userId()){
			Materialize.toast('Not-authorized', 4000);
			throw new Meteor.Error('Not-authorized');	
		}
		Notes.remove(note._id);
		Materialize.toast(note.text + ' was deleted', 4000);
	}
});