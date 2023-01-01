import react from 'react';
import LoginButton from './Glogin';
import LogoutButton from './Glogout';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import { redirect } from 'react-router-dom';

const clientId =
  '564068043512-qubvvt69k54kebe9iqt40uca1fd8jshh.apps.googleusercontent.com';

class Login extends react.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: '',
      loginURL: 'http://localhost:3001/login',
      userId: '',
      profileUrl: 'http://localhost:9000/',
      createPetUrl: 'http://localhost:9000/',
      invalid: 'hidden',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.navigateToUrl = this.navigateToUrl.bind(this);
  }

  //   handleChange = (e) => {
  //     const { name, value } = e.target;
  //     this.setState({ [name]: value });
  //   };

  handleSubmit(e) {
    e.preventDefault();

    const password = e.target.form[1].value;
    const username = e.target.form[0].value;
    const userObj = { username, password };
    if (e.target.id === 'login') {
      axios
        .get(this.state.loginURL, userObj)
        .then((response) => {
          console.log(response);
          //   const userId = response.data;
          //   window.sessionStorage.setItem('userId', userId);
          //   return this.navigateToUrl(this.state.profileUrl);
        })
        .catch((error) => {
          console.error('There was an error!', error);
          this.setState({ ...this.state, invalid: '' });
        });
    } else if (e.target.id === 'register') {
      axios
        .post(this.state.loginURL, userObj)
        .then((response) => {
          const userId = response.data;
          window.sessionStorage.setItem('userId', userId);
          return this.navigateToUrl(this.state.createPetUrl);
        })
        .catch((error) => {
          console.error('There was an error!', error);
          this.setState({ ...this.state, invalid: '' });
        });
    }
  }

  navigateToUrl(url) {
    window.location.assign(url);
  }

  componentDidMount() {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  }

  componentDidUpdate() {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });
    }
    gapi.load('client:auth2', start);
  }

  // useEffect = () => {
  //     function start() {
  //         gapi.client.init({
  //             clientId: clientId,
  //             scope: ""
  //         })
  //     };
  //     gapi.load('client:auth2', start);
  // };

  render() {
    console.log('invalid: ', this.state.invalid);
    return (
      <div className="login-container">
        {/* //place our logo or main thing here */}
        <img
          id="photo"
          src="https://static.vecteezy.com/system/resources/previews/006/372/807/original/cute-axolotl-cartoon-mascot-illustration-eating-noodle-vector.jpg"
          alt="ok"
        />
        <div className="container">
          <h1 id="loghead">Login</h1>
          <form>
            <div className={this.state.invalid} id="invalid">
              Invalid Input
            </div>
            <input
              className="email"
              type="email"
              name="email"
              placeholder="email..."
              required
              //   onChange={this.handleChange}
            />
            <input
              className="password"
              type="password"
              name="password"
              placeholder="password..."
              required
              //   onChange={this.handleChange}
            />
            <div id="buttonRow">
              <button className="login" id="login" onClick={this.handleSubmit}>
                Log in
              </button>
              <button
                className="register"
                id="register"
                onClick={this.handleSubmit}
              >
                Register
              </button>
            </div>
            <div className="googs">
              <LoginButton />
              <LogoutButton />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
