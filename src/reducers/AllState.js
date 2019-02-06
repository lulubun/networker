const initialState = {
  allContacts: [],
  allJobs: [],
}

const AllState = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_CONTACTS':
    return {
      ...state,
      allContacts: action.allContacts
    };

  case 'SET_ALL_JOBS':
  return {
    ...state,
    allJobs: action.allJobs
  };

  case 'SET_ONE_JOB':
  const updatedJobs = state.allJobs.reduce((acc, j) => {
    // console.log('updatedJobs: ', action);
    if(j._id === action._id) {
      return acc.concat([{
        _id: action._id,
        company: action.company,
        jobTitle: action.jobTitle,
        nextDate: action.nextDate,
        important: action.important,
        stage: action.stage,
        contact: action.contact,
        foundDate: action.foundDate,
        research: action.research,
        notes: action.notes,
        website: action.website,
        post: action.post,
        pastJobs: action.past
      }])
    }
      return acc.concat([j])
  }, [])
  // console.log('updatedJobs: ', action, updatedJobs);
  return {
    ...state,
    allJobs: updatedJobs
  };
  case 'SET_GOOGLE_LOGIN':
    return {
      ...state,
      login: action.boolean
    }


  // case 'SET_NEW_CONTACT':
  //   return {
  //     ...state,
  //     dateNext: action.newDateNext,
  //     firstName: action.newFirstName,
  //     lastName: action.newLastName,
  //     import: action.newImportant,
  //     company: action.newCompany,
  //     jobTitle: action.newJobTitle,
  //     email: action.newEmail,
  //     phone: action.newPhone,
  //     meetDate: action.newDay,
  //     meetNotes: action.newMeetNotes
  //   };

  //   case 'SET_ONE_CONTACT':
  //   return {
  //     ...state,
  //     dateNext: action.newDateNext,
  //     firstName: action.newFirstName,
  //     lastName: action.newLastName,
  //     import: action.newImportant,
  //     company: action.newCompany,
  //     jobTitle: action.newJobTitle,
  //     email: action.newEmail,
  //     phone: action.newPhone,
  //     meetDate: action.newMeetDate,
  //     meetNotes: action.newMeetNotes,
  //     allPast: action.newPastArray
  //   };

  //   case 'UPDATE_CONTACT':
  //   return {
  //     ...state,
  //     firstName: action.newFirstName,
  //     lastName: action.newLastName,
  //     import: action.newImportant,
  //     company: action.newCompany,
  //     jobTitle: action.newJobTitle,
  //     email: action.newEmail,
  //     phone: action.newPhone,
  //     meetDate: action.newMeetDate,
  //     meetNotes: action.newMeetNotes
  //   };

    // case 'UPDATE_DATE_NEXT':
    // return {
    //   ...state,
    //   dateNext: action.newDateNext.serNextContact
    // };

    // case 'UPDATE_CONTACT_PAST':
    // return {
    //   ...state,
    //   allPast: action.updatedContact.serPast
    //}

    case 'UPDATE_HEART':
    console.log(action, state);

    return {
      ...state,
      // import: !state.import
    }
    case 'SET_NEW_JOB':
    console.log(action, state);
    return {
        ...state,
        // companyState: action.newCompany,
        // jobTitleState: action.newJobTitle,
        // foundAllState: action.newFoundJob,
        // dateNextState: action.newDateNext,
        // importState: action.newImportant,
        // stageState: action.newStage,
        // contactState: action.newContactName,
        // foundAllState: action.newFoundJob,
        // researchState: action.newResearch,
        // jobNotesState: action.newJobNotes,
        // websiteState: action.newWebsite,
        // postState: action.newPost
      };
  
      case 'UPDATE_JOB':
      console.log(action, state);

      return {
        ...state,
        // companyState: action.newCompany,
        // jobTitleState: action.newJobTitle,
        // foundAllState: action.newFoundJob,
        // dateNextState: action.newDateNext,
        // importState: action.newImportant,
        // stageState: action.newStage,
        // contactState: action.newContactName,
        // foundAllState: action.newFoundJob,
        // researchState: action.newResearch,
        // jobNotesState: action.newJobNotes,
        // websiteState: action.newWebsite,
        // postState: action.newPost
      };
  
      // case 'UPDATE_DATE_NEXT':
      // return {
      //   ...state,
      //   dateNextState: action.newDateNext.nextDate
      // };
  
      case 'UPDATE_JOB_PAST':
      console.log(action, state);

      return {
        ...state,
        // allPastState: action.updatedJob.pastJobs
      }
      // case 'INDI_UPDATE':
      // return {
      //   ...state,
      //   [action.payload.kind]: action.payload.update
      // }

    default:
    return state
  }
}

export default AllState
