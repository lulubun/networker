import DATABASE_URL from '../../config';

export const SET_ALL_CONTACTS = 'SET_ALL_CONTACTS';
export const setAllContacts = (id, newDateNext, newFirstName, newLastName, newImportant, newCompany) => {
  type: SET_ALL_CONTACTS,
  id,
  newDateNext,
  newFirstName,
  newLastName,
  newImportant,
  newCompany
}

export function fetchAllContacts() {
  return dispatch => {
    fetch(DATABASE_URL)
    .then(response => response.json())
    .then(data.forEach(item => {
      let id = data.id;
      let newDateNext = data.serNextContact;
      let newFirstName = data.serFirst;
      let newLastName = data.serLast;
      let newImportant = data.serImportant;
      let newCompany = data.serCompany;
      dispatch(setAllContacts(item: {id, newDateNext, newFirstName, newLastName, newImportant, newCompany}))}))
    .catch(ex => console.log(ex))
  }
};
