import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import './main.html';

Template.inputForm.events({
  'submit form': function(event, template) {
    event.preventDefault();
    const text = template.find('#text').value;
    const language = template.find('#language').value;

    Meteor.call('enhanceText', text, language, (error, result) => {
      if (error) {
        console.error('API call failed:', error);
        return;
      }

      Session.set('enhancedText', result);
    });
  },
});

Template.enhancedText.helpers({
  enhancedText() {
    return Session.get('enhancedText');
  },
});

Template.enhancedText.events({
  'click #copyBtn': function() {
    const enhancedText = Session.get('enhancedText');
    navigator.clipboard.writeText(enhancedText)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy text:', error);
      });
  },
});
