let date = new Date();
let today = String(date);

const initialState = {
  id: '',
  companyState: '',
  jobTitleState: '',
  foundJobState: today,
  dateNextState: '',
  importState: false,
  stageState: 'Discovered',
  contactState: '',
  researchState: '',
  jobNotesState: '',
  websiteState: '',
  postState: '',
  allPastState: []
}

const JobState = (state=initialState, action) => {
  switch (action.type) {
  case 'SET_NEW_JOB':
    return {
      ...state,
      companyState: action.newCompany,
      jobTitleState: action.newJobTitle,
      foundJobState: action.newFoundJob,
      dateNextState: action.newDateNext,
      importState: action.newImportant,
      stageState: action.newStage,
      contactState: action.newContactName,
      foundJobState: action.newFoundJob,
      researchState: action.newResearch,
      jobNotesState: action.newJobNotes,
      websiteState: action.newWebsite,
      postState: action.newPost
    };

    case 'SET_ONE_JOB':
    return {
      ...state,
      companyState: action.newCompany,
      jobTitleState: action.newJobTitle,
      foundJobState: action.newFoundJob,
      dateNextState: action.newDateNext,
      importState: action.newImportant,
      stageState: action.newStage,
      contactState: action.newContactName,
      foundJobState: action.newFoundJob,
      researchState: action.newResearch,
      jobNotesState: action.newJobNotes,
      websiteState: action.newWebsite,
      postState: action.newPost,
      allPastState: action.newPastArray
    };

    case 'UPDATE_JOB':
    return {
      ...state,
      companyState: action.newCompany,
      jobTitleState: action.newJobTitle,
      foundJobState: action.newFoundJob,
      dateNextState: action.newDateNext,
      importState: action.newImportant,
      stageState: action.newStage,
      contactState: action.newContactName,
      foundJobState: action.newFoundJob,
      researchState: action.newResearch,
      jobNotesState: action.newJobNotes,
      websiteState: action.newWebsite,
      postState: action.newPost
    };

    case 'UPDATE_DATE_NEXT_JOB':
    return {
      ...state,
      dateNextState: action.newDateNext.serDateNext
    };

    case 'UPDATE_JOB_PAST':
    return {
      ...state,
      allPastState: action.updatedJob.serPastJobs
    }

    case 'UPDATE_HEART':
    return {
      ...state,
      importState: !state.importState
    }
    case 'INDI_UPDATE':
    return {
      ...state,
      [action.payload.kind]: action.payload.update
    }

    default:
    return state
  }
}

export default JobState
