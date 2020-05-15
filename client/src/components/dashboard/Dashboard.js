import React , { useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile} from '../../actions/profile';





// Destructure auth, profile, and getCurrentProfile
const Dashboard = ({getCurrentProfile, auth, profile}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [])


  return (
    <div>
      Dashboard
    </div>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};


// Get auth and profile from thier states 
const mapStateToProps = state => ({
  auth: state.auth, 
  profile: state.profile
});


// Connect with the redux store 
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
