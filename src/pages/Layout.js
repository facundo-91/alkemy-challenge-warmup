import { Outlet, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { logout } from '../features/auth/authSlice';

const Layout = () => {
	const dispatch = useDispatch();

	return (
		<>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand>Blog</Navbar.Brand>
					<Nav className="me-auto">
						<Link className="nav-link" to="/">
							Home
						</Link>
						<Link className="nav-link" to="/new-post">
							New Post
						</Link>
					</Nav>
					<Button variant="danger" onClick={() => dispatch(logout())}>
						Log Out
					</Button>
				</Container>
			</Navbar>
			<Outlet />
		</>
	);
};

export default Layout;
