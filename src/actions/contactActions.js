import DATABASE_URL from '../../config';

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

export const SET_ONE_CONTACT = 'SET_ONE_CONTACT';
export const setOneContact = (id, newDateNext, newFirstName, newLastName, newImportant, newCompany, newJobTitle, newEmail, newPhone, newMeetDate, newMeetNotes) => ({
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
  newMeetNotes
});

export const UPDATE_DATE_NEXT = 'UPDATE_DATE_NEXT';
export const updateDateNext = (newDateNext) => ({
  type: UPDATE_DATE_NEXT,
  newDateNext
});

export const UPDATE_FIRST_NAME = 'UPDATE_FIRST_NAME';
export const updateFirstName = (newFirstName) => ({
  type: UPDATE_FIRST_NAME,
  newFirstName
});

export const UPDATE_LAST_NAME = 'UPDATE_LAST_NAME';
export const updateLastName = (newLastName) => ({
  type: UPDATE_LAST_NAME,
  newLastName
});

export const UPDATE_IMPORTANT = 'UPDATE_IMPORTANT';
export const updateImportant = (newImportant) => ({
  type: UPDATE_IMPORTANT,
  newImportant
});

export const UPDATE_COMPANY = 'UPDATE_COMPANY';
export const updateCompany = (newCompany) => ({
  type: UPDATE_COMPANY,
  newCompany
});

export const UPDATE_JOB_TITLE = 'UPDATE_JOB_TITLE';
export const updateJobTitle = (newJobTitle) => ({
  type: UPDATE_JOB_TITLE,
  newJobTitle
});

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const updateEmail = (newEmail) => ({
  type: UPDATE_EMAIL,
  newEmail
});

export const UPDATE_PHONE = 'UPDATE_PHONE';
export const updatePhone = (newPhone) => ({
  type: UPDATE_PHONE,
  newPhone
});

export const UPDATE_MEET_DATE = 'UPDATE_MEET_DATE';
export const updateMeetDate = () => ({
  type: UPDATE_MEET_DATE
});

export const UPDATE_MEET_NOTES = 'UPDATE_MEET_NOTES';
export const updateMeetNotes = (newMeetNotes) => ({
  type: UPDATE_MEET_NOTES,
  newMeetNotes
});


export function fetchWholeContact() {
  return dispatch => {
    fetch(DATABASE_URL)
    .then(response => response.json())
    .then(data => dispatch(setOneContact(data)))
    .catch(ex => console.log(ex))
  }
}

export function sendNewContact(newContact) {
  fetch(DATABASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      newContact
    })
  })
  .then(response => response.json())
  .then(() => fetchAllContacts())
}

export const SET_ALL_CONTACTS = 'SET_ALL_CONTACTS';
export const setAllContacts = (allContacts) => ({
  type: SET_ALL_CONTACTS,
  allContacts
});

export const SET_ONE_CONTACT_LINK = 'SET_ONE_CONTACT_LINK';
export const setOneContactLink = (id, newDateNext, newFirstName, newLastName, newImportant, newCompany) => ({
  type: SET_ALL_CONTACTS,
  id,
  newDateNext,
  newFirstName,
  newLastName,
  newImportant,
  newCompany
});

export function fetchAllContacts() {
  return dispatch => {
    fetch(DATABASE_URL)
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        let newDateNext = item.serNextContact;
        let newFirstName = item.serFirst;
        let newLastName = item.serLast;
        let newImportant = item.serImportant;
        let newCompany = item.serCompany;
        dispatch(setOneContactLink(newDateNext, newFirstName, newLastName, newImportant, newCompany))
      })
    })
    .catch(ex => console.log(ex))
  }
};
