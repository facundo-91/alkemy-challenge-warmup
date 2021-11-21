import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

const PostInfo = () => {
	const params = useParams();
	const id = Number(params.id);
	const post = useSelector((state) => selectPostById(state, id));

	return post ? (
		<section>
			<article className="post">
				<h2>{post.title}</h2>
				<p className="post-content">{post.body}</p>
			</article>
		</section>
	) : (
		<section>
			<h2>Post not found!</h2>
		</section>
	);
};

export default PostInfo;
