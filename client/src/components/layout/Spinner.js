import React, { Fragment } from 'react';
import spinner from './spinner.gif';

// Loading Spinner 
export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);