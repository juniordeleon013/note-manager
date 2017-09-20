import { Template } from 'meteor/templating';
import { Notes } from '../lib/collections.js';
import './main.html';

Template.body.helpers({

	notes(){
		return Notes.find({});
	}

});

Template.note.events({
	'click .delete-note': function(){
		Notes.remove(this._id);
		Materialize.toast(this.text + ' was deleted', 4000);
	}
});

Template.addModal.events({
	'submit .add-form': function(event,template){
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
				Notes.insert({
					text: textByName,
					createAt: new Date()
				});
				Materialize.toast(this.text + ' was created', 4000);
			}
			
		}else{
			Materialize.toast("Cannot insert the record because it exist");
		}
		
		//clear the input
		event.target.text.value = "";
		return false;
	}
});
