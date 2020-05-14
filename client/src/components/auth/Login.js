import React, {Fragment, useState } from 'react';
import {Link} from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({ 
    // Default values
    email:'',
    password: ''
    });

    const {email, password} = formData; 
    
    //On Form Submit 
    const onSubmit = (e) => { 
      e.preventDefault(); 
      console.log('Success')
      
    }

    // Set Input 
    const onChange = (e) => { 
      setFormData ({...formData, [e.target.name]:e.target.value})
    }
   
  return (
    <Fragment>
    <h1 className="large text-primary">Sign In</h1>
    <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
    <form className="form" onSubmit={e => onSubmit(e)} >
      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={e => onChange(e)}
          
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={email}
          onChange={e => onChange(e)}
          
          required
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Login" />
    </form>
    <p className="my-1">
      Don't have an account? <Link to="/Register">Sign Up</Link>
    </p>

    </Fragment>
  );
};

export default Login;