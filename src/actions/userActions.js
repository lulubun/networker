import { hashHistory } from 'react-router';
import * as constants from './constants';



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
    const userUrl = constants.SER_URL + '/create';
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
    .then(data => {console.log(data)})
    .then(hashHistory.push('/' + usernameInput + '/network'))
    .catch(ex => console.log(ex))
  }
}

export function fetchOneUser(usernameInput, passwordInput) {
  return dispatch => {
    const userVer = constants.SER_URL + '/me';
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
      console.log(data);
      const endpoint = data.user.username;
      hashHistory.push('/' + endpoint + '/network')})
    .catch(ex => console.log(ex))
  }
}
