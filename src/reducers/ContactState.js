let today = new Date();

const initialState = {
  dateNext: '',
  firstName: '',
  lastName: '',
  import: '',
  company: '',
  jobTitle: '',
  email: '',
  phone: '',
  meetDate: today,
  meetNotes: ''
}

const ContactState = (state=initialState, action) => {
  switch (action.type) {
  case 'SET_NEW_CONTACT':
    let exact = new Date();
    let fullDay = exact.toString();
    let day = fullDay.slice(0, 25)
    console.log(day);
    return {
      ...state,
      dateNext: action.newDateNext,
      firstName: action.newFirstName,
      lastName: action.newLastName,
      import: action.newImportant,
      company: action.newCompany,
      jobTitle: action.newJobTitle,
      email: action.newEmail,
      phone: action.newPhone,
      meetDate: day,
      meetNotes: action.newMeetNotes
    };

    case 'SET_ONE_CONTACT':
    return {
      ...state,
      dateNext: action.newDateNext,
      firstName: action.newFirstName,
      lastName: action.newLastName,
      import: action.newImportant,
      company: action.newCompany,
      jobTitle: action.newJobTitle,
      email: action.newEmail,
      phone: action.newPhone,
      meetDate: action.newMeetDate,
      meetNotes: action.newMeetNotes
    };

    case 'SET_ONE_CONTACT_LINK':
    return {
      ...state,
      id: action.id,
      dateNext: action.newDateNext,
      firstName: action.newFirstName,
      lastName: action.newLastName,
      important: action.newImportant,
      company: action.newCompany,
      jobTitle: action.newJobTitle,
      email: action.newEmail,
      phone: action.newPhone,
      meetDate: action.newMeetDate,
      meetNotes: action.newMeetNotes
    };

    case 'UPDATE_DATE_NEXT':
    return {
      ...state,
      dateNext: action.newDateNext
    };

    case 'UPDATE_FIRST_NAME':
    return {
      ...state,
      firstName: action.newFirstName
    }

    case 'UPDATE_LAST_NAME':
    return {
      ...state,
      lastName: action.newLastName
    }

    case 'UPDATE_IMPORTANT':
    return {
      ...state,
      Important: action.newImportant
    }

    case 'UPDATE_COMPANY':
    return {
      ...state,
      company: action.newCompany
    }

    case 'UPDATE_JOB_TITLE':
    return {
      ...state,
      jobTitle: action.newJobTitle
    }

    case 'UPDATE_EMAIL':
    return {
      ...state,
      email: action.newEmail
    }

    case 'UPDATE_PHONE':
    return {
      ...state,
      phone: action.newPhone
    }

    case 'UPDATE_MEET_NOTES':
    return {
      ...state,
      meetNotes: action.newMeetNotes
    }

    case 'UPDATE_MEET_DATE':
    return {
      ...state,
      meetDate: action.newMeetDate
    };

    default:
    return state
  }
}

export default ContactState
