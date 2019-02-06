import { hashHistory } from 'react-router';
import * as constants from './constants';

//open a contact just created
export const SET_NEW_CONTACT = 'SET_NEW_CONTACT';
export const setNewContact = (contact) => ({
  type: SET_NEW_CONTACT,
  contact
});

//open one contact with full past
export const SET_ONE_CONTACT = 'SET_ONE_CONTACT';
export const setOneContact = (contact) => ({
  type: SET_ONE_CONTACT,
  contact
});

export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const updateContact = (contact) => ({
  type: UPDATE_CONTACT,
  contact
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
    const urlWhole = (constants.SER_URL + '/' + user + '/one_contact/' + id)
    fetch(urlWhole)
    .then(response => response.json())
    .then(data => dispatch(setOneContact(data)))
    .catch(ex => console.log(ex))
  }
}

export function sendNewContact(user, contact) {
  return dispatch => {
    const url = constants.SER_URL + '/' + user + '/new_contact';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user,
        contact
      })
    })
    .then(response => response.json())
    .then(hashHistory.push('/' + user + '/contacts'))
  }
};

export function fetchUpdate(user, job) {
  return dispatch => {
    const url = constants.SER_URL + '/' + user + '/edit_contact/' + job._id;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        job        
      })
    })
    .then(response => response.json())
    .then(data => {
      dispatch(setOneContact(data))
    })
    .then(hashHistory.push('/' + user + '/one_contact/' + job._id))
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
    const url = constants.SER_URL + '/' + user + '/contacts';
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
        dispatch(setAllContacts(sortedArray))
    })
    .catch(ex => console.log(ex))
  }
};

export function fetchDeleteContact(editId, editUser) {
  let _id = editId;
  const user = editUser;
  return dispatch => {
    const urlDel = constants.SER_URL + '/' + user + '/one_contact/' + _id;
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
    .then(hashHistory.push('/' + user + '/contacts'))
    .catch(ex => console.log(ex))
  }
};

export function fetchHeartDateUpdate(user, contactId, isInputChecked, appDate) {
  const serUser = user;
  let important = isInputChecked;
  let _id = contactId;
  const serNextContact = appDate;
  return dispatch => {
    const urlHeart = constants.SER_URL + '/' + serUser + '/one_contact/' + _id;
    fetch(urlHeart, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serUser,
        important,
        serNextContact
      })
    })
    .then(response => response.json())
    .then(res => {
      dispatch(setOneContact(
      res.id,
      res.serNextContact,
      res.serFirst,
      res.serLast,
      res.important,
      res.company,
      res.jobTitle,
      res.serEmail,
      res.serPhone,
      res.serMeetDate,
      res.serNote,
      res.serPast
    ))})
    .catch(ex => console.log(ex))
  }
};

export function sendNewPast(user, _id, past) {
  return dispatch => {
    const pastUrl = constants.SER_URL + '/' + user + '/newPast/' + _id;
    fetch(pastUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user,
        _id,
        past
      })
    })
    .then(response => response.json())
    .then(json => {
      dispatch(updateContactPast(json))
    })
  }
}

export function fetchDeletePast(user, _id, pastId) {
  return dispatch => {
    const urlDel = constants.SER_URL + '/' + user + '/one_contact/' + _id + '/' + pastId;
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
    .then(updated => {
      dispatch(fetchWholeContact(_id, user))
    })
    .catch(ex => console.log(ex))
  }
};

export function fetchLogOut() {
  return dispatch => {
    const logOut = constants.SER_URL + '/logout';
    fetch(logOut)
    .then(location.assign('/'))
    .catch(ex => console.log(ex))
  }
}
