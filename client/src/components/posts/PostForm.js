import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {addPost} from '../../actions/post';
import { connect } from 'react-redux';


const PostForm = ({ addPost }) => {
  // Set State 
  const [text, setText ] = useState('');

  
  return (
    <Fragment>
       <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form 
        onSubmit={e=> 
          {e.preventDefault();
                // Text should be an object 
          addPost({text});
          // Clear form after submission
          setText('');        
        }}
        class="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
              // setText to be target value
            onChange={e=> setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  )
}


PostForm.propTypes = {
addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost}) (PostForm);







