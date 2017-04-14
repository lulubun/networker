initialState = {
  allContacts: []
}

const AllContactsState = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_CONTACTS'
    return {
      ...state,
    };

    default:
    return state
  }
}

export default AllContactsState
