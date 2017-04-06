const initialState = {
  date: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  meeting: '',
  notes: ''
}

const ContactState = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_DATE':
    let exact = new Date();
    let fullDay = exact.toString();
    let day = fullDay.slice(0, 25)
    console.log(day);
    return {
      ...state,
      date: day
    };

    default:
    return state
  }
}

export default ContactState
