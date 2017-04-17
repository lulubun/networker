const initialState = {
  pastDate: '',
  pastTypeCon: '',
  pastNote: ''
};

const PastState = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_PAST_DATE':
    return {
      ...state,
        pastDate: action.newPastDate,
        pastTypeCon: action.newPastTypeCon,
        pastNote: action.newPastNote

    };

    case 'UPDATE_PAST_DATE':
    return {
      ...state,
      pastDate: action.newPastDate

    };

    case 'UPDATE_PAST_TYPE_CON':
    return {
      ...state,
      pastTypeCon: action.newPastTypeCon
    };

    case 'UPDATE_PAST_NOTE':
    return {
      ...state,
        pastNote: action.newPastNote
    };

    default:
    return state
  }
}

export default PastState
