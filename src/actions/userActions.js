// const SER_URL = 'https://warm-harbor-59021.herokuapp.com';
// const APP_URL = 'https://be-a-networker.herokuapp.com';

const SER_URL = 'http://localhost:8080';
const APP_URL = 'http://localhost:3000';


import { browserHistory } from 'react-router'



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
    const userUrl = SER_URL + '/create';
    console.log(userUrl);
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
    .then(data => {console.log('hi there', data)})
    .then(browserHistory.push('/' + usernameInput + '/contacts'))
    .catch(ex => console.log(ex))
  }
}

export function fetchOneUser(usernameInput, passwordInput) {
  return dispatch => {
    const userVer = SER_URL + '/me';
    fetch(userVer, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      })
    })
    .then(response => response.json())
    .then(data => {
      const endpoint = data.user.username;
      console.log(endpoint);
      browserHistory.push('/' + endpoint + '/contacts')})
    .catch(ex => console.log(ex))
  }
}
