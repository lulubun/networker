import DATABASE_URL from '../../config';

//open a contact just created
export const SET_NEW_CONTACT = 'SET_NEW_CONTACT';
export const setNewContact = (newDateNext, newFirstName, newLastName, newImportant, newCompany, newJobTitle, newEmail, newPhone, newMeetDate, newMeetNotes) => ({
  type: SET_NEW_CONTACT,
  newDateNext,
  newFirstName,
  newLastName,
  newImportant,
  newCompany,
  newJobTitle,
  newEmail,
  newPhone,
  newMeetDate,
  newMeetNotes
});

//open one contact with full past
export const SET_ONE_CONTACT = 'SET_ONE_CONTACT';
export const setOneContact = (id, newDateNext, newFirstName, newLastName, newImportant, newCompany, newJobTitle, newEmail, newPhone, newMeetDate, newMeetNotes, newPastArray) => ({
  type: SET_ONE_CONTACT,
  id,
  newDateNext,
  newFirstName,
  newLastName,
  newImportant,
  newCompany,
  newJobTitle,
  newEmail,
  newPhone,
  newMeetDate,
  newMeetNotes,
  newPastArray
});

export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const updateContact = (newFirstName, newLastName, newImportant, newCompany, newJobTitle, newEmail, newPhone, newMeetDate, newMeetNotes) => ({
  type: UPDATE_CONTACT,
  newFirstName,
  newLastName,
  newImportant,
  newCompany,
  newJobTitle,
  newEmail,
  newPhone,
  newMeetDate,
  newMeetNotes
});

export const UPDATE_DATE_NEXT = 'UPDATE_DATE_NEXT';
export const updateDateNext = (newDateNext) => ({
  type: UPDATE_DATE_NEXT,
  newDateNext
});


export function fetchWholeContact(id) {
  return dispatch => {
    const urlWhole = ('http://localhost:8080/one_contact/' + id)
    fetch(urlWhole)
    .then(response => response.json())
    .then(data => {
      let id = data._id;
      let newDateNext = data.serNextContact;
      let newFirstName = data.serFirst;
      let newLastName = data.serLast;
      let newImportant = data.serImportant;
      let newCompany = data.serCompany;
      let newJobTitle = data.serJobTitle;
      let newEmail = data.serEmail;
      let newPhone = data.serPhone;
      let newMeetDate = data.serMeetDate;
      let newMeetNotes = data.serNote;
      let newPastArray = data.serPast;
      dispatch(setOneContact(id,
        newDateNext,
        newFirstName,
        newLastName,
        newImportant,
        newCompany,
        newJobTitle,
        newEmail,
        newPhone,
        newMeetDate,
        newMeetNotes, newPastArray))})
    .catch(ex => console.log(ex))
  }
}

export function sendNewContact(firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput) {
  if (firstInput == '' && lastInput == '') {
    alert("You cannot create a contact without a name");
  } else {
  return dispatch => {
    const url = 'http://localhost:8080/new_contact';
    let serNextContact = dateNextInput;
    let serFirst = firstInput;
    let serLast = lastInput;
    let serImportant = importantInput;
    let serCompany = companyInput;
    let serJobTitle = jobTitleInput;
    let serPhone = phoneInput;
    let serEmail = emailInput;
    let serMeetDate = meetDateInput;
    let serNote = notesInput;
    console.log(serMeetDate, serNextContact);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        serNextContact,
        serFirst,
        serLast,
        serImportant,
        serCompany,
        serJobTitle,
        serPhone,
        serEmail,
        serMeetDate,
        serNote
      })
    })
    .then(response => response.json())
    .then(location.assign('http://localhost:3000/contacts'))
  }}
};

export function fetchUpdate(editId, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput) {
  return dispatch => {
    let _id = editId;
    const url = 'http://localhost:8080/edit_contact/' + _id;
    let serFirst = firstInput;
    let serLast = lastInput;
    let serImportant = importantInput;
    let serCompany = companyInput;
    let serJobTitle = jobTitleInput;
    let serPhone = phoneInput;
    let serEmail = emailInput;
    let serMeetDate = meetDateInput;
    let serNote = notesInput;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serFirst,
        serLast,
        serImportant,
        serCompany,
        serJobTitle,
        serPhone,
        serEmail,
        serMeetDate,
        serNote
      })
    })
    .then(response => response.json())
    .then(location.assign('http://localhost:3000/one_contact/' + _id))
  }
};

export const SET_ALL_CONTACTS = 'SET_ALL_CONTACTS';
export const setAllContacts = (allContacts) => ({
  type: SET_ALL_CONTACTS,
  allContacts
});

export function fetchAllContacts() {
  return dispatch => {
    const url = 'http://localhost:8080/contacts';
    fetch(url, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(data => {
        dispatch(setAllContacts(data))
    })
    .catch(ex => console.log(ex))
  }
};

export function fetchDeleteContact(editId) {
  let _id = editId;
  return dispatch => {
    const urlDel = 'http://localhost:8080/one_contact/' + _id;
    fetch(urlDel, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id
      })
    })
    .then(response => response.json())
    .then(location.assign('http://localhost:3000/contacts'))
    .catch(ex => console.log(ex))
  }
};

export function fetchDateUpdate(contactId, date) {
  let serNextContact = date;
  let _id = contactId;
  return dispatch => {
    const urlDate = 'http://localhost:8080/one_contact/' + _id;
    fetch(urlDate, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serNextContact
      })
    })
    .then(response => response.json())
    .then(location.reload())
    .catch(ex => console.log(ex))
  }
};

export function fetchHeartUpdate(contactId, isInputChecked) {
  let serImportant = isInputChecked;
  console.log(serImportant);
  let _id = contactId;
  return dispatch => {
    const urlHeart = 'http://localhost:8080/one_contact/' + _id;
    fetch(urlHeart, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serImportant
      })
    })
    .then(response => response.json())
    .then(location.reload())
    .catch(ex => console.log(ex))
  }
};

export function sendNewPast(contactId, pastid, dateInput, typeInput, contactNotesInput) {
  return dispatch => {
    let id = contactId;
    let pastId = pastid;
    console.log('hello', pastId);
    const pastUrl = 'http://localhost:8080/newPast';
    let serDateContact = dateInput;
    let serTypeContact = typeInput;
    let serNotesContact = contactNotesInput;
    fetch('http://localhost:8080/newPast', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Hubot',
        login: 'hubot',
   })
    })
    .then(response => response.json())
    .then(location.assign('http://localhost:3000/one_contact/' + id))
    .catch(ex => console.log(ex))
  }
}
