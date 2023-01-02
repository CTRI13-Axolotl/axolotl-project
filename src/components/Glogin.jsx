import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const clientId =
  '564068043512-qubvvt69k54kebe9iqt40uca1fd8jshh.apps.googleusercontent.com';

function Login() {
  const profileUrl = 'http://localhost:9000';
  const loginUrl = 'http://localhost:3001/login';
  const onSuccess = (res) => {
    console.log('LOGIN SUCCESS! Current user: ', res.profileObj);
    const username = res.profileObj.email;
    const password = res.profileObj.googleId;
    const userObj = { username, password };
    console.log('google login: ', userObj);
    axios
      .get(loginUrl, { params: userObj })
      .then((response) => {
        const userId = response.data;
        console.log('userId in google login: ', userId);
        window.sessionStorage.setItem('userId', userId);
        window.location.assign(profileUrl);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const onFailure = (res) => {
    console.log('LOGIN FAILED! res: ', res);
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonTest="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
