export const SET_USER = 'SET_USER';
export const setUser = (firstNameInput, lastNameInput,
usernameInput, passwordInput) => ({
  type: SET_USER,
  firstNameInput,
  lastNameInput,
  usernameInput,
  passwordInput
});

export function sendNewUser(usernameInput, passwordInput, firstNameInput, lastNameInput) {
  return dispatch => {
    const userUrl = 'http://localhost:8080/users';
    fetch(userUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
        firstName: firstNameInput,
        lastName: lastNameInput
      })
    })
    .then(response => response.json())
  }
}
