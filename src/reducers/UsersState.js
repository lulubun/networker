const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  password: ''
};

const UsersState = (state=initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
    return{
      ...state,
      firstName: action.firstNameInput,
      lastname: action.lastNameInput,
      username: action.usernameInput,
      password: action.passwordInput
    };

    case 'CHECK_USER':
    return{
      ...state
    }
    default:
    return state
  }
}

export default UsersState
