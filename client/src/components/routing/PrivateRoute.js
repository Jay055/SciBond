// Private route authentication 

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Get component as props from App.js , ...rest gets any other parameter passed into RrivateRoute props
const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading},  ...rest }) => (
  
  // Get all custom props, Check if authenticated 
  <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login' /> ) : (<Component {...props} /> )}/>
)



PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}


// Get State from Auth Reducer 
const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps) (PrivateRoute);
