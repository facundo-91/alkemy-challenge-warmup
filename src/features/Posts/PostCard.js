import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePost } from './postsSlice';
import { useState } from 'react';

const PostCard = ({ post }) => {
	const [requestStatus, setRequestStatus] = useState('idle');
	const dispatch = useDispatch();

	const onDeletePostClicked = async () => {
		if (requestStatus === 'idle') {
			try {
				setRequestStatus('pending');
				await dispatch(deletePost(post.id)).unwrap();
			} catch (err) {
				console.error('Failed to delete post: ', err);
				setRequestStatus('idle');
			}
		}
	};

	return (
		<article>
			<Link to={`/post/${post.id}`}>
				<img src="https://via.placeholder.com/426x240.webp" />
				<p>{post.title}</p>
			</Link>
			<Link to={`/edit-post/${post.id}`}>Edit Post</Link>
			<button disabled={requestStatus === 'pending'} onClick={onDeletePostClicked}>
				Delete Post
			</button>
		</article>
	);
};

export default PostCard;
