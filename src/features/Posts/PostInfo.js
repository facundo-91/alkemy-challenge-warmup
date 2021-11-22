import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

const PostInfo = () => {
	const params = useParams();
	const id = Number(params.id);
	const post = useSelector((state) => selectPostById(state, id));

	return post ? (
		<>
			<h1 className="my-4 mx-5 text-capitalize">{post.title}</h1>
			<picture>
				<source media="(min-width: 992px)" srcSet="https://via.placeholder.com/1050x450.webp" />
				<source media="(min-width: 576px)" srcSet="https://via.placeholder.com/600x257.webp" />
				<img className="w-100 h-auto my-5" src="https://via.placeholder.com/350x150.webp" />
			</picture>
			<p className="fs-4 mx-5">{post.body}</p>
			<p className="fs-4 mx-5">{post.body}</p>
			<p className="fs-4 mx-5">{post.body}</p>
			<p className="fs-4 mx-5">{post.body}</p>
			<p className="fs-4 mx-5">{post.body}</p>
		</>
	) : (
		<>
			<h2 className="text-center my-5 text-capitalize">Post not found!</h2>
		</>
	);
};

export default PostInfo;
