import React, { Component } from 'react';
import './signup.css';
export default class SignUp extends Component {
  constructor() {
    super();
  }

  validatePassword(password) {
    const minlength = 8;
    if (!password) return 'Password is required';
    let str = '';
    if (password.length < minlength) {
      str += `Please enter a password that's at least ${minlength} characters long<br>`;
    }

    const hasCapitalLetter = /[A-Z]/g;
    if (!hasCapitalLetter.test(password)) {
      str += 'Please use at least one capital letter.<br>';
    }
    const hasSpecialSymbol = /[!@#$%^&*]/g;
    if (!hasSpecialSymbol.test(password)) {
      str += 'Please use at least one special symbol.<br>';
    }

    const hasRegularLetter = /[a-z]/g;
    if (!hasRegularLetter.test(password)) {
      str += 'Please use at least one Regular Letter.<br>';
    }

    const hasNumber = /\d/g;
    if (!hasNumber.test(password)) {
      str += 'Please use at least one number.<br>';
    }

    return str;
  }
  validateEmail(email) {
    if (!email) return 'Email is required <br>';
    let str = '';
    const isValidEmail1 = /^[a-zA-Z0-9_.+-]/g;
    if (!isValidEmail1.test(email)) {
      str += 'EROOR symbol do sobaki <br>';
    }
    const isValidEmail2 = /@[a-zA-Z0-9-]/g;
    if (!isValidEmail2.test(email)) {
      str += 'ERROR 2 symbol posle sobaki <br>';
    }
    const isValidEmail3 = /.[a-zA-Z0-9-.]+$/g;
    if (!isValidEmail3.test(email)) {
      str += 'ERROR 3 Please enter a valid email<br>';
    }

    return str;
  }
  render() {
    return (
      <>
        <div className="container">
          <div className="modal">
            <div id="message" className="error"></div>
            {<script src="https://www.google.com/recaptcha/api.js" async defer></script>}
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                let form = document.getElementById('signup');
                let _password = form.querySelector('input[name="password"]').value;
                let validated = this.validatePassword(_password);

                let _email = form.querySelector('input[name="email"]').value;
                let validatedEmail = this.validateEmail(_email);
                if (validatedEmail != '') {
                  message.innerHTML = validatedEmail;
                  message.classList.add('error');
                  message.classList.remove('success');
                  return;
                }

                console.log(validated);
                if (validated != '') {
                  message.innerHTML = validated;
                  message.classList.add('error');
                  message.classList.remove('success');
                  return;
                }

                let dataJson = {
                  username: form.querySelector('input[name="username"]').value,
                  password: _password,
                  email: form.querySelector('input[name="email"]').value,
                  roles: ['user']
                };
                console.log(dataJson);

                let response = await fetch('/api/auth/signup', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(dataJson)
                })
                  .then((response) => {
                    if (response.status == 200) {
                      message.classList.add('success');
                      message.classList.remove('error');
                    } else {
                      message.classList.add('error');
                      message.classList.remove('success');
                    }
                    return response.json();
                  })
                  .then((data) => {
                    console.log(data.message);

                    message.innerHTML = data.message;
                  });
              }}
              id="signup"
            >
              <div className="head_title1">
                <h3>signup</h3>
              </div>
              <div>
                {' '}
                <input
                  className="form-field"
                  name="username"
                  type="text"
                  placeholder="username"
                  pattern="^[a-zA-Z][a-zA-Z0-9-_\]{3,64}$"
                />{' '}
              </div>
              <div>
                <input
                  className="form-field"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="email"
                  onChange={() => {
                    if (email !== undefined) {
                      message.innerHTML = this.validateEmail(email.value);
                      if (message.innerHTML != '') {
                        message.classList.add('error');
                        message.classList.remove('success');
                      }
                    }
                  }}
                />
              </div>
              <div>
                <input
                  className="form-field"
                  id="passwd"
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={() => {
                    if (passwd !== undefined) {
                      message.innerHTML = this.validatePassword(passwd.value);
                      if (message.innerHTML != '') {
                        message.classList.add('error');
                        message.classList.remove('success');
                      }
                    }
                  }}
                />
              </div>
              <div>
                <input className="btnSignUp" type="submit" value="Sign Up" />
              </div>
              <form className="stylesignin" action="/signin">
                <div
                  class="g-recaptcha"
                  data-sitekey="6LfVseYpAAAAACByYMt0Ykmeb8i5wx-J38aoEZ4T"
                ></div>
              </form>
              <div>
                <input className="btnSignUp" type="submit" value="Go to Login page" />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
