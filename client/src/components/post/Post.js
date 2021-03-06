import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/post';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, post: { post, loading }, match }) => {
  
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

 
  return loading || post === null ? (
    <Spinner />

  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId = {post._id} />
      {/*  Display Comments through looping, always have keys  */}
      <div className = "comments">
        {post.comments.map(comment => (
          <CommentItem key = {comment._id} comment={comment} postId={post._id} /> 
        ))}
      </div>



    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);










// import React, { Fragment, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import  { Link } from 'react-router-dom';
// import Spinner from '../layout/Spinner';
// import { getPost } from '../../actions/post';
// import  PostItem from '../posts/PostItem';



// // Destructure Post from post state.post reducer 
// const Post = ({ getPost, post: {post, loading }, match }) => {
//   console.log(post)
//   // get post through match
//   useEffect (() => {
//     getPost(match.params.id);
//   }, [getPost]);

//   console.log('uc1')
//   return loading || post === null  ? 
//   (<Spinner /> )
//   :
//    (
//     <Fragment> 
//       <Link to = '/posts' className='btn'>
//         Back to posts
//          </Link>
//           {/* Make false not to display buttons  */}
//       <PostItem post={post} showActions={false} />
//     </Fragment>
//   )
// }

// Post.propTypes = {
//   getPost: PropTypes.func.isRequired,
//   post: PropTypes.object.isRequired

// }

// // Map State to Props 
// const mapStateToProps = state => ({
//   post: state.post
// })


// export default connect(mapStateToProps, {getPost}) (Post);
