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


export function fetchWholeContact(id) {
  return dispatch => {
    console.log(id);
    const urlWhole = ('http://localhost:8080/one_contact/' + id)
    fetch(urlWhole)
    .then(response => response.json())
    .then(data => {
      console.log(data);
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
    let serNote = notesInput
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
        console.log(data);
        dispatch(setAllContacts(data))
    })
    .catch(ex => console.log(ex))
  }
};
