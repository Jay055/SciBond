import React from 'react'
import PropTypes from 'prop-types';
// interact with redux (action or state )
import {connect} from 'react-redux';


// Destructure alerts from props 
const Alert = ({alerts}) => 
// If Alert !empty 
alerts !==null && 
alerts.length > 0 && 
alerts.map(alert => (
  <div key={alert.id} className = {`alert alert-${alert.alertType}`}> 
    {alert.msg}
  </div>
  ));



// Prevent errors by confirming the types passed 
Alert.propTypes = {
  alerts:PropTypes.array.isRequired,

}


// Map redux state to props in this component so we have access to it. ( We have an alert object in the state from our reducer  )
const mapStateToProps = state => ({
  alerts: state.alert
});




export default connect(mapStateToProps)(Alert)


// Any time you want to interact a component with redux you use connnect 