    import react from 'react'
    import LoginButton from './Glogin';
    import LogoutButton from './Glogout';
    import {useEffect} from 'react';
    import { gapi } from 'gapi-script';
    
    const clientId = "564068043512-qubvvt69k54kebe9iqt40uca1fd8jshh.apps.googleusercontent.com";


class Login extends react.Component{
    constructor (props,context) {
           super (props,context);
           this.state={
            email: '',
            password:''
           };
    }
   
    handleChange = (e) => {
     const {name,value} = e.target;
     this.setState({[name] : value});
    }

    handleSubmit = (e) => {
    e.preventDefault();
    }

    componentDidMount() {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
                })
        };
        gapi.load('client:auth2', start);
    }

    componentDidUpdate() {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
                })
        };
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


    render(){
        return(
            <div>
                {/* //place our logo or main thing here */}
                 <form onSubmit ={this.handleSubmit}>
                  <input className='email' type='email' name='email' placeholder='email...' required onChange={this.handleChange} />
                  <input className='password' type='password' name='password' placeholder='password...' required onChange={this.handleChange} />
                  <button className='login' onSubmit={this.handleSubmit}> Log in</button>
                  <button className='register' onSubmit={this.handleSubmit}> Register </button>
                  <LoginButton />
                  <LogoutButton />
                </form>
            </div>
        )
    }
}
export default Login;