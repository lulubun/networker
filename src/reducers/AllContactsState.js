const initialState = {
  allContacts: []
}

const AllContactsState = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_CONTACTS':
    return {
      ...state,
      allContacts: action.allContacts //.push(action.item)
    };

    default:
    return state
  }
}

export default AllContactsState
