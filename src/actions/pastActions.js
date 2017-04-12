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
