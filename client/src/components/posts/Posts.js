import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';


// Destructure from actions and reducers state 
const Posts = ({ getPosts, post: { posts, loading}}) => {
  useEffect(()=> {
    getPosts();  
  }, [getPosts]);

  // If loading show spinner
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      {/* PostForm */}
      <div className='posts'>
          {/* Display all Posts with mapping */}
        {posts.map(post => (

<PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};


Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);