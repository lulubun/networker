const initialState = {
  allPast: []
}

const AllPastState = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_PAST':
    return {
      ...state,
    };

    default:
    return state
  }
}

export default AllPastState
