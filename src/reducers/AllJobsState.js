const initialState = {
  allJobs: []
}

const AllJobsState = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_JOBS':
    return {
      ...state,
      allJobs: action.allJobs
    };

    default:
    return state
  }
}

export default AllJobsState
