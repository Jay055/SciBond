
// use Effect works like componentDidMount if we were using a class
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
// Redux 
// Provider connects react and redux 
import { Provider } from 'react-redux';
import store from './store';

// import loadUserAction
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
// Dashboard route 
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/profile-form/EditProfile';
//
import CreateProfile from './components/profile-form/CreateProfile';
// Private route 
import PrivateRoute from './components/routing/PrivateRoute';


import './App.css';

// Set local storage 
if (localStorage.token) {
  setAuthToken(localStorage.token)

}

const App = () => {
  // Works similar to componentDidMount
  useEffect(() => {
    store.dispatch(loadUser());
    // [], only run once 
  }, []);



  return (
  // Surround entire app with Provider so all components can access  
  <Provider store = {store}>
   {/* React Router for links  */}
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
        <Alert /> 
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/create-profile' component={CreateProfile} />
          <PrivateRoute exact path='/edit-profile' component={EditProfile} />

        </Switch>
      </section>
    </Fragment>
  </Router>
  </Provider>
  
);
  }
export default App;