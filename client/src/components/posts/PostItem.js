import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';


// Destructure from posts and auth state 
const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => (
  <div class='post bg-white p-1 my-1'>
    <div>
      <a href='profile.html'>
        <img class='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p class='my-1'>{text}</p>
      <p class='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      <button type='button' class='btn btn-light'>
        <i class='fas fa-thumbs-up' />{' '}
          {/* Display likes count if we have likes  */}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>
      <button type='button' class='btn btn-light'>
        <i class='fas fa-thumbs-down' />
      </button>
      <Link to={`/post/${_id}`} class='btn btn-primary'>
        Discussion{' '}
          {/* Display Comment count if we have comments  */}
        {comments.length > 0 && (
          <span class='comment-count'>{comments.length}</span>
        )}
      </Link>
          {/* Check if its the user who make the post  */}
      {!auth.loading && user === auth.user._id && (
        <button type='button' class='btn btn-danger'>
          <i class='fas fa-times' />
        </button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PostItem);