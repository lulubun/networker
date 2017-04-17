export const SET_NEW_PAST = 'SET_NEW_PAST';
export const setNewPast = (newPastDate, newPastTypeCon, newPastNote) => ({
  type: SET_NEW_PAST,
  newPastDate,
  newPastTypeCon,
  newPastNote
});

export const UPDATE_PAST_DATE = 'UPDATE_PAST_DATE';
export const updatePastDate = (newPastDate) => ({
  type: UPDATE_PAST_DATE,
  newPastDate
});

export const UPDATE_PAST_TYPE_CON = 'UPDATE_PAST_TYPE_CON';
export const updateTypePastCon = (newTypePastCon) => ({
  type: UPDATE_PAST_TYPE_CON,
  newTypePastCon
});

export const UPDATE_PAST_NOTE = 'UPDATE_PAST_NOTE';
export const updatePastNote = (newPastNote) => ({
  type: UPDATE_PAST_NOTE,
  newPastNote
});

export function updatePastInstance() {
  return dispatch => {
    fetch(DATABASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'serPast.pastId': sendId
      },
      {'$set': {
          'serPast.$.serDateContact': sendPastDate,
          'serPast.$.serTypeContact': sendTypeContact,
          'serPast.$.serNotesContact': sendNotesContact
          }
      })
    })
    .then(response => response.json())
    .then(data => {
        data.update({
        }, function(err) { ...
        dispatch(setOneContactLink(newDateNext, newFirstName, newLastName, newImportant, newCompany))
      })
    })
    .catch(ex => console.log(ex))
  }
};
