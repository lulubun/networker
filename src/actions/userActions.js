const SER_URL = 'https://warm-harbor-59021.herokuapp.com';
const APP_URL = 'https://be-a-networker.herokuapp.com';


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
    //.then(location.assign(APP_URL + '/' + usernameInput + '/contacts'))
    .catch(ex => console.log(ex))
  }
}

export function fetchOneUser(usernameInput, passwordInput) {
  return dispatch => {
    const userVer = SER_URL + '/me';
    console.log('hi there!');
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
    .then(response => {
      response.json(),
      console.log(response.json())}
    )
    .then(data => {
      console.log(data);
      location.assign(APP_URL + '/' + data.user.username + '/contacts')})
    .catch(ex => console.log(ex))
  }
}
