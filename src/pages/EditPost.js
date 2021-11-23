import { Container } from 'react-bootstrap';
import EditPostForm from '../features/Posts/EditPostForm';

const EditPost = () => {
	return (
		<Container className="my-4">
			<h2>Edit Post</h2>
			<EditPostForm />
		</Container>
	);
};

export default EditPost;
