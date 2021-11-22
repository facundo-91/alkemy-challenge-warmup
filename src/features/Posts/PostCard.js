import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, Col, Button, Spinner } from 'react-bootstrap';
import { deletePost } from './postsSlice';

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
		<Col>
			<Card className="h-100" style={{ minHeight: '20rem' }}>
				<Link className="h-100 text-decoration-none" to={`/post/${post.id}`}>
					<Card.Img src="https://via.placeholder.com/426x240.webp" variant="top" />
					<Card.Body className="">
						<Card.Title className="fs-6 text-dark">{post.title}</Card.Title>
					</Card.Body>
				</Link>
				<Card.Footer className="d-flex justify-content-between align-items-center">
					<Link to={`/edit-post/${post.id}`}>Edit Post</Link>
					<Button
						disabled={requestStatus === 'pending'}
						size="sm"
						style={{ width: '90px' }}
						variant="outline-danger"
						onClick={() => onDeletePostClicked()}>
						{requestStatus === 'pending' ? (
							<Spinner animation="border" aria-hidden="true" as="span" role="status" size="sm" />
						) : (
							'Delete Post'
						)}
					</Button>
				</Card.Footer>
			</Card>
		</Col>
	);
};

export default PostCard;
