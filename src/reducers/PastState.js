const initialState = {
  pastDate: '',
  pastTypeCon: '',
  pastNote: ''
};

const PastState = (sate=initialState, action) => {
  switch (action.type) {
    case 'SET_PAST_DATE'
    return {
      ...state, {
        pastDate: newPastDate.action,
        pastTypeCon : newPastTypeCon.action,
        pastNote: newPastNote.action
      }
    };

    case 'UPDATE_PAST_DATE'
    return {
      ...state, {
        pastDate: newPastDate.action
      }
    };

    case 'UPDATE_PAST_TYPE_CON'
    return {
      ...state, {
        pastTypeCon: newPastTypeCon.action
      }
    };

    case 'UPDATE_PAST_NOTE'
    return {
      ...state, {
        pastNote: newPastNote.action
      }
    };

    default:
    return state
  }
}

export default PastState
