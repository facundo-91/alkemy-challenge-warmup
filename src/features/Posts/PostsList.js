import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
		content = <p>LOADING...</p>;
	} else if (postStatus === 'succeeded') {
		content = posts.map((post) => <PostCard key={post.id} post={post} />);
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
