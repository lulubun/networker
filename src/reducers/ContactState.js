const initialState = {
  dateNext: '',
  firstName: '',
  lastName: '',
  import: '',
  company: '',
  jobTitle: '',
  email: '',
  phone: '',
  meetDate: '',
  meetNotes: ''
}

const ContactState = (state=initialState, action) => {
  switch (action.type) {
/*  case 'SET_NEW_CONTACT':
    let exact = new Date();
    let fullDay = exact.toString();
    let day = fullDay.slice(0, 25)
    console.log(day);
    return {
      ...state,
      dateNext: newDateNext.action,
      firstName: newFirstName.action,
      lastName: newLastName.action,
      import: newImportant.action,
      company: newCompany.action,
      jobTitle: newJobTitle.action,
      email: newEmail.action,
      phone: newPhone.action,
      meetDate: day,
      meetNotes: newMeetNotes.action
    };

    case 'SET_ONE_CONTACT':
    return {
      ...state,
      dateNext: newDateNext.action,
      firstName: newFirstName.action,
      lastName: newLastName.action,
      import: newImportant.action,
      company: newCompany.action,
    };

    case 'UPDATE_DATE_NEXT':
    return {
      ...state,
      dateNext: newDateNext.action
    };

    case 'UPDATE_FIRST_NAME':
    return {
      ...state,
      firstName: newFirstName.action
    }

    case 'UPDATE_LAST_NAME':
    return {
      ...state,
      lastName: newLastName.action
    }

    case 'UPDATE_IMPORTANT':
    return {
      ...state,
      Important: newImportant.action
    }

    case 'UPDATE_COMPANY':
    return {
      ...state,
      company: newCompany.action
    }

    case 'UPDATE_JOB_TITLE':
    return {
      ...state,
      jobTitle: newJobTitle.action
    }

    case 'UPDATE_EMAIL':
    return {
      ...state,
      email: newEmail.action
    }

    case 'UPDATE_PHONE':
    return {
      ...state,
      phone: newPhone.action
    }

    case 'UPDATE_MEET_NOTES':
    return {
      ...state,
      meetNotes: newMeetNotes.action
    }

    case 'UPDATE_MEET_DATE':
    return {
      ...state,
      meetDate: newMeetDate.action
    }; */

    default:
    return state
  }
}

export default ContactState
