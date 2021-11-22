import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Spinner } from 'react-bootstrap';

import { selectAllPosts, fetchPosts } from './postsSlice';
import PostCard from './PostCard';

const PostsList = () => {
	const dispatch = useDispatch();

	const posts = useSelector(selectAllPosts);
	const postStatus = useSelector((state) => state.posts.status);
	const error = useSelector((state) => state.posts.error);

	useEffect(() => {
		if (postStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postStatus, dispatch]);

	let content;

	if (postStatus === 'loading') {
		content = (
			<div className="position-absolute top-50 start-50">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		);
	} else if (postStatus === 'succeeded') {
		content = (
			<Row className="g-4" lg={4} md={3} xs={1}>
				{posts.map((post) => (
					<PostCard key={post.id} post={post} />
				))}
			</Row>
		);
	} else if (postStatus === 'failed') {
		content = <div>{error}</div>;
	}

	return (
		<div>
			<h2>Posts:</h2>
			{content}
		</div>
	);
};

export default PostsList;
