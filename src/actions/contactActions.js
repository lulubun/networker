/* global gapi */
import { browserHistory } from 'react-router'

const SER_URL = 'https://warm-harbor-59021.herokuapp.com';
const APP_URL = 'https://be-a-networker.herokuapp.com';

// const SER_URL = 'http://localhost:8080';
// const APP_URL = 'http://localhost:3000';


export const SET_GOOGLE_LOGIN = 'SET_GOOGLE_LOGIN';
export const setGoogleLogin = (boolean) => ({
  type: SET_GOOGLE_LOGIN,
  boolean
})

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

export const UPDATE_CONTACT_PAST = 'UPDATE_CONTACT_PAST';
export const updateContactPast = (updatedContact) =>  ({
  type: UPDATE_CONTACT_PAST,
  updatedContact
})

export const UPDATE_HEART = 'UPDATE_HEART';
export const updateHeart = (updatedHeart) => ({
  type: UPDATE_HEART,
  updatedHeart
})


export function fetchWholeContact(id, user) {
  return dispatch => {
    const urlWhole = (SER_URL + '/' + user + '/one_contact/' + id)
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
        newMeetNotes,
        newPastArray))})
    .catch(ex => console.log(ex))
  }
}

export function sendNewContact(user, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput, dateNextInput) {
  return dispatch => {
    const serUser = user;
    console.log(serUser);
    const url = SER_URL + '/' + serUser + '/new_contact';
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
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        serUser,
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
    .then(browserHistory.push('/' + user + '/contacts'))
  }
};

export function fetchUpdate(editUser, editId, firstInput, lastInput, importantInput, companyInput, jobTitleInput, emailInput, phoneInput, meetDateInput, notesInput) {
  return dispatch => {
    const user = editUser;
    let _id = editId;
    const url = SER_URL + '/' + user + '/edit_contact/' + _id;
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
    .then(response => console.log(response.json()))
    .then(browserHistory.push('/' + user + '/one_contact/' + _id))
    .catch(ex => console.log(ex))
  }
};

export const SET_ALL_CONTACTS = 'SET_ALL_CONTACTS';
export const setAllContacts = (allContacts) => ({
  type: SET_ALL_CONTACTS,
  allContacts
});

export function fetchAllContacts(user) {
  return dispatch => {
    const url = SER_URL + '/' + user + '/contacts';
    let sortedArray = [];
    fetch(url, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(data => {
        sortedArray = data.sort(function(a, b) {return Date.parse(a.serNextContact) - Date.parse(b.serNextContact)});
        console.log(sortedArray);
        dispatch(setAllContacts(sortedArray))
    })
    .catch(ex => console.log(ex))
  }
};

export function fetchDeleteContact(editId, editUser) {
  let _id = editId;
  const user = editUser;
  return dispatch => {
    const urlDel = SER_URL + '/' + user + '/one_contact/' + _id;
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
    .then(browserHistory.push('/' + user + '/contacts'))
    .catch(ex => console.log(ex))
  }
};

export function fetchDateUpdate(user, contactId, date) {
  let serUser = user;
  let serNextContact = date;
  let _id = contactId;
  console.log(serNextContact);
  return dispatch => {
    const urlDate = SER_URL + '/' + serUser + '/one_contact/' + _id + '/dateUpdate';
    fetch(urlDate, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serUser,
        serNextContact
      })
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      dispatch(setOneContact(res.id,
      res.serNextContact,
      res.serFirst,
      res.serLast,
      res.serImportant,
      res.serCompany,
      res.serJobTitle,
      res.serEmail,
      res.serPhone,
      res.serMeetDate,
      res.serNote,
      res.serPast))})
    .catch(ex => console.log(ex))
  }
};

export function fetchHeartUpdate(user, contactId, isInputChecked) {
  const serUser = user;
  let serImportant = isInputChecked;
  console.log(serImportant);
  let _id = contactId;
  return dispatch => {
    const urlHeart = SER_URL + '/' + serUser + '/one_contact/' + _id + '/heartUpdate';
    fetch(urlHeart, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serUser,
        serImportant
      })
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      dispatch(setOneContact(
      res.id,
      res.serNextContact,
      res.serFirst,
      res.serLast,
      res.serImportant,
      res.serCompany,
      res.serJobTitle,
      res.serEmail,
      res.serPhone,
      res.serMeetDate,
      res.serNote,
      res.serPast
    ))})
    .catch(ex => console.log(ex))
  }
};

export function sendNewPast(user, contactId, pastid, dateInput, typeInput, contactNotesInput) {
  return dispatch => {
    let serUser = user;
    let id = contactId;
    console.log(user, id);
    let pastId = pastid;
    const pastUrl = SER_URL + '/' + user + '/newPast/' + id;
    let serDateContact = dateInput;
    let serTypeContact = typeInput;
    let serNotesContact = contactNotesInput;
    fetch(pastUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        serUser,
        id,
        pastId,
        serDateContact,
        serTypeContact,
        serNotesContact
      })
    })
    .then(response => response.json())
    .then(json => dispatch(updateContactPast(json)))
  }
}

export function fetchDeletePast(userOne, contactId, oneId) {
  let _id = contactId;
  const user = userOne;
  const pastId = oneId;
  return dispatch => {
    const urlDel = SER_URL + '/' + user + '/one_contact/' + _id + '/' + pastId;
    fetch(urlDel, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        user,
        pastId
      })
    })
    .then(response => response.json())
    .then(res => {
      console.log(res);
      dispatch(
        setOneContact(
          res.id,
          res.serNextContact,
          res.serFirst,
          res.serLast,
          res.serImportant,
          res.serCompany,
          res.serJobTitle,
          res.serEmail,
          res.serPhone,
          res.serMeetDate,
          res.serNote,
          res.serPast
        )
      )
    })
    .catch(ex => console.log(ex))
  }
};

export function appendPre(message) {
  return dispatch => {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }
}


export function pushToGoogle(pushEvent) {
  return dispatch => {
    let request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': pushEvent
    });
    request.execute(function(pushEvent) {
      console.log(pushEvent);
      alert('Follow up added to your Google Calendar');
    });
  }
}

export function removeCssHide() {
  return dispatch => {
    document.getElementById("google_stuff").classList.remove("hideMe");
  }
}

export function cssHide() {
  return dispatch => {
    document.getElementById("google_stuff").classList.add("hideMe");
  }
}

export function fetchLogOut() {
  return dispatch => {
    const logOut = SER_URL + '/logout';
    fetch(logOut)
    .then(browserHistory.push('/'))
    .catch(ex => console.log(ex))
  }
}
