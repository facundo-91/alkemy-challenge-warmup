import { Container } from 'react-bootstrap';
import PostInfo from '../features/Posts/PostInfo';

const Post = () => {
	return (
		<Container className="bg-secondary bg-opacity-25 py-4">
			<PostInfo />
		</Container>
	);
};

export default Post;
