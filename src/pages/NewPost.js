import { Container } from 'react-bootstrap';
import { AddPostForm } from '../features/Posts/AddPostForm';

const NewPost = () => {
	return (
		<Container className="my-4">
			<h2>New Post</h2>
			<AddPostForm />
		</Container>
	);
};

export default NewPost;
