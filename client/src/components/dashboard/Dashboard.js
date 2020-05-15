import React , {Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
// edit profile dashboard
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Experience from './Experience';
import Education from './Education';

import { profile_url } from 'gravatar';





// Destructure auth, profile (MSTP), and getCurrentProfile from actions
const Dashboard = ({getCurrentProfile, deleteAccount, auth: {user}, profile: {profile, loading }}) => {
 
  useEffect(() => {
    getCurrentProfile();
  }, [])

  // If profile is null and loading is on show spinner 
  return loading && profile === null ? <Spinner /> : <Fragment>

<h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions /> 
          <Experience  experience={profile.experience}/>
          <Education  education={profile.education}/>

         
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
    
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    
    
   </Fragment>;
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};


// Get auth and profile from thier states 
const mapStateToProps = state => ({
  auth: state.auth, 
  profile: state.profile
});


// Connect with the redux store 
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
