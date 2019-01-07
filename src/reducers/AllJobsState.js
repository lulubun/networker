const initialState = {
  allJobs: [],
  allContacts: [],
}

const AllJobsState = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_JOBS':
    return {
      ...state,
      allJobs: action.allJobs,
    };

    case 'SET_ONE_JOB':
    console.log(action, state.allJobs)
    const updatedJobs = state.allJobs.reduce((acc, j) => {
      if(j._id === action.id) {
        return acc.concat([{
          _id: action.id,
          serCompany: action.newCompany,
          serJobTitle: action.newJobTitle,
          serNextDate: action.newDateNext,
          serImportant: action.newImportant,
          serStage: action.newStage,
          serContactName: action.newContactName,
          serFoundJob: action.newFoundJob,
          serResearch: action.newResearch,
          serJobNotes: action.newJobNotes,
          serWebsite: action.newWebsite,
          serPost: action.newPost,
          serPastJobs: action.newPastArray
        }])
      }
        return acc.concat([j])
    }, [])
    console.log('updatedJobs: ', updatedJobs);
    return {
      ...state,
      allJobs: updatedJobs
    };

    default:
    return state
  }
}

export default AllJobsState
