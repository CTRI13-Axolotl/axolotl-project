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
                 <img id='photo'src="https://static.vecteezy.com/system/resources/previews/006/372/807/original/cute-axolotl-cartoon-mascot-illustration-eating-noodle-vector.jpg" alt="ok" />
            <div className='container'>
                <h1 id='loghead'>Login</h1>
                 <form onSubmit ={this.handleSubmit}>
                  <input className='email' type='email' name='email' placeholder='email...' required onChange={this.handleChange} />
                  <input className='password' type='password' name='password' placeholder='password...' required onChange={this.handleChange} />
                  <div id="buttonRow">
                  <button className='login' onSubmit={this.handleSubmit}> Log in</button>
                  <button className='register' onSubmit={this.handleSubmit}> Register </button>
                  </div>
                </form>
            </div>
            </div>
        )
    }
}
export default Login;