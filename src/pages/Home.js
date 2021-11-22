import { Container } from 'react-bootstrap';
import PostsList from '../features/Posts/PostsList';

const Home = () => {
	return (
		<Container className="my-4">
			<PostsList />
		</Container>
	);
};

export default Home;
