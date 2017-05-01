export const SET_USER = 'SET_USER';
export const setUser = (firstNameInput, lastNameInput,
usernameInput, passwordInput) => ({
  type: SET_USER,
  firstNameInput,
  lastNameInput,
  usernameInput,
  passwordInput
});

export const CHECK_USER ='CHECK_USER';
export const checkUser = (userName, password) => ({
  type: CHECK_USER,
  userName,
  password
});

export function sendNewUser(usernameInput, passwordInput, firstNameInput, lastNameInput) {
  return dispatch => {
    const userUrl = 'http://localhost:8080/';
    fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
        firstName: firstNameInput,
        lastName: lastNameInput
      })
    })
    .then(response => response.json())
    .then(location.assign('http://localhost:3000/:user/contacts'))
    .catch(ex => console.log(ex))
  }
}

export function fetchOneUser(usernameInput, passwordInput) {
  return dispatch => {
    const user = 'http://localhost:8080/login';
    fetch(user, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors'
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      })
    })
    .then(response => response.json())
    .catch(ex => console.log(ex))
  }
}
