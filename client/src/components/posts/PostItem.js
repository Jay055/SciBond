import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike ,deletePost} from '../../actions/post';



// Destructure from posts and auth state , showActions from default props 
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date }, showActions
}) => (
  <div class='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img class='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p class='my-1'>{text}</p>
      <p class='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
            {/* If showActions is true display buttons  */}
        {showActions && <Fragment>
          <button onClick={e => addLike(_id)} type='button' class='btn btn-light'>
        <i class='fas fa-thumbs-up' />{' '}
          {/* Display likes count if we have likes  */}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>

      <button onClick={e => removeLike(_id)} type='button' class='btn btn-light'>
        <i class='fas fa-thumbs-down' />
      </button>
          {/* posts  */}
      <Link to={`/posts/${_id}`} class='btn btn-primary'>
        Discussion{' '}
          {/* Display Comment count if we have comments  */}
        {comments.length > 0 && (
          <span class='comment-count'>{comments.length}</span>
        )}
      </Link>
          {/* Check if its the user who make the post for delete button  */}
      {!auth.loading && user === auth.user._id && (
        <button 
        onClick = {e=> deletePost(_id)}
        type='button' class='btn btn-danger'>
          <i class='fas fa-times' />
        </button>
      )}
          
          
          </Fragment>}      
      
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike:PropTypes.func.isRequired,
  deletePost:PropTypes.func.isRequired
};


// Create Default Props to Display post without buttons 
PostItem.defaultProps = { 
  showActions: true 
}


const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(
  mapStateToProps,
  {addLike, removeLike, deletePost}
)(PostItem);