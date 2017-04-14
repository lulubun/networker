export const SET_NEW_CONTACT = 'SET_NEW_CONTACT';
export const setNewContact = (newDateNext, newFirstName, newLastName, newImportant, newCompany, newJobTitle, newEmail, newPhone, newMeetNotes) => {
  type: SET_NEW_CONTACT,
  newDateNext,
  newFirstName,
  newLastName,
  newImportant,
  newCompany,
  newJobTitle,
  newEmail,
  newPhone,
  newMeetNotes
}

export const SET_ONE_CONTACT = 'SET_ONE_CONTACT';
export const setOneContact = (newDateNext, newFirstName, newLastName, newImportant, newCompany) => {
  type: SET_ONE_CONTACT,
  newDateNext,
  newFirstName,
  newLastName,
  newImportant,
  newCompany
}

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

export function fetchAllContacts() {
  return dispatch => {
    const url =
    fetch(url)
    .then(response => response.json())
    .then(data => {
      for (var i = 0; i < data.length; i++) {
        let newDateNext = data[i].serNextContact
        let newFirstName = data[i].serFirst;
        let newLastName = data[i].serLast;
        let newCompany = data[i].serCompany;}
        dispatch(setOneContact(newDateNext, newFirstName, newLastName, newCompany))
      })
    .catch(ex => console.log(ex))
  }
};

export function fetchWholeContact() {
  return dispatch => {
    const url =
    fetch(url)
    .then(response => response.json())
    .then(data => dispatch(listPast(data)))
    .catch(ex => console.log(ex))
  }
}

export function sendNewContact() {
  const url =
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      newContact
    })
  })
  .then(response => response.json())
  .then(data => dispatch(listContacts(data)))
  .then()
}
