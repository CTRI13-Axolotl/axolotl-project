import react from 'react'


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
    render(){
        return(
            <div>
                {/* //place our logo or main thing here */}
                 <form onSubmit ={this.handleSubmit}>
                  <input className='email' type='email' name='email' placeholder='email...' required onChange={this.handleChange} />
                  <input className='password' type='password' name='password' placeholder='password...' required onChange={this.handleChange} />
                  <button className='login' onSubmit={this.handleSubmit}> Log in</button>
                  <button className='register' onSubmit={this.handleSubmit}> Register </button>
                </form>
            </div>
        )
    }
}
export default Login;