const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  serNextContact: {type: String, reuired: true},
  serFirst: String,
  serLast: String,
  serImportant: Boolean,
  serCompany: String,
  serPhone: String,
  serEmail: String,
  serMeetDate: String,
  serNote: String,
  serPast: Array
});

contactSchema.methods.contactApi = function() {
  return {
    id: this._id,
    serFirst: this.serFirst,
    serLast: this.serLast,
    serImportant: this.serImportant,
    serCompany: this.serCompany,
    serPhone: this.serPhone,
    serEmail: this.serEmail,
    serMeet: this.serMeet,
    serNote: this.serNote,
    serPast: this.serPast
  };
}

const pastContactSchema = mongoose.Schema({
  serDateContact: {type: String, required: true},
  serTypeContact: String,
  serNotesContact: String
});

pastContactSchema.methods.pastApi = function() {
  return {
    contactId: this._id,
    serDateContact: this.Contact.serDateContact,
    serTypeContact: this.Contact.serTypeContact,
    serNotesContact: this.Contact.serNotesContact
  }
}

const ContactModel = mongoose.model('ContactModel', contactSchema);

const PastModel = mongoose.model('PastModel', pastContactSchema);

module.exports = {ContactModel}, {PastModel};
