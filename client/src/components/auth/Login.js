import React, {Fragment, useState } from 'react';
import {Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import {setAlert} from '../../actions/alert';
import PropTypes from 'prop-types';


// Destructure isAuthenticated from mapStatetoProps
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ 
    // Default values
    email:'',
    password: ''
    });

    const {email, password} = formData; 
    
    //On Form Submit 
    const onSubmit = (e) => { 
      e.preventDefault(); 
      login({ email, password});
      console.log('success');
     
    };

    // Redirect if logged in 
    if(isAuthenticated) {
      return <Redirect to="/dashboard" /> 
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
          value={password}
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

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};


// Get values from the state of our auth reducer 
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated 

});




export default connect (mapStateToProps, {setAlert, login })(Login); 