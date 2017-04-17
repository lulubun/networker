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
    fetch(DATABASE_URL, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => response.json())
    .then(data => {
      data.forEach(item => {
        let id = item.id;
        let newDateNext = item.serNextContact;
        let newFirstName = item.serFirst;
        let newLastName = item.serLast;
        let newImportant = item.serImportant;
        let newCompany = item.serCompany;
        dispatch(setAllContacts(id, newDateNext, newFirstName, newLastName, newImportant, newCompany))
      })
    })
    .catch(ex => console.log(ex))
  }
};
