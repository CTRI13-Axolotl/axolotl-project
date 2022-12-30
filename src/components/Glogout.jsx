import { GoogleLogout } from 'react-google-login';

const clientId = "564068043512-qubvvt69k54kebe9iqt40uca1fd8jshh.apps.googleusercontent.com";

function Logout() {

    const onSuccess = () => {
        console.log("Log out successful!");
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId ={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;
