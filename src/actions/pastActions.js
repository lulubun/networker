export const SET_NEW_PAST = 'SET_NEW_PAST';
export const setNewPast = (newPastDate, newPastTypeCon, newPastNote) => ({
  type: SET_NEW_PAST,
  newPastDate,
  newPastTypeCon,
  newPastNote
});

export function sendNewPast(contactId, pastId, dateInput, typeInput, contactNotesInput) {
  return dispatch => {
    let _id = contactId;
    const pastUrl = DATABASE_URL + '/:user/new_past/' + _id;
    let serDateContact = dateInput;
    let serTypeContact = typeInput;
    let serNotesContact = contactNotesInput;
    let pastId = pastId;
    fetch(pastUrl, {
      method: 'PUT',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id,
        serPast:
        {
          pastId,
          serDateContact,
          serTypeContact,
          serNotesContact
        }
      })
    })
    .then(response =>
      response.json())
    //.then(location.assign('http://localhost:3000/one_contact/' + _id))
    .catch(ex => console.log(ex))
  }
}
