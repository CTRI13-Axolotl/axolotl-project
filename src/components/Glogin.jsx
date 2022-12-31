import { GoogleLogin } from 'react-google-login';

const clientId = "564068043512-qubvvt69k54kebe9iqt40uca1fd8jshh.apps.googleusercontent.com";

function Login() {

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return(
        <div id= "signInButton">
            <GoogleLogin
                clientId = {clientId}
                buttonTest = "Login"
                onSuccess = {onSuccess}
                onFailure = {onFailure}
                cookiePolicy = {'single_host_origin'}
                isSignedIn = {true}
            />
        </div>
    )
}

export default Login;